import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, alpha, GlobalStyles, Container, Grid as MuiGrid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import { AICart } from './components/AICart';
import { Footer } from './components/Footer';
import { Box, AppBar, Toolbar, Typography, Button, Badge, IconButton, Avatar, Menu, MenuItem, Tooltip, Fade, Paper, Link } from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Favorite as FavoriteIcon, 
  Search as SearchIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  ContactSupport as ContactSupportIcon,
  Store as StoreIcon,
  SmartToy as AIIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';
import { TextField } from '@mui/material';
import { OrderSuccess } from './components/OrderSuccess';
import { Orders } from './components/Orders';
import { CategoryCard } from './components/CategoryCard';
import { Offers } from './components/Offers';
import { Contact } from './components/Contact';

// Helper component to fix Grid typing issues with MUI v5
const Grid = (props: any) => <MuiGrid {...props} />;

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color for grocery theme
      light: '#60ad5e',
      dark: '#005005',
    },
    secondary: {
      main: '#ff9800', // Orange color for accents
      light: '#ffc947',
      dark: '#c66900',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            boxShadow: '0 4px 10px rgba(46, 125, 50, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 15px rgba(46, 125, 50, 0.35)',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/signin" />;
};

const NavButton: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
}> = ({ to, icon, label }) => {
  const navigate = useNavigate();
  
  return (
    <Button 
      color="inherit" 
      onClick={() => navigate(to)}
      startIcon={icon}
      sx={{ 
        position: 'relative',
        fontWeight: 500,
        borderRadius: 1,
        px: 2,
        py: 1,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          color: 'primary.main',
          '&::before': {
            opacity: 1,
          },
        },
        '&:active': {
          transform: 'translateY(0)',
        }
      }}
    >
      {label}
    </Button>
  );
};

const Navigation: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { state: { items } } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Toolbar sx={{ py: 0.5 }}>
          {/* Logo and Brand */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: { xs: 1, md: 0 }, 
              mr: 3,
              '&:hover': {
                '& .brand-logo': {
                  transform: 'scale(1.05) rotate(-3deg)',
                },
                '& .brand-text': {
                  color: 'primary.dark',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                },
              }
            }}
          >
            <Box 
              component="a" 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              sx={{ 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box 
                sx={{ 
                  position: 'relative',
                  mr: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <StoreIcon 
                  className="brand-logo"
                  sx={{ 
                    fontSize: 38, 
                    color: 'primary.main',
                    transition: 'transform 0.3s ease',
                  }} 
                />
              </Box>
              <Typography 
                variant="h5" 
                component="div" 
                className="brand-text"
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Fresh Cart
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links - Desktop */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            <NavButton to="/" icon={<HomeIcon />} label="Home" />
            <NavButton to="/categories" icon={<CategoryIcon />} label="Categories" />
            <NavButton to="/offers" icon={<LocalOfferIcon />} label="Offers" />
            <NavButton to="/contacts" icon={<ContactSupportIcon />} label="Contact" />
            <Button 
              color="primary" 
              variant="contained"
              onClick={() => navigate('/ai-cart')}
              startIcon={<AIIcon sx={{ animation: 'pulse 1.5s infinite' }} />}
              sx={{ 
                position: 'relative',
                fontWeight: 600,
                borderRadius: 2,
                ml: 1,
                px: 2,
                py: 1,
                backgroundColor: 'secondary.main',
                color: 'white',
                boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 15px rgba(255, 152, 0, 0.4)',
                  backgroundColor: 'secondary.dark',
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'error.main',
                  animation: 'pulse 1.5s infinite',
                }
              }}
            >
              AI Cart
            </Button>
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx: 2 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                width: '100%',
                maxWidth: 500,
                p: '2px 4px',
                borderRadius: 5,
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <IconButton sx={{ p: '10px', color: 'primary.main' }}>
                <SearchIcon />
              </IconButton>
              <TextField
                variant="standard"
                fullWidth
                placeholder="Search for products..."
                InputProps={{
                  disableUnderline: true,
                  sx: { 
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    py: 0.5
                  }
                }}
              />
            </Paper>
          </Box>

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* Mobile-only AI Cart Button */}
            <Tooltip title="AI Recipe Cart" arrow>
              <IconButton 
                color="secondary"
                onClick={() => navigate('/ai-cart')}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'scale(1.1)'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'error.main',
                    animation: 'pulse 1.5s infinite',
                  }
                }}
              >
                <AIIcon />
              </IconButton>
            </Tooltip>
            
            {currentUser ? (
              <>
                <Tooltip title="Wishlist" arrow>
                  <IconButton 
                    color="inherit" 
                    onClick={() => navigate('/wishlist')}
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Badge badgeContent={0} color="secondary">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cart" arrow>
                  <IconButton 
                    color="inherit" 
                    onClick={() => navigate('/cart')}
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Badge badgeContent={items.length} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Box sx={{ ml: 1 }}>
                  <Tooltip title="Account" arrow>
                    <IconButton
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      sx={{ 
                        transition: 'all 0.3s ease',
                        p: 0.5,
                        border: '2px solid transparent',
                        '&:hover': {
                          borderColor: 'primary.light',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 35, 
                          height: 35, 
                          bgcolor: 'primary.main',
                          fontWeight: 'bold'
                        }}
                      >
                        {currentUser.email?.[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    TransitionComponent={Fade}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={() => { 
                      navigate('/profile');
                      setAnchorEl(null);
                    }}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => { 
                      navigate('/orders');
                      setAnchorEl(null);
                    }}>
                      My Orders
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleLogout();
                      setAnchorEl(null);
                    }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button 
                  color="primary" 
                  variant="outlined"
                  onClick={() => navigate('/signin')}
                  sx={{ 
                    fontWeight: 'medium',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/signup')}
                  sx={{ 
                    ml: 1, 
                    fontWeight: 'medium',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}
    </>
  );
};

// Memoize the Navigation and Footer components
const MemoizedNavigation = React.memo(Navigation);
const MemoizedFooter = React.memo(Footer);

const App: React.FC = () => {
  // Define the global styles for animations
  const globalStyles = (
    <GlobalStyles 
      styles={{
        '@keyframes pulse': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(255, 152, 0, 0.7)'
          },
          '70%': {
            boxShadow: '0 0 0 6px rgba(255, 152, 0, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(255, 152, 0, 0)'
          }
        }
      }}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <Router>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                bgcolor: '#f5f5f5'
              }}>
                <MemoizedNavigation />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                    <Route path="/ai-cart" element={<PrivateRoute><AICart /></PrivateRoute>} />
                    <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
                    <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                    <Route path="/categories" element={<CategoryCard />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/contacts" element={<Contact />} />
                  </Routes>
                </Box>
                <MemoizedFooter />
              </Box>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
