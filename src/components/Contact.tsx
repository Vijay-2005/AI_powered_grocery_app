import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  MenuItem, 
  Snackbar, 
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  Phone as PhoneIcon, 
  Email as EmailIcon, 
  LocationOn as LocationIcon, 
  Send as SendIcon, 
  AccessTime as AccessTimeIcon,
  ExpandMore as ExpandMoreIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

// Helper component to fix Grid typing issues with MUI v5
const Item = (props: any) => <Grid {...props} />;

// Contact information
const contactInfo = [
  {
    title: "Call Us",
    description: "Our customer service team is available 7 days a week from 8:00 AM to 10:00 PM IST.",
    icon: <PhoneIcon />,
    actions: [
      "+91 1234 567 890",
      "+91 9876 543 210",
      "Toll-Free: 1800 123 4567"
    ]
  },
  {
    title: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours on business days.",
    icon: <EmailIcon />,
    actions: [
      "support@groceryapp.com",
      "info@groceryapp.com",
      "feedback@groceryapp.com"
    ]
  },
  {
    title: "Visit Us",
    description: "Come visit our main store location or corporate headquarters.",
    icon: <LocationIcon />,
    actions: [
      "123 Grocery Lane, Bengaluru",
      "Karnataka, India 560001",
      "Open: Mon-Sat, 9:00 AM - 9:00 PM"
    ]
  }
];

// FAQ items
const faqItems = [
  {
    question: "How do I place an order?",
    answer: "You can place an order by browsing our product categories, adding items to your cart, and proceeding to checkout. You'll need to create an account or log in before completing your purchase."
  },
  {
    question: "What are your delivery hours?",
    answer: "We deliver from 8:00 AM to 10:00 PM, 7 days a week. You can select your preferred delivery time slot during checkout."
  },
  {
    question: "Is there a minimum order value?",
    answer: "Yes, our minimum order value is ₹300. Orders below this amount will incur a small delivery fee."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is confirmed, you'll receive a tracking link via SMS and email. You can also track your order from the 'My Orders' section in your account."
  },
  {
    question: "What is your return policy?",
    answer: "If you're not satisfied with any product, you can return it at the time of delivery. For issues reported later, please contact our customer service within 24 hours."
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, we offer same-day delivery for orders placed before 4:00 PM, subject to slot availability."
  }
];

// Social media links
const socialMedia = [
  {
    name: "WhatsApp",
    icon: <WhatsAppIcon />,
    link: "https://whatsapp.com/",
    color: "#25D366"
  },
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    link: "https://facebook.com/",
    color: "#1877F2"
  },
  {
    name: "Twitter",
    icon: <TwitterIcon />,
    link: "https://twitter.com/",
    color: "#1DA1F2"
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "https://instagram.com/",
    color: "#E4405F"
  }
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      setSuccess(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setError(true);
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 5 }}>
        {/* Header Section */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            We'd love to hear from you! Reach out to us with any questions, feedback, or issues and our team will get back to you as soon as possible.
          </Typography>
        </Box>
        
        {/* Contact Information Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {contactInfo.map((info, index) => (
            <Item item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'primary.light', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    color: 'white',
                    mb: 2 
                  }}
                >
                  {info.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {info.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {info.description}
                </Typography>
                {info.actions.map((action, i) => (
                  <Typography 
                    key={i} 
                    variant="body1" 
                    fontWeight={i === 0 ? 'bold' : 'normal'} 
                    color={i === 0 ? 'primary.main' : 'text.primary'}
                    sx={{ mb: 0.5 }}
                  >
                    {action}
                  </Typography>
                ))}
              </Paper>
            </Item>
          ))}
        </Grid>
        
        {/* Social Media */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Connect With Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            {socialMedia.map((social, index) => (
              <Button
                key={index}
                variant="contained"
                href={social.link}
                target="_blank"
                rel="noopener"
                startIcon={social.icon}
                sx={{ 
                  bgcolor: social.color,
                  '&:hover': {
                    bgcolor: social.color,
                    opacity: 0.8
                  },
                  px: 2,
                  borderRadius: 8,
                  mb: { xs: 1, md: 0 }
                }}
              >
                {social.name}
              </Button>
            ))}
          </Box>
        </Box>
        
        {/* Contact Form Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Item item xs={12} md={6} sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Send Us a Message
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill out the form below and our team will get back to you within 24 hours.
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Item item xs={12} sm={6} sx={{ width: '100%' }}>
                  <TextField
                    label="Your Name"
                    fullWidth
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Item>
                <Item item xs={12} sm={6} sx={{ width: '100%' }}>
                  <TextField
                    label="Your Email"
                    fullWidth
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Item>
                <Item item xs={12} sm={6} sx={{ width: '100%' }}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Item>
                <Item item xs={12} sm={6} sx={{ width: '100%' }}>
                  <TextField
                    select
                    label="Subject"
                    fullWidth
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="support">Customer Support</MenuItem>
                    <MenuItem value="feedback">Feedback</MenuItem>
                    <MenuItem value="order">Order Issue</MenuItem>
                    <MenuItem value="business">Business Proposal</MenuItem>
                  </TextField>
                </Item>
                <Item item xs={12} sx={{ width: '100%' }}>
                  <TextField
                    label="Your Message"
                    fullWidth
                    required
                    multiline
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Item>
                <Item item xs={12} sx={{ width: '100%' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{ 
                      mt: 1, 
                      borderRadius: 8,
                      px: 3 
                    }}
                  >
                    Send Message
                  </Button>
                </Item>
              </Grid>
            </Box>
          </Item>
          
          <Item item xs={12} md={6} sx={{ width: '100%' }}>
            <Box sx={{ height: '100%' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Our Location
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Visit our store or warehouse location. We're open Monday through Saturday from 9 AM to 9 PM.
              </Typography>
              
              {/* Map Placeholder */}
              <Paper 
                elevation={2}
                sx={{ 
                  height: 300, 
                  width: '100%',
                  borderRadius: 3,
                  mb: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.01172121519!2d77.64060757394003!3d12.97169661763563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1714327680980!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grocery Store Location Map"
                />
              </Paper>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography fontWeight="medium">
                  Store Hours
                </Typography>
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 3 }}>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">Monday - Friday</Typography>
                </Item>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">9:00 AM - 9:00 PM</Typography>
                </Item>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">Saturday</Typography>
                </Item>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">9:00 AM - 9:00 PM</Typography>
                </Item>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">Sunday</Typography>
                </Item>
                <Item item xs={6} sx={{ width: '100%' }}>
                  <Typography variant="body2">10:00 AM - 7:00 PM</Typography>
                </Item>
              </Grid>
              
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LocationIcon />}
                sx={{ borderRadius: 8 }}
                onClick={() => window.open('https://maps.google.com/?q=Bengaluru,Karnataka,India', '_blank')}
              >
                Get Directions
              </Button>
            </Box>
          </Item>
        </Grid>
        
        {/* FAQ Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Find quick answers to our most commonly asked questions. If you can't find what you're looking for, please contact us.
          </Typography>
          
          <Box>
            {faqItems.map((faq, index) => (
              <Accordion 
                key={index} 
                elevation={1}
                sx={{ 
                  mb: 1,
                  borderRadius: '8px',
                  '&:before': { display: 'none' },
                  overflow: 'hidden'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  <Typography fontWeight="medium">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Still have questions? We're here to help.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PhoneIcon />}
              sx={{ borderRadius: 8, px: 3 }}
              onClick={() => window.location.href = 'tel:+911234567890'}
            >
              Call Us Now
            </Button>
          </Box>
        </Box>
        
        {/* Success and error notifications */}
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Your message has been sent successfully! We'll get back to you soon.
          </Alert>
        </Snackbar>
        
        <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
          <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
            Please fill in all required fields.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};