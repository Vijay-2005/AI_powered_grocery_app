import React, { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Button,
  NoSsr,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';

export const Orders: React.FC = () => {
  const { orders, loading, error, fetchOrders } = useOrders();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.log('No user, redirecting to signin');
      navigate('/signin');
      return;
    }

    // Only fetch once when component mounts
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        await fetchOrders();
      } catch (err) {
        console.error('Error fetching orders in component:', err);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [currentUser, navigate, fetchOrders]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getRemainingTime = (dateString: string) => {
    const orderDate = new Date(dateString);
    const expiryDate = new Date(orderDate);
    expiryDate.setDate(expiryDate.getDate() + 1);
    
    const now = new Date();
    const timeRemaining = expiryDate.getTime() - now.getTime();
    
    // If expired
    if (timeRemaining <= 0) return 'Expired';
    
    // Convert to hours and minutes
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursRemaining}h ${minutesRemaining}m remaining`;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          {error}
          <Button 
            onClick={() => fetchOrders()} 
            sx={{ ml: 2 }}
            size="small"
            variant="outlined"
          >
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        My Orders
      </Typography>
      
      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            You don't have any orders yet
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" paragraph>
            Orders are automatically removed after 24 hours
          </Typography>
          
          {orders.map((order) => (
            <Paper 
              key={order.id} 
              sx={{ 
                mb: 3, 
                overflow: 'hidden',
                position: 'relative'
              }}
              elevation={2}
            >
              <Box sx={{ 
                p: { xs: 2, sm: 3 },
                borderBottom: '1px solid rgba(0,0,0,0.12)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: 1
                }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order #{order.orderId.slice(-8)}
                  </Typography>
                  
                  <Box>
                    <Chip 
                      label={order.status}
                      color={order.status === 'delivered' ? 'success' : 'primary'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <NoSsr>
                      <Chip 
                        label={getRemainingTime(order.date)}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    </NoSsr>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: { xs: 2, sm: 4 }
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body2">
                      {formatDate(order.date)}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Payment Method
                    </Typography>
                    <Typography variant="body2">
                      {order.paymentMethod === 'razorpay' ? 'Razorpay' : 'Cash on Delivery'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ₹{order.amount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <List disablePadding>
                {order.items.map((item, index) => (
                  <React.Fragment key={item.id + index}>
                    <ListItem sx={{ py: 1, px: 3 }}>
                      <ListItemText 
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          fontWeight: 'medium'
                        }}
                        secondaryTypographyProps={{ 
                          variant: 'body2' 
                        }}
                      />
                      <Typography variant="body2">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                    {index < order.items.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ))}
        </>
      )}
    </Container>
  );
}; 