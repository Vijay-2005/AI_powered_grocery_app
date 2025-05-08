import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip, Rating, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/products';

/**
 * Helper component to fix Grid typing issues with MUI v5
 * This prevents TypeScript errors when using Grid with dynamic props
 */
const Item = (props: any) => <Grid {...props} />;

/**
 * Interface defining the structure of category highlight data
 * Used for the special highlight cards with colored backgrounds
 */
interface CategoryHighlight {
  title: string;                // Title of the highlight
  description: string;          // Description text
  icon: React.ReactNode;        // Icon component to display
  bgColor: string;              // Background color of the card
  textColor: string;            // Text color to use
  buttonColor: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';  // Button color variant
  buttonText: string;           // Text to display on the button
  link: string;                 // Navigation link for the button
  buttonTextColor?: string;     // Optional text color override for the button
}

/**
 * Data for the category highlights section
 * Each card contains information about a specific product category with custom styling
 */
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
/**
 * Interface for seasonal categories data structure
 * Used to create seasonal promotion cards with special discounts and ratings
 */
interface SeasonalCategory {
  id: string;          // Unique identifier for the category
  name: string;        // Display name
  image: string;       // URL for the category image
  description: string; // Detailed description text
  discount?: string;   // Optional discount percentage
  rating: number;      // Star rating (out of 5)
  reviews: string;     // Number of reviews text
}

/**
 * Data for seasonal categories section
 * Showcases seasonal and promotional items
 */
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

/**
 * Card component for displaying category items consistently across sections
 * Includes image, name, description, rating, and action button
 * 
 * @param image - URL of the category image
 * @param name - Display name of the category
 * @param description - Detailed description text
 * @param rating - Star rating value (out of 5)
 * @param reviews - Number of reviews/items text
 * @param discount - Optional discount percentage (displayed as a chip)
 * @param id - Category identifier used for navigation
 */
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

/**
 * Main Categories page component
 * Displays all product categories organized into sections:
 * - Header with page title and description
 * - Featured Categories grid (from data/products.ts)
 * - Seasonal Categories with promotions and ratings
 * - Category Highlights with custom styling and descriptions
 * 
 * The layout is responsive and adjusts based on screen size
 */
export const CategoryCard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box>        {/* Header Section - Title and description */}
        <Box sx={{ mb: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Browse Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Explore our wide range of fresh and high-quality products organized in convenient categories
          </Typography>
        </Box>
        
        {/* Featured Categories Section - Shows all available product categories */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Featured Categories
          </Typography>
            <Grid container spacing={3}>
            {categories.map((category) => (
              <Item item xs={12} sm={6} md={4} key={category.id} sx={{ width: '100%' }}>
                {/* xs=12 (full width on mobile), sm=6 (50% width on tablets), md=4 (33% width on desktop) */}
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
          {/* Seasonal Categories - Promotions and limited-time offerings */}
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
          {/* Category Highlights - Special themed sections with custom background colors */}
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