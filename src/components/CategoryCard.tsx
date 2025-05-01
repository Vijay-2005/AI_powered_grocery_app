import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Rating, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

// Helper component to fix Grid typing issues with MUI v5
const Item = (props: any) => <Grid {...props} />;

// Additional category highlight type definition
interface CategoryHighlight {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  buttonColor: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  buttonText: string;
  link: string;
  buttonTextColor?: string;
}

// Additional category data
const categoryHighlights: CategoryHighlight[] = [
  {
    title: "Organic Produce",
    description: "Explore our range of certified organic fruits and vegetables, grown without harmful pesticides or chemicals.",
    icon: <LocalOfferIcon />,
    bgColor: '#e8f5e9',
    textColor: '#1b5e20',
    buttonColor: 'success',
    buttonText: "Shop Organic",
    link: "/?category=organic",
    buttonTextColor: 'white'
  },
  {
    title: "Dairy & Eggs",
    description: "Farm-fresh dairy products and eggs delivered directly from local farmers to your doorstep.",
    icon: <LocalOfferIcon />,
    bgColor: '#fff8e1',
    textColor: '#ff8f00',
    buttonColor: 'warning',
    buttonText: "Explore Dairy",
    link: "/?category=dairy-eggs",
    buttonTextColor: 'white'
  },
  {
    title: "Bakery Items",
    description: "Freshly baked bread, pastries, and more made with premium ingredients and traditional recipes.",
    icon: <LocalOfferIcon />,
    bgColor: '#fce4ec',
    textColor: '#c2185b',
    buttonColor: 'secondary',
    buttonText: "View Bakery",
    link: "/?category=bakery",
    buttonTextColor: 'white'
  },
  {
    title: "Premium Meats",
    description: "High-quality, ethically sourced meats including grass-fed beef, free-range chicken, and fresh seafood.",
    icon: <LocalOfferIcon />,
    bgColor: '#ffebee',
    textColor: '#b71c1c',
    buttonColor: 'error',
    buttonText: "Shop Meats",
    link: "/?category=meats",
    buttonTextColor: 'white'
  },
  {
    title: "Gourmet Foods",
    description: "Discover specialty and artisanal products from around the world, perfect for food enthusiasts.",
    icon: <LocalOfferIcon />,
    bgColor: '#e3f2fd',
    textColor: '#0d47a1',
    buttonColor: 'info',
    buttonText: "Explore Gourmet",
    link: "/?category=gourmet",
    buttonTextColor: 'white'
  }
];

// Define seasonal categories
interface SeasonalCategory {
  id: string;
  name: string;
  image: string;
  description: string;
  discount?: string;
  rating: number;
  reviews: string;
}

const seasonalCategories: SeasonalCategory[] = [
  {
    id: 'summer-fruits',
    name: 'Summer Fruits',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    description: 'Enjoy the freshest seasonal fruits hand-picked at the peak of their flavor.',
    discount: '15',
    rating: 4.8,
    reviews: '250+'
  },
  {
    id: 'bbq-essentials',
    name: 'BBQ Essentials',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    description: 'Everything you need for a perfect summer barbecue - from premium meats to marinades.',
    discount: '10',
    rating: 4.7,
    reviews: '180+'
  },
  {
    id: 'refreshing-beverages',
    name: 'Refreshing Beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    description: 'Stay cool with our selection of refreshing drinks, from fresh juices to craft sodas.',
    rating: 4.6,
    reviews: '210+'
  }
];

// Card component for consistency
const CategoryItemCard: React.FC<{
  image: string;
  name: string;
  description: string;
  rating: number;
  reviews: string | number;
  discount?: string;
  id: string;
}> = ({ image, name, description, rating, reviews, discount, id }) => {
  const navigate = useNavigate();
  
  return (
    <Paper 
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          height: 180, 
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        {discount && (
          <Chip
            label={`${discount}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontWeight: 'bold'
            }}
          />
        )}
      </Box>
      
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
          {name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            flexGrow: 1,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            lineHeight: '1.5em',
            height: '4.5em' 
          }}
        >
          {description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={rating || 4.5} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({reviews || '120+'}  items)
            </Typography>
          </Box>
          
          <Button 
            variant="text" 
            color="primary" 
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/?category=${id}`)}
            sx={{ fontWeight: 'medium', textTransform: 'none' }}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export const CategoryCard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Browse Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Explore our wide range of fresh and high-quality products organized in convenient categories
          </Typography>
        </Box>
        
        {/* Featured Categories Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Featured Categories
          </Typography>
          
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Item item xs={12} sm={6} md={4} key={category.id} sx={{ width: '100%' }}>
                <CategoryItemCard 
                  image={category.image} 
                  name={category.name}
                  description={category.description || `Browse our selection of fresh ${category.name.toLowerCase()} products.`}
                  rating={category.rating || 4.5}
                  reviews={category.reviews || '120+'}
                  discount={category.discount?.toString()}
                  id={category.id}
                />
              </Item>
            ))}
          </Grid>
        </Box>
        
        {/* Seasonal Categories */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Seasonal Favorites
          </Typography>
          
          <Grid container spacing={3}>
            {seasonalCategories.map((category) => (
              <Item item xs={12} sm={6} md={4} key={category.id} sx={{ width: '100%' }}>
                <CategoryItemCard 
                  image={category.image} 
                  name={category.name}
                  description={category.description}
                  rating={category.rating}
                  reviews={category.reviews}
                  discount={category.discount}
                  id={category.id}
                />
              </Item>
            ))}
          </Grid>
        </Box>
        
        {/* Category Highlights */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Category Highlights
          </Typography>
          
          <Grid container spacing={3}>
            {categoryHighlights.map((highlight, index) => (
              <Item item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
                <Paper 
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: highlight.bgColor,
                    color: highlight.textColor,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      {highlight.title}
                    </Typography>
                    {highlight.icon}
                  </Box>
                  
                  <Typography 
                    sx={{ 
                      mb: 3, 
                      flexGrow: 1,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                      lineHeight: '1.5em',
                      height: '4.5em'
                    }}
                  >
                    {highlight.description}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color={highlight.buttonColor || 'primary'}
                    onClick={() => navigate(highlight.link)}
                    sx={{ 
                      alignSelf: 'flex-start',
                      borderRadius: 8,
                      px: 2,
                      color: highlight.buttonTextColor || 'white'
                    }}
                  >
                    {highlight.buttonText}
                  </Button>
                </Paper>
              </Item>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};