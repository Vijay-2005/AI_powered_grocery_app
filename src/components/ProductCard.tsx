import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Skeleton,
  Rating
} from '@mui/material';
import { 
  AddShoppingCart as AddShoppingCartIcon, 
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon 
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    unit: string;
    category?: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {!imageLoaded && (
          <Skeleton 
            variant="rectangular" 
            height={200} 
            width="100%" 
            animation="wave"
            sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
          />
        )}
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          sx={{ 
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          }}
        />
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.8)',
            },
            width: 36,
            height: 36
          }}
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? 
            <FavoriteIcon sx={{ color: '#e91e63' }} fontSize="small" /> : 
            <FavoriteBorderIcon fontSize="small" />
          }
        </IconButton>
        {product.category && (
          <Chip 
            label={product.category.charAt(0).toUpperCase() + product.category.slice(1)} 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              left: 8,
              backgroundColor: 'rgba(46, 125, 50, 0.85)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.7rem'
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold" sx={{ mb: 1 }}>
          {product.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={4} size="small" readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            (4.0)
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {product.description}
        </Typography>
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ₹{product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              per {product.unit}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            startIcon={<AddShoppingCartIcon />}
            size="small"
            sx={{ 
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
              }
            }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 