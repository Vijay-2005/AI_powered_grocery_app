export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  discount?: number;
  rating?: number;
  reviews?: string | number;
}

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    image: 'https://plus.unsplash.com/premium_photo-1726072360068-cdc3561ea615?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'pantry',
    name: 'Pantry',
    image: 'https://plus.unsplash.com/premium_photo-1664372599267-fb1777e96846?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFudHJ5fGVufDB8fDB8fHww'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'organic',
    name: 'Organic',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

export const products = [
  // Vegetables
  {
    id: 'v1',
    name: 'Fresh Carrots',
    price: 40,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables',
    description: 'Fresh organic carrots, perfect for salads and cooking.',
    unit: 'kg'
  },
  {
    id: 'v2',
    name: 'Tomatoes',
    price: 60,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables',
    description: 'Ripe and juicy tomatoes, locally sourced.',
    unit: 'kg'
  },
  {
    id: 'v3',
    name: 'Spinach',
    price: 45,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables',
    description: 'Fresh baby spinach leaves.',
    unit: 'bunch'
  },
  {
    id: 'v4',
    name: 'Bell Peppers',
    price: 35,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables',
    description: 'Colorful bell peppers, perfect for stir-fries.',
    unit: 'piece'
  },
  // Fruits
  {
    id: 'f1',
    name: 'Bananas',
    price: 50,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fruits',
    description: 'Fresh yellow bananas.',
    unit: 'dozen'
  },
  {
    id: 'f2',
    name: 'Apples',
    price: 75,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fruits',
    description: 'Crisp and sweet apples.',
    unit: 'kg'
  },
  {
    id: 'f3',
    name: 'Oranges',
    price: 80,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fruits',
    description: 'Juicy oranges, rich in vitamin C.',
    unit: 'kg'
  },
  // Dairy & Eggs
  {
    id: 'd1',
    name: 'Milk',
    price: 55,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'dairy',
    description: 'Fresh whole milk.',
    unit: 'liter'
  },
  {
    id: 'd2',
    name: 'Eggs',
    price: 70,
    image: 'https://images.unsplash.com/photo-1559738928-5d5dc5c2458d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVnZ3N8ZW58MHx8MHx8fDA%3D',
    category: 'dairy',
    description: 'Farm fresh eggs.',
    unit: 'dozen'
  },
  {
    id: 'd3',
    name: 'Cheese',
    price: 120,
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'dairy',
    description: 'Aged cheddar cheese.',
    unit: 'pack'
  },
  // Meat & Seafood
  {
    id: 'm1',
    name: 'Chicken Breast',
    price: 160,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'meat',
    description: 'Boneless, skinless chicken breast.',
    unit: 'kg'
  },
  {
    id: 'm2',
    name: 'Salmon',
    price: 250,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'meat',
    description: 'Fresh Atlantic salmon fillet.',
    unit: 'kg'
  },
  // Bakery
  {
    id: 'b1',
    name: 'Bread',
    price: 40,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJlYWR8ZW58MHx8MHx8fDA%3D',
    category: 'bakery',
    description: 'Freshly baked whole wheat bread.',
    unit: 'loaf'
  },
  {
    id: 'b2',
    name: 'Croissants',
    price: 85,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'bakery',
    description: 'Buttery, flaky croissants.',
    unit: 'pack'
  },
  // Pantry
  {
    id: 'p1',
    name: 'Rice',
    price: 90,
    image: 'https://plus.unsplash.com/premium_photo-1723726831918-9a8542e705cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJpY2V8ZW58MHx8MHx8fDA%3D',
    category: 'pantry',
    description: 'Premium jasmine rice.',
    unit: 'kg'
  },
  {
    id: 'p2',
    name: 'Pasta',
    price: 65,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'pantry',
    description: 'Italian spaghetti pasta.',
    unit: 'pack'
  },
  {
    id: 'p3',
    name: 'Olive Oil',
    price: 195,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'pantry',
    description: 'Extra virgin olive oil.',
    unit: 'bottle'
  },
  {
    id: 'b3',
    name: 'Almond Croissant',
    price: 95,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'bakery',
    description: 'A rich croissant filled with almond cream',
    unit: 'pack'
  },
  {
    id: 'b4',
    name: 'Chocolate Croissant',
    price: 90,
    image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'bakery',
    description: 'Flaky croissant filled with smooth dark chocolate.',
    unit: 'pack'
  },
  {
    id: 'b5',
    name: 'Butter Croissant',
    price: 80,
    image: 'https://images.unsplash.com/photo-1509665653475-295f17f738e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'bakery',
    description: 'Classic French butter croissant.',
    unit: 'pack'
  }
];