import React, { useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import { CheckCircle as CheckCircleIcon, LocalShipping as ShippingIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  paymentId: string;
  orderId: string;
  amount: number;
  date: string;
}

export const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  useEffect(() => {
    // If no order data, redirect to home
    if (!order) {
      navigate('/');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      };
      return new Intl.DateTimeFormat('en-IN', options).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '8px', 
          bgcolor: 'success.main' 
        }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          mb: 4,
          pt: 2
        }}>
          <Avatar 
            sx={{ 
              bgcolor: 'success.light', 
              width: 80, 
              height: 80,
              mb: 2
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
          </Avatar>
          
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
            Order Placed Successfully!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center">
            Thank you for your purchase. Your order has been confirmed.
          </Typography>
          
          <Chip 
            icon={<ShippingIcon />} 
            label={`Expected Delivery: ${getDeliveryDate()}`}
            color="primary"
            sx={{ mt: 2 }}
          />
        </Box>
        
        <Box sx={{ bgcolor: '#f8f8f8', p: 3, borderRadius: 2, mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Order Details
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            <Box sx={{ minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                #{order.orderId.slice(-8)}
              </Typography>
            </Box>
            
            <Box sx={{ minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(order.date)}
              </Typography>
            </Box>
            
            <Box sx={{ minWidth: '180px' }}>
              <Typography variant="body2" color="text.secondary">
                Payment ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {order.paymentId.slice(0, 10) + '...'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        
        <Paper variant="outlined" sx={{ mb: 4 }}>
          <List disablePadding>
            {order.items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText 
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body1" fontWeight="medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </React.Fragment>
            ))}
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText 
                primary="Total Amount"
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
              <Typography variant="body1" fontWeight="bold" color="primary.main">
                ₹{order.amount.toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            sx={{ minWidth: '120px' }}
          >
            Continue Shopping
          </Button>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/orders')}
            sx={{ minWidth: '120px' }}
          >
            View All Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}; 