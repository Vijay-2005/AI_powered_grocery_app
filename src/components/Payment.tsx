import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  TextField, 
  CircularProgress, 
  Alert, 
  Snackbar, 
  Box, 
  Typography, 
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { AccountBalance as AccountBalanceIcon, CreditCard as CreditCardIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { razorpayConfig } from '../firebase/config';
import { useOrders } from '../contexts/OrderContext';

// Declare Razorpay as a global interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Payment: React.FC = () => {
  const { state: { items }, dispatch } = useCart();
  const { currentUser } = useAuth();
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  
  const navigate = useNavigate();

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpayScript = async () => {
      try {
        if (!window.Razorpay) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          
          script.onload = () => {
            console.log('Razorpay script loaded successfully');
            setRazorpayLoaded(true);
          };
          
          script.onerror = () => {
            console.error('Failed to load Razorpay script');
            setError('Failed to load payment gateway. Please try again later.');
          };
          
          document.body.appendChild(script);
        } else {
          setRazorpayLoaded(true);
        }
      } catch (err) {
        console.error('Error loading Razorpay script:', err);
      }
    };
    
    loadRazorpayScript();
    
    // Reset order status when component mounts
    setOrderCreated(false);
  }, []);

  const calculateSubtotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const calculateTax = useCallback(() => {
    return calculateSubtotal() * 0.05;
  }, [calculateSubtotal]);

  const calculateDeliveryFee = useCallback(() => {
    return calculateSubtotal() > 500 ? 0 : 40; // Free delivery for orders above ₹500
  }, [calculateSubtotal]);

  const calculateTotal = useCallback(() => {
    return calculateSubtotal() + calculateDeliveryFee() + calculateTax();
  }, [calculateSubtotal, calculateDeliveryFee, calculateTax]);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  // Handle success after payment
  const handlePaymentSuccess = async (paymentId: string, orderId: string) => {
    // Prevent duplicate order creation
    if (orderCreated) {
      console.log('Order already created, skipping');
      return;
    }
    
    setPaymentProcessing(true);
    setSuccess(true); // Show success message
    
    try {
      if (!currentUser) {
        setError('You must be logged in to place an order');
        setPaymentProcessing(false);
        return;
      }

      const orderData = {
        items: items,
        paymentId: paymentId,
        orderId: orderId,
        amount: calculateTotal(),
        date: new Date().toISOString(),
        userId: currentUser.uid,
        status: 'delivered' as const,
        paymentMethod: paymentMethod
      };

      console.log('Creating order:', orderData);
      const order = await createOrder(orderData);
      
      if (order) {
        console.log('Order created successfully:', order);
        setOrderCreated(true);
        
        // Clear cart and navigate to success page after a short delay
        setTimeout(() => {
          dispatch({ type: 'CLEAR_CART' });
          navigate('/order-success', { state: { order } });
        }, 1000);
      } else {
        setError('Failed to create order. Please try again.');
      }
    } catch (err) {
      console.error('Error processing payment success:', err);
      setError('There was an error processing your payment.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);
      
      if (!razorpayLoaded) {
        setError('Payment gateway is still loading. Please try again in a moment.');
        setLoading(false);
        return;
      }
      
      // Create Razorpay order
      const options = {
        key: razorpayConfig.keyId,
        amount: Math.round(calculateTotal() * 100), // amount in smallest currency unit (paise)
        currency: 'INR',
        name: 'Fresh Cart',
        description: 'Purchase from Fresh Cart Grocery App',
        image: 'https://i.imgur.com/3g7nmJC.png', // You can replace with your logo URL
        handler: function(response: any) {
          console.log('Razorpay payment successful:', response);
          // Handle payment success
          handlePaymentSuccess(
            response.razorpay_payment_id,
            'ORD' + Math.floor(1000000 + Math.random() * 9000000)
          );
        },
        prefill: {
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
          contact: ''
        },
        notes: {
          address: 'Fresh Cart Grocery App'
        },
        theme: {
          color: '#2e7d32'
        },
        modal: {
          ondismiss: function() {
            console.log('Razorpay modal dismissed');
            setLoading(false);
            setConfirmationOpen(false);
          }
        }
      };
      
      console.log('Initializing Razorpay with options:', options);
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response: any) {
        console.error('Razorpay payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
      rzp.open();
      
    } catch (err) {
      console.error('Error initiating Razorpay payment:', err);
      setError('Error initiating payment. Please try again.');
      setLoading(false);
    }
  };

  // Handle COD payment
  const handleCodPayment = async () => {
    setLoading(true);
    
    try {
      const orderId = 'ORD' + Math.floor(1000000 + Math.random() * 9000000);
      const paymentId = 'COD' + Date.now();
      
      setSuccess(true); // Show success message first
      
      // Small delay to show the success message before proceeding
      setTimeout(() => {
        handlePaymentSuccess(paymentId, orderId);
      }, 1000);
    } catch (err) {
      console.error('Error processing COD payment:', err);
      setLoading(false);
      setError('Error processing your order. Please try again.');
    }
  };

  const handleInitiatePayment = () => {
    if (items.length === 0) {
      setError('Your cart is empty. Please add items before proceeding to payment.');
      return;
    }
    setConfirmationOpen(true);
  };

  const handlePaymentConfirmation = () => {
    setConfirmationOpen(false);
    
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else if (paymentMethod === 'cod') {
      handleCodPayment();
    }
  };

  return (
    <>
      <Box>
        <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
          <FormLabel component="legend" sx={{ mb: 1, color: 'text.primary', fontWeight: 'bold' }}>
            Select Payment Method
          </FormLabel>
          <RadioGroup
            aria-label="payment-method"
            name="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <Paper variant="outlined" sx={{ mb: 1, p: 1 }}>
              <FormControlLabel 
                value="razorpay" 
                control={<Radio color="primary" />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>Pay with Razorpay</Typography>
                  </Box>
                }
                sx={{ width: '100%' }}
              />
            </Paper>
            
            <Paper variant="outlined" sx={{ p: 1 }}>
              <FormControlLabel 
                value="cod" 
                control={<Radio color="primary" />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>Cash on Delivery</Typography>
                  </Box>
                }
                sx={{ width: '100%' }}
              />
            </Paper>
          </RadioGroup>
        </FormControl>
        
        {!razorpayLoaded && paymentMethod === 'razorpay' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Loading payment gateway... Please wait.
          </Alert>
        )}
        
        <Button
          id="payment-button"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleInitiatePayment}
          disabled={items.length === 0 || loading || paymentProcessing || (paymentMethod === 'razorpay' && !razorpayLoaded) || orderCreated}
          sx={{ 
            py: 1.5, 
            borderRadius: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            position: 'relative'
          }}
        >
          {loading || paymentProcessing ? (
            <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', marginLeft: '-12px' }} />
          ) : (
            `Pay ₹${calculateTotal().toFixed(2)} ${paymentMethod === 'razorpay' ? 'via Razorpay' : 'on Delivery'}`
          )}
        </Button>
      </Box>
      
      {/* Payment Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You are about to make a payment of <strong>₹{calculateTotal().toFixed(2)}</strong>
          </Typography>
          <Typography variant="body2">
            Payment method: <strong>{paymentMethod === 'razorpay' ? 'Razorpay' : 'Cash on Delivery'}</strong>
          </Typography>
          {paymentMethod === 'razorpay' && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              You will be redirected to the Razorpay payment gateway to complete your payment securely.
            </Typography>
          )}
          {paymentMethod === 'cod' && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              You will pay when your order is delivered. A confirmation will be sent to your registered email.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={handlePaymentConfirmation} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Error Snackbar */}
      <Snackbar 
        open={error !== null} 
        autoHideDuration={8000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      {/* Success Snackbar */}
      <Snackbar 
        open={success} 
        autoHideDuration={8000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Payment successful! Processing your order...
        </Alert>
      </Snackbar>
    </>
  );
}; 