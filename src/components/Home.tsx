import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Chip,
  Grid as MuiGrid
} from '@mui/material';
import { 
  Search as SearchIcon,
  LocalMall as LocalMallIcon,
  SmartToy as AIIcon
} from '@mui/icons-material';
import { ProductCard } from './ProductCard';
import { products, categories } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

// Helper component to fix Grid typing issues with MUI v5
const Grid = (props: any) => <MuiGrid {...props} />;

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4, pb: 12 }}> {/* Added padding to bottom to ensure footer is visible */}
        {/* Hero Section */}
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'primary.main',
            backgroundImage: 'linear-gradient(45deg, #2e7d32 30%, #43a047 90%)',
            color: 'white',
            p: 4,
            borderRadius: 3,
            mb: 4,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1,
              backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }} 
          />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Fresh Groceries Delivered
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
              Shop from our wide selection of fresh produce and groceries
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<LocalMallIcon />}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 8,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Shop Now
              </Button>
              
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<AIIcon sx={{ animation: 'pulse 1.5s infinite' }} />}
                onClick={() => navigate('/ai-cart')}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 8,
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                  textTransform: 'none',
                  fontSize: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, transparent 1%, rgba(255,255,255,0.1) 1%) center/15000%',
                    opacity: 0,
                    transition: 'background 0.5s, opacity 0.3s'
                  },
                  '&:active::after': {
                    backgroundSize: '100%',
                    opacity: 1,
                    transition: 'background 0s, opacity 0s'
                  }
                }}
              >
                Try AI Recipe Cart
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* AI Cart Feature Highlight */}
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffecb3 0%, #ffe082 100%)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 3
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AIIcon color="secondary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" color="secondary.dark" fontWeight="bold">
                AI Recipe Cart
              </Typography>
              <Chip 
                label="NEW" 
                size="small" 
                color="error" 
                sx={{ ml: 1, height: 20, fontWeight: 'bold', fontSize: '0.6rem' }} 
              />
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Let AI create your shopping list! Just enter any recipe and we'll automatically add all the ingredients to your cart.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              startIcon={<AIIcon />}
              onClick={() => navigate('/ai-cart')}
              sx={{ borderRadius: 8 }}
            >
              Try Now
            </Button>
          </Box>
          <Box 
            sx={{ 
              flex: 0.7, 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              bgcolor: 'rgba(255,255,255,0.5)',
              borderRadius: 2
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1608613304899-ea8098577e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="AI Recipe Suggestion" 
              style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8 }}
            />
          </Box>
        </Paper>

        {/* Search Bar */}
        <Paper 
          elevation={2} 
          sx={{ 
            mb: 4, 
            p: 0.5, 
            display: 'flex', 
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: 8, 
                py: 0.5,
                '& fieldset': { border: 'none' } 
              }
            }}
          />
        </Paper>

        {/* Categories */}
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Categories
        </Typography>
        <Box sx={{ mb: 4, overflowX: 'auto', py: 1 }}>
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            minWidth: 'max-content',
            pb: 1
          }}>
            <Chip
              label="All Products"
              color={selectedCategory === null ? "primary" : "default"}
              onClick={() => setSelectedCategory(null)}
              sx={{ 
                px: 1, 
                fontWeight: selectedCategory === null ? 'bold' : 'normal',
                '& .MuiChip-label': { px: 1.5 }
              }}
            />
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                color={category.id === selectedCategory ? "primary" : "default"}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                sx={{ 
                  px: 1, 
                  fontWeight: category.id === selectedCategory ? 'bold' : 'normal',
                  '& .MuiChip-label': { px: 1.5 }
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Category Cards - Visual Display */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
              <Paper
                sx={{
                  position: 'relative',
                  height: 140,
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    p: 1.5
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">{category.name}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name 
              : searchQuery ? 'Search Results' : 'All Products'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredProducts.length} items
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid',
          gap: { xs: 2, sm: 3 },
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)'
          }
        }}>
          {filteredProducts.map((product) => (
            <Box sx={{ height: '100%' }} key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
          {filteredProducts.length === 0 && (
            <Box sx={{ 
              gridColumn: '1 / -1',
              textAlign: 'center', 
              py: 8,
              px: 3
            }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Try adjusting your search or filter to find what you're looking for.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Box>
        
        {/* Customer Testimonials Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ mb: 1 }}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
            Join thousands of satisfied customers who enjoy fresh groceries delivered to their doorstep
          </Typography>
          
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  position: 'relative',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -15,
                    left: 20,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    zIndex: 1
                  }
                }}>
                  <Typography 
                    sx={{ 
                      fontSize: '3rem', 
                      color: 'secondary.light', 
                      lineHeight: 1,
                      mb: 2
                    }}
                  >
                    "
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                    {testimonial.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        mr: 2,
                        flexShrink: 0
                      }}
                    >
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

// Customer testimonials data
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    content: "Fresh Cart has transformed how I shop for groceries. The quality of their produce is exceptional, and I love the AI Recipe feature that helps me plan my meals effortlessly!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    content: "I've been using Fresh Cart for 3 months now, and I'm impressed with their service. The delivery is always on time, and their app is so easy to use. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Aisha Patel",
    location: "Bangalore",
    content: "The AI Recipe Cart is a game-changer! I just type the dish I want to make, and all ingredients are added to my cart automatically. Saves me so much time and effort.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
]; 