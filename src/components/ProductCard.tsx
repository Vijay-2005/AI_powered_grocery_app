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
  Rating,
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width:400px)');

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        borderRadius: isMobile ? 2 : 3,
        '&:hover': {
          transform: isMobile ? 'none' : 'translateY(-5px)',
          boxShadow: isMobile ? '0 4px 8px rgba(0,0,0,0.1)' : '0 8px 16px rgba(0,0,0,0.1)',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {!imageLoaded && (
          <Skeleton 
            variant="rectangular" 
            height={isMobile ? 140 : 160} 
            width="100%" 
            animation="wave"
            sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
          />
        )}
        <CardMedia
          component="img"
          height={isMobile ? 140 : 160}
          image={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          sx={{ 
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
            borderTopRightRadius: isMobile ? 8 : 12,
            borderTopLeftRadius: isMobile ? 8 : 12,
          }}
        />
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 6, 
            right: 6,
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.8)',
            },
            width: isExtraSmall ? 24 : 30,
            height: isExtraSmall ? 24 : 30,
            padding: isExtraSmall ? 0.5 : 0
          }}
          onClick={() => setFavorite(!favorite)}
          size="small"
        >
          {favorite ? 
            <FavoriteIcon sx={{ color: '#e91e63', fontSize: isExtraSmall ? '0.8rem' : '1rem' }} /> : 
            <FavoriteBorderIcon sx={{ fontSize: isExtraSmall ? '0.8rem' : '1rem' }} />
          }
        </IconButton>
        {product.category && (
          <Chip 
            label={product.category.charAt(0).toUpperCase() + product.category.slice(1)} 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 6, 
              left: 6,
              backgroundColor: 'rgba(46, 125, 50, 0.85)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: isExtraSmall ? '0.5rem' : '0.6rem',
              height: isExtraSmall ? 16 : 20,
              '& .MuiChip-label': {
                px: isExtraSmall ? 0.5 : 1
              }
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: isExtraSmall ? 1 : (isMobile ? 1.2 : 1.5), 
        pb: isExtraSmall ? 1 : (isMobile ? 1.2 : 1.5),
        '&:last-child': { pb: isExtraSmall ? 1 : (isMobile ? 1.2 : 1.5) }
      }}>
        <Typography 
          gutterBottom 
          variant={isExtraSmall ? "body2" : (isMobile ? "body1" : "subtitle1")} 
          component="div" 
          fontWeight="bold" 
          sx={{ 
            mb: 0.5, 
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Rating 
            value={4} 
            size={isExtraSmall ? "small" : "small"} 
            readOnly 
            precision={0.5}
            sx={{ '& .MuiRating-icon': { fontSize: isExtraSmall ? '0.8rem' : '1rem' } }} 
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontSize: isExtraSmall ? '0.65rem' : '0.75rem' }}>
            (4.0)
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 1, 
          fontSize: isExtraSmall ? '0.65rem' : '0.75rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.3
        }}>
          {product.description}
        </Typography>
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant={isExtraSmall ? "body1" : "h6"} color="primary" fontWeight="bold" sx={{ fontSize: isExtraSmall ? '0.9rem' : '1.1rem' }}>
              ₹{product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.6rem' : '0.7rem' }}>
              per {product.unit}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            startIcon={isExtraSmall ? null : <AddShoppingCartIcon fontSize="small" />}
            size="small"
            sx={{ 
              borderRadius: 2,
              boxShadow: 'none',
              py: isExtraSmall ? 0.3 : 0.5,
              px: isExtraSmall ? 1 : 1.5,
              minWidth: isExtraSmall ? '50px' : 'auto',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
              }
            }}
          >
            {isExtraSmall ? <AddShoppingCartIcon fontSize="small" /> : "Add"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}; 