import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Box
} from '@mui/material';
import { Category } from '../data/products';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
  isSelected: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, isSelected }) => {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transform: isSelected ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.2s ease',
        border: isSelected ? '2px solid #2e7d32' : 'none',
        '&:hover': {
          transform: 'scale(0.98)',
        }
      }}
      onClick={() => onSelect(category.id)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={category.image}
          alt={category.name}
          sx={{ 
            filter: isSelected ? 'brightness(70%)' : 'brightness(100%)',
            transition: 'filter 0.2s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            p: 1
          }}
        >
          <Typography variant="h6" component="div" align="center">
            {category.name}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 