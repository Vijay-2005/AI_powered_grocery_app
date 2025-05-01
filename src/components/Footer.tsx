import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  IconButton, 
  Divider, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Tooltip,
  alpha
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  LocalOffer as LocalOfferIcon,
  ShoppingBasket as ShoppingBasketIcon,
  CreditCard as CreditCardIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  Store as StoreIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Helper component to fix Grid typing issues
const Item = (props: any) => <Grid {...props} />;

export const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
        color: 'white',
        pt: 8,
        pb: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3,
          zIndex: 0
        }
      }}
    >
      {/* Pre-footer Feature Bar */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={4} 
          sx={{ 
            backgroundColor: 'white', 
            mb: 5, 
            py: 3,
            px: 4,
            borderRadius: 4,
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
            transform: 'translateY(-40px)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1)
          }}
        >
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            {footerFeatures.map((feature, index) => (
              <Item 
                item 
                xs={12} 
                sm={6} 
                md={3} 
                key={index}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  borderLeft: index > 0 ? { xs: 'none', md: '1px solid rgba(0,0,0,0.08)' } : 'none',
                  pl: index > 0 ? { xs: 0, md: 2 } : 0,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    mr: 2,
                    flexShrink: 0
                  }}
                >
                  {feature.icon}
                </Paper>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Item>
            ))}
          </Grid>
        </Paper>

        <Grid container spacing={5}>
          {/* Company Info & Newsletter */}
          <Item item xs={12} md={5}>
            <Box mb={4}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  cursor: 'pointer',
                  width: 'fit-content',
                  '&:hover': {
                    '& .logo-icon': {
                      transform: 'rotate(-5deg) scale(1.1)',
                    },
                    '& .logo-text': {
                      letterSpacing: '0.5px',
                    }
                  }
                }}
                onClick={() => navigate('/')}
              >
                <StoreIcon 
                  className="logo-icon"
                  sx={{ 
                    fontSize: 32, 
                    mr: 1,
                    color: 'white',
                    transition: 'transform 0.3s ease'
                  }} 
                />
                <Typography 
                  variant="h5" 
                  component="div" 
                  className="logo-text"
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Fresh Cart
                </Typography>
              </Box>
              
              <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ mb: 3, maxWidth: 450, lineHeight: 1.6 }}>
                Fresh Cart is your one-stop destination for premium groceries and daily essentials. 
                We pride ourselves on sourcing the freshest products, offering unbeatable prices, 
                and providing exceptional customer service.
              </Typography>

              <Paper sx={{ 
                p: 3, 
                mb: 3,
                bgcolor: alpha('#ffffff', 0.1), 
                borderRadius: 3,
                backdropFilter: 'blur(5px)',
                boxShadow: 'none',
                border: '1px solid',
                borderColor: alpha('#ffffff', 0.2)
              }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1.5} color="white">
                  Subscribe to our newsletter
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ mb: 2 }}>
                  Get exclusive offers, recipes, and product updates
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <TextField 
                    placeholder="Your email address" 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    sx={{ 
                      bgcolor: alpha('#ffffff', 0.9),
                      borderRadius: 2,
                      maxWidth: { sm: 250 },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                          borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    endIcon={<SendIcon />}
                    sx={{ 
                      px: 2, 
                      whiteSpace: 'nowrap',
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(255, 152, 0, 0.25)',
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Paper>

              <Typography variant="subtitle2" fontWeight="bold" mb={1} color="white">
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialMedia.map((social, index) => (
                  <Tooltip key={index} title={social.name} arrow placement="top">
                    <IconButton 
                      size="medium" 
                      sx={{ 
                        bgcolor: alpha(social.color, 0.2), 
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'translateY(-3px)',
                          boxShadow: `0 4px 12px ${alpha(social.color, 0.4)}`
                        }
                      }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Item>

          {/* Quick Links & Resources */}
          <Item item xs={12} sm={6} md={2.5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="white" sx={{ 
              position: 'relative', 
              pb: 1.5, 
              mb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: 40,
                height: 3,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 3
              }
            }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url} 
                  color="rgba(255,255,255,0.85)" 
                  underline="none" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 0.5,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(5px)',
                      bgcolor: alpha('#ffffff', 0.1)
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: alpha('#ffffff', 0.1),
                      mr: 1.5
                    }}
                  >
                    {link.icon}
                  </Box>
                  <Typography variant="body2">
                    {link.text}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Item>

          {/* Help & Support */}
          <Item item xs={12} sm={6} md={2.5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="white" sx={{ 
              position: 'relative', 
              pb: 1.5, 
              mb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: 40,
                height: 3,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 3
              }
            }}>
              Customer Service
            </Typography>
            <Stack spacing={1.5}>
              {customerService.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.url} 
                  color="rgba(255,255,255,0.85)" 
                  underline="none" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 0.5,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#ffffff',
                      transform: 'translateX(5px)',
                      bgcolor: alpha('#ffffff', 0.1)
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: alpha('#ffffff', 0.1),
                      mr: 1.5
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="body2">
                    {item.text}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Item>

          {/* Contact Info */}
          <Item item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="white" sx={{ 
              position: 'relative', 
              pb: 1.5, 
              mb: 1.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: 40,
                height: 3,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 3
              }
            }}>
              Contact Us
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: alpha('#ffffff', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mr: 1.5
                  }}
                >
                  <LocationIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)' }} />
                </Box>
                <Typography variant="body2" color="rgba(255,255,255,0.9)">
                  123 Grocery St, Koramangala, Bangalore, 560034
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: alpha('#ffffff', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mr: 1.5
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)' }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="rgba(255,255,255,0.9)" fontWeight="medium">
                    +91 98765 43210
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    Toll-free: 1800-123-4567
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: alpha('#ffffff', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mr: 1.5
                  }}
                >
                  <EmailIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.9)' }} />
                </Box>
                <Typography variant="body2" color="rgba(255,255,255,0.9)" sx={{ 
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  textDecorationColor: alpha('#ffffff', 0.3)
                }}>
                  support@freshcart.com
                </Typography>
              </Box>
            </Stack>
          </Item>
        </Grid>

        <Box sx={{ mt: 6, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="white" sx={{ 
            position: 'relative', 
            display: 'inline-block',
            pb: 1.5, 
            mb: 2,
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '50%',
              height: 2,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 3
            }
          }}>
            Payment Methods
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {['Visa', 'Mastercard', 'RuPay', 'UPI', 'Net Banking', 'PayTM', 'Cash'].map((method, index) => (
              <Chip 
                key={index} 
                label={method} 
                size="small" 
                sx={{ 
                  borderRadius: '30px',
                  color: 'white',
                  bgcolor: alpha('#ffffff', 0.1),
                  border: '1px solid',
                  borderColor: alpha('#ffffff', 0.2),
                  '&:hover': {
                    bgcolor: alpha('#ffffff', 0.2),
                  }
                }} 
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: alpha('#ffffff', 0.1) }} />

        {/* Copyright and Legal Links */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'center', sm: 'center' },
            gap: 2
          }}
        >
          <Typography 
            variant="body2" 
            color="rgba(255,255,255,0.7)" 
            sx={{ 
              textAlign: { xs: 'center', sm: 'left' },
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}
          >
            <span>© {currentYear} Fresh Cart. All rights reserved.</span>
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                ml: 2,
                color: theme.palette.secondary.main,
                '&:hover': { color: theme.palette.secondary.light }
              }}
            >
              <StoreIcon sx={{ fontSize: 16, mr: 0.5 }} /> Made with ❤️ in India
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'FAQ'].map((item, index) => (
              <Link 
                key={index}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                color="rgba(255,255,255,0.7)" 
                underline="hover" 
                variant="body2"
                sx={{ 
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'white',
                  } 
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Footer features data
const footerFeatures = [
  {
    icon: <LocalShippingIcon color="primary" sx={{ fontSize: 24 }} />,
    title: "Free Shipping",
    description: "On orders above ₹500"
  },
  {
    icon: <SecurityIcon color="primary" sx={{ fontSize: 24 }} />,
    title: "Secure Payments",
    description: "100% secure checkout"
  },
  {
    icon: <LocalOfferIcon color="primary" sx={{ fontSize: 24 }} />,
    title: "Best Offers",
    description: "Daily deals & discounts"
  },
  {
    icon: <CreditCardIcon color="primary" sx={{ fontSize: 24 }} />,
    title: "Easy Returns",
    description: "Hassle-free returns"
  }
];

// Social media data
const socialMedia = [
  {
    name: "Facebook",
    icon: <FacebookIcon fontSize="small" />,
    color: "#3b5998",
    hoverColor: "#2d4373"
  },
  {
    name: "Twitter",
    icon: <TwitterIcon fontSize="small" />,
    color: "#1da1f2",
    hoverColor: "#0c85d0"
  },
  {
    name: "Instagram",
    icon: <InstagramIcon fontSize="small" />,
    color: "#e1306c",
    hoverColor: "#c13584"
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon fontSize="small" />,
    color: "#0077b5",
    hoverColor: "#00669c"
  }
];

// Quick links data
const quickLinks = [
  { text: "Home", url: "/", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "Shop by Category", url: "/categories", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "AI Recipe Cart", url: "/ai-cart", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "Special Offers", url: "/offers", icon: <LocalOfferIcon fontSize="small" /> },
  { text: "My Account", url: "/account", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "My Orders", url: "/orders", icon: <ShoppingBasketIcon fontSize="small" /> }
];

// Customer service data
const customerService = [
  { text: "Help Center", url: "/help", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "Track Order", url: "/track", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "Returns & Refunds", url: "/returns", icon: <ShoppingBasketIcon fontSize="small" /> },
  { text: "Shipping Info", url: "/shipping", icon: <LocalShippingIcon fontSize="small" /> },
  { text: "Contact Us", url: "/contact", icon: <EmailIcon fontSize="small" /> }
];