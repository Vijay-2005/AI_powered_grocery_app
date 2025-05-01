import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Chip } from '@mui/material';
import { 
  LocalOffer as LocalOfferIcon, 
  Timer as TimerIcon, 
  Loyalty as LoyaltyIcon,
  ShoppingBasket as ShoppingBasketIcon,
  CreditCard as CreditCardIcon,
  VerifiedUser as VerifiedUserIcon,
  CardGiftcard as CardGiftcardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Helper component to fix Grid typing issues with MUI v5
const Item = (props: any) => <Grid {...props} />;

// Interface for current offers
interface OfferItem {
  title: string;
  description: string;
  image: string;
  discount: string;
  code?: string;
  validity: string;
  link: string;
}

// Interface for membership tier
interface MembershipTier {
  name: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  pointsRequired: number;
}

// Current offers data
const currentOffers: OfferItem[] = [
  {
    title: "Fresh Fruits Bundle",
    description: "Get a curated selection of seasonal fruits delivered to your doorstep with special discount.",
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "20% OFF",
    code: "FRUITS20",
    validity: "Valid until June 30, 2023",
    link: "/?category=fruits"
  },
  {
    title: "Organic Vegetable Box",
    description: "Weekly subscription of fresh organic vegetables sourced directly from local farms.",
    image: "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "15% OFF",
    code: "ORGANIC15",
    validity: "Valid until July 15, 2023",
    link: "/?category=vegetables"
  },
  {
    title: "Dairy Products",
    description: "Farm-fresh milk, cheese, and yogurt from grass-fed cows with no added hormones.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "10% OFF",
    code: "DAIRY10",
    validity: "Valid until June 25, 2023",
    link: "/?category=dairy"
  },
  {
    title: "Artisanal Bakery Bundle",
    description: "Freshly baked breads, pastries, and desserts made with traditional recipes and premium ingredients.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "25% OFF",
    code: "BAKERY25",
    validity: "Valid until July 5, 2023",
    link: "/?category=bakery"
  },
  {
    title: "Premium Meat Selection",
    description: "High-quality, ethically sourced cuts of beef, chicken, and pork for your gourmet cooking needs.",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "15% OFF",
    code: "MEAT15",
    validity: "Valid until June 28, 2023",
    link: "/?category=meat"
  },
  {
    title: "First Order Special",
    description: "Special discount for new customers on their first order. Welcome to our grocery family!",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    discount: "30% OFF",
    code: "WELCOME30",
    validity: "Valid for first-time customers only",
    link: "/"
  }
];

// Promotional banners data
const promotionalBanners = [
  {
    title: "Loyalty Program",
    description: "Join our loyalty program and earn points with every purchase. Redeem points for exclusive discounts and free products.",
    icon: <LoyaltyIcon fontSize="medium" />,
    bgColor: "#e3f2fd",
    gradientColor: "#bbdefb",
    textColor: "#0d47a1",
    buttonColor: "#1565c0",
    buttonHoverColor: "#0d47a1",
    buttonText: "Join Now",
    link: "/"
  },
  {
    title: "Free Delivery",
    description: "Enjoy free delivery on all orders with no minimum purchase required. Available for all products and locations within city limits.",
    icon: <ShoppingBasketIcon fontSize="medium" />,
    bgColor: "#e8f5e9",
    gradientColor: "#c8e6c9",
    textColor: "#1b5e20",
    buttonColor: "#2e7d32",
    buttonHoverColor: "#1b5e20",
    buttonText: "Shop Now",
    link: "/"
  }
];

// Membership tiers
const membershipTiers: MembershipTier[] = [
  {
    name: "Silver",
    icon: <LoyaltyIcon fontSize="large" />,
    color: "#9e9e9e",
    benefits: [
      "5% discount on all orders",
      "Free delivery on all orders",
      "24-hour customer support",
      "Early access to weekly deals"
    ],
    pointsRequired: 500
  },
  {
    name: "Gold",
    icon: <VerifiedUserIcon fontSize="large" />,
    color: "#ffc107",
    benefits: [
      "10% discount on all orders",
      "Free delivery on all orders",
      "Priority customer support",
      "Monthly surprise gift on orders above ₹1000",
      "Exclusive access to special products"
    ],
    pointsRequired: 1500
  },
  {
    name: "Platinum",
    icon: <CardGiftcardIcon fontSize="large" />,
    color: "#7b1fa2",
    benefits: [
      "15% discount on all orders",
      "Free priority delivery",
      "Dedicated customer service representative",
      "Quarterly free gift basket",
      "First access to new product launches",
      "Invitation to exclusive tasting events"
    ],
    pointsRequired: 3000
  }
];

export const Offers: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5, pb: 8 }}> {/* Added more bottom padding to accommodate the footer */}
        {/* Header Section */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Special Offers & Deals
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Discover our exclusive promotions, discounts, and limited-time offers to save on your favorite products
          </Typography>
        </Box>
        
        {/* Featured Offer Banner */}
        <Paper 
          elevation={3}
          sx={{
            mb: 5,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            height: { xs: 300, sm: 350, md: 400 },
            backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <Box 
            sx={{ 
              position: 'relative', 
              zIndex: 1, 
              color: 'white',
              p: { xs: 3, md: 6 },
              maxWidth: { xs: '100%', md: '60%' }
            }}
          >
            <Chip 
              icon={<TimerIcon />} 
              label="Limited Time" 
              color="error" 
              sx={{ mb: 2, fontWeight: 'bold' }} 
            />
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Get 25% OFF on Your First Order
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Use code: <Box component="span" sx={{ fontWeight: 'bold', color: '#ffeb3b' }}>FRESH25</Box>
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => navigate('/')}
              sx={{ 
                px: 4, 
                py: 1.5, 
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Paper>
        
        {/* Current Offers */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Current Offers
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {currentOffers.map((offer, index) => (
            <Item item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
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
                    height: 180, 
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={offer.image}
                    alt={offer.title}
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
                  <Chip
                    icon={<LocalOfferIcon />}
                    label={offer.discount}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
                
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {offer.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {offer.description}
                  </Typography>
                  
                  {offer.code && (
                    <Box 
                      sx={{ 
                        bgcolor: '#f5f5f5', 
                        p: 1, 
                        borderRadius: 1, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Typography variant="body2">
                        Code: <Box component="span" fontWeight="bold">{offer.code}</Box>
                      </Typography>
                      <Chip size="small" label="Copy" color="primary" onClick={() => navigator.clipboard.writeText(offer.code || '')} />
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {offer.validity}
                    </Typography>
                    
                    <Button 
                      variant="contained" 
                      color="primary" 
                      endIcon={<ShoppingBasketIcon />}
                      onClick={() => navigate(offer.link)}
                      size="small"
                      sx={{ 
                        borderRadius: 8,
                        fontWeight: 'medium'
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Item>
          ))}
        </Grid>
        
        {/* Membership Rewards Section */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Membership Rewards
        </Typography>
        
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 5,
            backgroundImage: 'linear-gradient(to right, #f3e5f5, #e1bee7)',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Item item xs={12} md={6} sx={{ width: '100%' }}>
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="#4a148c">
                  Join Our Rewards Program
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: '#4a148c', opacity: 0.9 }}>
                  Earn points with every purchase and unlock exclusive benefits. The more you shop, the more you save!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CreditCardIcon sx={{ color: '#4a148c', mr: 1 }} />
                  <Typography variant="body1" sx={{ color: '#4a148c' }}>
                    1 point for every ₹10 spent
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#6a1b9a',
                    '&:hover': { bgcolor: '#4a148c' },
                    borderRadius: 8,
                    px: 3
                  }}
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up Now
                </Button>
              </Box>
            </Item>
            <Item item xs={12} md={6} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <img 
                  src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Rewards Program" 
                  style={{ 
                    maxWidth: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 16
                  }} 
                />
              </Box>
            </Item>
          </Grid>
        </Paper>
        
        {/* Membership Tiers */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {membershipTiers.map((tier, index) => (
            <Item item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    backgroundColor: tier.color,
                    opacity: 0.1,
                    borderRadius: '0 0 0 80px'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: tier.color, mr: 1 }}>
                    {tier.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: tier.color }}>
                    {tier.name} Tier
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tier.pointsRequired} points required
                  </Typography>
                </Box>
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Benefits:
                </Typography>
                
                <Box component="ul" sx={{ pl: 2, mb: 3, flexGrow: 1 }}>
                  {tier.benefits.map((benefit, i) => (
                    <Typography component="li" variant="body2" key={i} sx={{ mb: 0.5 }}>
                      {benefit}
                    </Typography>
                  ))}
                </Box>
                
                <Button
                  variant="outlined"
                  sx={{ 
                    color: tier.color, 
                    borderColor: tier.color,
                    '&:hover': {
                      borderColor: tier.color,
                      backgroundColor: `${tier.color}10`
                    },
                    borderRadius: 8,
                    alignSelf: 'flex-start'
                  }}
                  onClick={() => navigate('/sign-up')}
                >
                  Join Now
                </Button>
              </Paper>
            </Item>
          ))}
        </Grid>
        
        {/* Promotional Banners */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          More Ways to Save
        </Typography>
        
        <Grid container spacing={3}>
          {promotionalBanners.map((banner, index) => (
            <Item item xs={12} sm={6} key={index} sx={{ width: '100%' }}>
              <Paper 
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: banner.bgColor,
                  color: banner.textColor,
                  backgroundImage: `linear-gradient(to right, ${banner.bgColor}, ${banner.gradientColor})`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {banner.icon}
                  <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
                    {banner.title}
                  </Typography>
                </Box>
                
                <Typography sx={{ mb: 2, opacity: 0.9 }}>
                  {banner.description}
                </Typography>
                
                <Button 
                  variant="contained" 
                  sx={{ 
                    mt: 'auto', 
                    alignSelf: 'flex-start',
                    bgcolor: banner.buttonColor,
                    color: 'white',
                    '&:hover': {
                      bgcolor: banner.buttonHoverColor
                    },
                    borderRadius: 8
                  }}
                  onClick={() => navigate(banner.link)}
                >
                  {banner.buttonText}
                </Button>
              </Paper>
            </Item>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};