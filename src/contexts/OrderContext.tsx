import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

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
  status: 'pending' | 'delivered' | 'cancelled';
  paymentMethod: string;
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
      
      // Add server timestamp for better tracking
      const orderWithTimestamp = {
        ...orderData,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
      };
      
      const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
      console.log('Order created with ID:', docRef.id);
      
      const newOrder = { ...orderData, id: docRef.id } as Order;
      
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
      
      // Fetch orders from Firestore
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Order, 'id'>;
        ordersData.push({ ...data, id: doc.id } as Order);
      });
      
      console.log(`Found ${ordersData.length} orders`);
      
      // Delete orders older than 1 day
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      // Filter orders
      const filteredOrders = ordersData.filter(order => {
        const orderDate = new Date(order.date);
        const isValid = orderDate > oneDayAgo;
        
        // If expired, delete it
        if (!isValid) {
          console.log(`Deleting expired order: ${order.id}`);
          deleteDoc(doc(db, 'orders', order.id))
            .catch(err => console.error('Error deleting old order:', err));
        }
        
        return isValid;
      });
      
      console.log(`${filteredOrders.length} orders remain after filtering expired ones`);
      
      // Sort by date (newest first)
      filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setOrders(filteredOrders);
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
      
      // Set up periodic cleanup every hour, not every render
      const cleanupInterval = setInterval(() => {
        console.log('Running periodic order cleanup');
        fetchOrders(); // This will also clean up expired orders
      }, 60 * 60 * 1000); // Every hour
      
      return () => clearInterval(cleanupInterval);
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