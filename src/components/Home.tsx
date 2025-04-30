import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  Button,
  Grid,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  LocalMall as LocalMallIcon 
} from '@mui/icons-material';
import { ProductCard } from './ProductCard';
import { CategoryCard } from './CategoryCard';
import { products, categories } from '../data/products';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
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
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)'
          }
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
      </Box>
    </Container>
  );
}; 