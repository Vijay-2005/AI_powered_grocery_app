import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Divider,
  Button,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalMall as LocalMallIcon,
  LocalShipping as LocalShippingIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { Payment } from './Payment';

export const Cart: React.FC = () => {
  const { state: { items }, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, change: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, change },
    });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id },
    });
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    return 0; // Free delivery on all orders
  };

  const getTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const getTotal = () => {
    return calculateSubtotal() + getDeliveryFee() + getTax();
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          elevation={3}
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            borderRadius: 2,
            backgroundColor: 'rgba(250, 250, 250, 0.9)',
            backgroundImage: 'url("https://source.unsplash.com/featured/?grocery,vegetables")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(5px)'
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 3,
                boxShadow: 3
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: 60, color: 'white' }} />
            </Avatar>
            
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main">
              Your cart is empty
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              Looks like you haven't added any items to your cart yet. Start shopping to add products to your cart.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              href="/"
              size="large"
              startIcon={<LocalMallIcon />}
              sx={{ 
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: 2
              }}
            >
              Browse Products
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <LocalMallIcon sx={{ mr: 1, color: 'primary.main' }} />
        Your Shopping Cart ({items.length})
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 65%' }, width: '100%' }}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 2, borderRadius: 2 }}>
            {items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  mb: 2,
                  p: { xs: 2, sm: 3 },
                  border: 'none',
                  boxShadow: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 0,
                  '&:last-child': {
                    borderBottom: 'none',
                    mb: 0
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.01)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '100%', sm: 130 },
                    height: { xs: 160, sm: 130 },
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    mb: { xs: 2, sm: 0 }
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    image={item.image}
                    alt={item.name}
                  />
                  <Chip 
                    label={`${item.quantity} × ₹${item.price}`} 
                    size="small" 
                    color="primary"
                    sx={{ 
                      position: 'absolute', 
                      bottom: 8, 
                      left: 8,
                      backgroundColor: 'rgba(46, 125, 50, 0.85)',
                      '& .MuiChip-label': {
                        fontWeight: 'bold'
                      }
                    }} 
                  />
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flexGrow: 1, 
                    ml: { xs: 0, sm: 3 }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.unit} {item.category && `• ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
                        {item.description && (item.description.substring(0, 80) + (item.description.length > 80 ? '...' : ''))}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ 
                        color: 'error.main',
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.2)',
                        },
                        width: 36,
                        height: 36
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: { xs: 2, sm: 'auto' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 2, sm: 0 }
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: 6,
                        p: 0.5,
                        backgroundColor: 'white'
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        color="primary"
                        sx={{ 
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.2)',
                          }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2, fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        color="primary"
                        sx={{ 
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.2)',
                          }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              href="/"
              sx={{ borderRadius: 2 }}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              sx={{ borderRadius: 2 }}
            >
              Clear Cart
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 35%' }, width: '100%' }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)', fontWeight: 'bold' }}>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: 2 
                }}
              >
                <Typography color="text.secondary">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</Typography>
                <Typography fontWeight="medium">
                  ₹{calculateSubtotal().toFixed(2)}
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: 2 
                }}
              >
                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShippingIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  Delivery Fee
                  {getDeliveryFee() === 0 && (
                    <Chip 
                      label="FREE" 
                      size="small" 
                      color="success" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Typography>
                <Typography fontWeight="medium">
                  {getDeliveryFee() === 0 ? '₹0.00' : `₹${getDeliveryFee().toFixed(2)}`}
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: 1
                }}
              >
                <Typography color="text.secondary">Tax (5%)</Typography>
                <Typography fontWeight="medium">
                  ₹{getTax().toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              py: 2,
              mb: 3
            }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ₹{getTotal().toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                // Focus on payment container
                const paymentContainer = document.getElementById('payment-container');
                if (paymentContainer) {
                  paymentContainer.style.display = 'block';
                  paymentContainer.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Focus on the UPI input field if it exists
                setTimeout(() => {
                  const upiInput = document.querySelector('input[placeholder="yourname@upi"]') as HTMLInputElement;
                  if (upiInput) {
                    upiInput.focus();
                  }
                }, 500);
              }}
              sx={{ 
                py: 1.8, 
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(46, 125, 50, 0.3)'
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Box id="payment-container" sx={{ mt: 3, display: 'block' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                Payment Method
              </Typography>
              <Payment />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};