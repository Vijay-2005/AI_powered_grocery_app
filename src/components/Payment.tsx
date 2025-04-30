import React, { useState } from 'react';
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

export const Payment: React.FC = () => {
  const { state: { items }, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [upiVerificationOpen, setUpiVerificationOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  const calculateDeliveryFee = () => {
    return calculateSubtotal() > 500 ? 0 : 40; // Free delivery for orders above ₹500
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee() + calculateTax();
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const validateUpiId = (upi: string) => {
    // UPI ID format: username@provider
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(upi);
  };

  const handleUpiSubmit = () => {
    if (!validateUpiId(upiId)) {
      setError('Please enter a valid UPI ID (e.g., yourname@upi)');
      return;
    }
    
    setUpiVerificationOpen(true);
  };

  const handleVerification = () => {
    // In a real app, you would actually verify the payment server-side
    // This is just a simulation
    if (verificationCode.length < 4) {
      setError('Please enter a valid verification code');
      return;
    }
    
    setLoading(true);
    setUpiVerificationOpen(false);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Create order object
      const order = {
        items: items,
        paymentId: 'UPI' + Date.now(),
        orderId: 'ORD' + Math.floor(1000000 + Math.random() * 9000000),
        amount: calculateTotal(),
        date: new Date().toISOString(),
        paymentMethod: 'UPI',
        upiId: upiId
      };
      
      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart after successful payment
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/order-success', { state: { order } });
      }, 1500);
    }, 2000);
  };

  const handleInitiatePayment = () => {
    setConfirmationOpen(true);
  };

  const handlePaymentConfirmation = () => {
    setConfirmationOpen(false);
    
    if (paymentMethod === 'upi') {
      handleUpiSubmit();
    } else {
      // Handle COD or other methods
      setError('Only UPI payment is supported at the moment');
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
                value="upi" 
                control={<Radio color="primary" />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>UPI Payment</Typography>
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
        
        {paymentMethod === 'upi' && (
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Enter UPI ID"
              variant="outlined"
              fullWidth
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              size="small"
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              Example: yourname@ybl, yourname@oksbi, yourname@paytm
            </Typography>
          </Box>
        )}
        
        <Button
          id="payment-button"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleInitiatePayment}
          disabled={items.length === 0 || loading || (paymentMethod === 'upi' && !upiId)}
          sx={{ 
            py: 1.5, 
            borderRadius: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            position: 'relative'
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" sx={{ position: 'absolute', left: '50%', marginLeft: '-12px' }} />
          ) : (
            `Pay ₹${calculateTotal().toFixed(2)} ${paymentMethod === 'upi' ? 'via UPI' : 'on Delivery'}`
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
          {paymentMethod === 'upi' && (
            <Typography variant="body2">
              Payment will be processed through UPI ID: <strong>{upiId}</strong>
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
      
      {/* UPI Verification Dialog */}
      <Dialog open={upiVerificationOpen} onClose={() => setUpiVerificationOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Verify UPI Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            A payment request has been sent to your UPI app ({upiId}).
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
            Please complete the payment in your UPI app and enter the verification code below:
          </Typography>
          <TextField
            label="UPI Verification Code"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            margin="normal"
            placeholder="Enter 4-6 digit code"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpiVerificationOpen(false)}>Cancel</Button>
          <Button onClick={handleVerification} variant="contained" color="primary">
            Verify Payment
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success and Error Snackbars */}
      <Snackbar 
        open={success} 
        autoHideDuration={5000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Payment successful! Processing your order...
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={5000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}; 