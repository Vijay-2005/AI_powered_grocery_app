import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  doc, 
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { API_BASE_URL, API_ENDPOINTS } from '../config';

// Types for order data
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  orderId: string;
  paymentId: string;
  amount: number;
  date: string;
  userId: string;
  status: 'pending' | 'delivered' | 'cancelled' | 'processing';
  paymentMethod: string;
  productId?: string; // For backend compatibility
  quantity?: number;   // For backend compatibility
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (orderData: Omit<Order, 'id'>) => Promise<Order | null>;
  fetchOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const [lastFetch, setLastFetch] = useState<number>(0);

  // Function to create a new order
  const createOrder = async (orderData: Omit<Order, 'id'>): Promise<Order | null> => {
    if (!currentUser) {
      setError('You must be logged in to create an order');
      console.error('Create order failed: User not logged in');
      return null;
    }

    try {
      console.log('Creating order with data:', orderData);
      
      // Add properties needed for the order
      const orderWithTimestamp = {
        ...orderData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      
      // Ensure we have the fields required by backend
      if (!orderWithTimestamp.productId && orderWithTimestamp.items.length > 0) {
        orderWithTimestamp.productId = orderWithTimestamp.items[0].id;
      }
      
      if (!orderWithTimestamp.quantity) {
        orderWithTimestamp.quantity = orderWithTimestamp.items.reduce(
          (sum, item) => sum + item.quantity, 
          0
        );
      }
      
      // Save ONLY to Spring Boot backend (removing Firebase save)
      const backendUrl = API_BASE_URL;
      const response = await fetch(`${backendUrl}${API_ENDPOINTS.ORDERS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser.getIdToken()}`
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          productId: orderWithTimestamp.productId,
          quantity: orderWithTimestamp.quantity,
          amount: orderWithTimestamp.amount,
          orderTime: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to save order to backend:', errorText);
        throw new Error(`Failed to save order: ${errorText}`);
      }
      
      console.log('Order saved to backend successfully');
      const savedOrder = await response.json();
      console.log('Backend returned order:', savedOrder);
      
      // Create a properly formatted order object from the backend response
      const newOrder = { 
        ...orderData,
        id: savedOrder.id?.toString() || `backend-${Date.now()}`,
        orderId: savedOrder.id?.toString() || orderData.orderId,
        userId: currentUser.uid
      } as Order;
      
      // Update the orders state with the new order
      setOrders(prev => [newOrder, ...prev]);
      
      return newOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to create order. Please try again.');
      return null;
    }
  };

  // Function to fetch all orders for the current user
  const fetchOrders = useCallback(async () => {
    if (!currentUser) {
      console.log('Fetch orders skipped: No user logged in');
      return;
    }

    // Don't fetch too frequently - prevent infinite loops
    const now = Date.now();
    if (now - lastFetch < 5000) { // Don't fetch more than once every 5 seconds
      console.log('Skipping fetch - too soon since last fetch');
      return;
    }
    setLastFetch(now);

    // Don't set loading to true if already loading
    if (!loading) {
      setLoading(true);
    }
    setError(null);
    
    try {
      console.log('Fetching orders for user:', currentUser.uid);
      
      // Only fetch orders from backend API (removed Firebase fetching)
      const ordersData: Order[] = [];
      
      try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDER_HISTORY}?userId=${currentUser.uid}`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        
        if (response.ok) {
          const backendOrders = await response.json();
          console.log(`Found ${backendOrders.length} orders in backend`);
          
          // Convert backend orders to our Order format
          backendOrders.forEach((backendOrder: any) => {
            // Convert backend order to our Order format
            ordersData.push({
              id: backendOrder.id?.toString() || `backend-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              orderId: backendOrder.id?.toString() || backendOrder.orderId || 'unknown',
              paymentId: backendOrder.paymentId || 'unknown',
              amount: backendOrder.amount,
              date: backendOrder.orderTime || backendOrder.date || new Date().toISOString(),
              userId: currentUser.uid,
              status: backendOrder.status || 'processing',
              paymentMethod: backendOrder.paymentMethod || 'unknown',
              items: backendOrder.items || [{
                id: backendOrder.productId || 'unknown',
                name: backendOrder.productName || 'Product',
                price: backendOrder.amount || 0,
                quantity: backendOrder.quantity || 1
              }]
            } as Order);
          });
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch orders from backend:', errorText);
          throw new Error(`Failed to fetch orders: ${errorText}`);
        }
      } catch (backendErr) {
        console.error('Error fetching from backend:', backendErr);
        throw backendErr; // Re-throw to be caught by the outer try/catch
      }
      
      // Sort by date (newest first)
      ordersData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentUser, loading, lastFetch]);

  // Fetch orders on mount and when user changes
  useEffect(() => {
    if (currentUser) {
      console.log('User logged in, fetching orders');
      fetchOrders();
    } else {
      console.log('No user logged in, clearing orders');
      setOrders([]);
    }
  }, [currentUser, fetchOrders]);

  // Create a stable value object that doesn't change on every render
  const value = React.useMemo(() => ({
    orders,
    loading,
    error,
    createOrder,
    fetchOrders
  }), [orders, loading, error, fetchOrders]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};