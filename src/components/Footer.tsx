import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        py: 4,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
            <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
              Fresh Cart
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your one-stop destination for fresh groceries and essentials delivered right to your doorstep.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary" aria-label="facebook">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="twitter">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary" aria-label="linkedin">
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/categories" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Categories
            </Link>
            <Link href="/offers" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Offers
            </Link>
            <Link href="/contact" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Box>
          
          <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Help & Support
            </Typography>
            <Link href="/faq" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
            <Link href="/shipping" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Shipping Policy
            </Link>
            <Link href="/returns" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Returns & Refunds
            </Link>
            <Link href="/privacy" color="text.secondary" underline="hover" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
          </Box>
          
          <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                123 Grocery St, Bangalore, India
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                +91 98765 43210
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                support@freshcart.com
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Fresh Cart. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}; 