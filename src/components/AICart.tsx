import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
  Chip,
  Card,
  CardMedia,
  IconButton,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  Delete as ClearIcon,
  Restaurant as RestaurantIcon,
  SmartToy as AIIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

export const AICart: React.FC = () => {
  const [recipeInput, setRecipeInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recipeDescription, setRecipeDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { dispatch } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeInput(e.target.value);
  };

  const getIngredients = async () => {
    if (!recipeInput.trim()) return;
    
    setLoading(true);
    setShowPreview(true);
    setRecipeDescription(`Getting ingredients for ${recipeInput}...`);
    
    try {
      // Call the API endpoint
      const response = await fetch('/api/get-ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe: recipeInput })
      });
      
      const data = await response.json();
      
      if (data.success && data.ingredients && data.ingredients.length > 0) {
        setIngredients(data.ingredients);
        setRecipeDescription(`${recipeInput} requires the following ingredients:`);
      } else {
        // If no ingredients were found, use fallback mock data
        const mockIngredients = generateMockIngredients(recipeInput);
        setIngredients(mockIngredients);
        setRecipeDescription(`${recipeInput} requires the following ingredients (generated locally):`);
      }
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
      // Use fallback mock data
      const mockIngredients = generateMockIngredients(recipeInput);
      setIngredients(mockIngredients);
      setRecipeDescription(`${recipeInput} requires the following ingredients (generated locally):`);
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes - replace with actual API call in production
  const generateMockIngredients = (recipe: string): string[] => {
    const recipeMap: { [key: string]: string[] } = {
      'pizza': ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese', 'Olive oil', 'Basil', 'Garlic', 'Salt'],
      'pasta': ['Pasta', 'Tomatoes', 'Garlic', 'Olive oil', 'Basil', 'Parmesan cheese', 'Salt', 'Pepper'],
      'burger': ['Ground beef', 'Burger buns', 'Onion', 'Lettuce', 'Tomato', 'Cheese slices', 'Ketchup', 'Mustard'],
      'curry': ['Chicken', 'Onion', 'Garlic', 'Ginger', 'Tomatoes', 'Curry powder', 'Coconut milk', 'Rice'],
      'salad': ['Lettuce', 'Cucumber', 'Tomatoes', 'Bell peppers', 'Olives', 'Feta cheese', 'Olive oil', 'Vinegar'],
    };
    
    const lowerRecipe = recipe.toLowerCase();
    
    // Check if any of our mock recipes are mentioned
    for (const [key, ingredients] of Object.entries(recipeMap)) {
      if (lowerRecipe.includes(key)) {
        return ingredients;
      }
    }
    
    // If no match, return a generic list
    return [
      'All-purpose flour',
      'Salt',
      'Sugar',
      'Butter',
      'Eggs',
      'Milk',
      'Olive oil',
      'Garlic',
      'Onions',
      'Tomatoes'
    ];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      getIngredients();
    }
  };

  const addToCart = (ingredient: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: `ai-${ingredient.replace(/\s+/g, '-').toLowerCase()}`,
        name: ingredient,
        price: 19.99, // Default price
        category: 'ai-recipe',
        image: getIngredientImageUrl(ingredient),
        unit: '250g',
        description: `Fresh ${ingredient} for your recipe.`
      }
    });
  };

  const addAllToCart = () => {
    ingredients.forEach(ingredient => {
      addToCart(ingredient);
    });
    
    alert('All ingredients added to your cart!');
  };

  const removeIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const clearAll = () => {
    setIngredients([]);
    setShowPreview(false);
  };

  const getIngredientImageUrl = (ingredient: string) => {
    const sanitized = encodeURIComponent(ingredient.toLowerCase().trim());
    return `https://source.unsplash.com/100x100/?${sanitized},food`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 5,
          position: 'relative',
          p: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: 'divider',
            zIndex: 0
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            position: 'relative', 
            px: 3, 
            py: 1,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            zIndex: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <AIIcon 
            color="secondary" 
            sx={{ 
              fontSize: 36,
              mr: 1,
              animation: 'pulse 1.5s infinite'
            }} 
          />
          <Typography 
            variant="h4" 
            color="secondary.main" 
            fontWeight="bold"
            sx={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            AI Recipe Cart
            <Chip
              label="NEW"
              size="small"
              color="error"
              sx={{ ml: 1, height: 20, fontWeight: 'bold', fontSize: '0.6rem' }}
            />
          </Typography>
        </Box>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.95)',
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
          mb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: -30,
            bottom: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: 'rgba(46, 125, 50, 0.08)',
            zIndex: 0
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <LightbulbIcon 
                color="secondary" 
                sx={{ mr: 1, animation: 'pulse 2s infinite' }} 
              />
              <Typography variant="h6" color="text.secondary">
                Let AI Find Your Ingredients
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Enter any dish and get all ingredients automatically added to your cart
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="What do you want to cook? e.g. paneer curry"
              value={recipeInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RestaurantIcon color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
            
            <Button
              variant="contained"
              color="secondary"
              onClick={getIngredients}
              disabled={loading || !recipeInput.trim()}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              sx={{ 
                minWidth: { xs: '100%', md: '180px' },
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(255, 152, 0, 0.25)'
              }}
            >
              Find Ingredients
            </Button>
          </Box>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress color="primary" />
            </Box>
          )}
          
          {showPreview && (
            <Paper 
              sx={{ 
                p: 3, 
                mb: 4, 
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RestaurantIcon color="primary" />
                Recipe Preview
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {recipeDescription}
              </Typography>
            </Paper>
          )}
          
          {ingredients.length > 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Ingredients <Chip label={ingredients.length} color="primary" size="small" />
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="error" 
                    startIcon={<ClearIcon />}
                    onClick={clearAll}
                  >
                    Clear All
                  </Button>
                  
                  <Button 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    startIcon={<ShoppingCartIcon />}
                    onClick={addAllToCart}
                  >
                    Add All to Cart
                  </Button>
                </Box>
              </Box>
              
              <Paper elevation={1} sx={{ bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden' }}>
                {ingredients.map((ingredient, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider />}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        p: 2,
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.02)'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 45, 
                          height: 45, 
                          borderRadius: 2, 
                          overflow: 'hidden',
                          flexShrink: 0,
                          bgcolor: 'primary.light',
                          mr: 2
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={getIngredientImageUrl(ingredient)}
                          alt={ingredient}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      
                      <Typography sx={{ flexGrow: 1 }}>
                        {ingredient}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => addToCart(ingredient)}
                          sx={{ bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => removeIngredient(index)}
                          sx={{ bgcolor: 'error.light', color: 'white', '&:hover': { bgcolor: 'error.main' } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </React.Fragment>
                ))}
              </Paper>
            </>
          )}
          
          {ingredients.length === 0 && !loading && showPreview && (
            <Paper 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 3,
                border: '1px dashed rgba(0,0,0,0.1)',
                bgcolor: 'background.paper' 
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography color="text.secondary" fontStyle="italic">
                No ingredients found for this recipe. Try a different dish.
              </Typography>
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
}; 