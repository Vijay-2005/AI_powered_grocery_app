# AI Recipe Cart Feature

The AI Recipe Cart is a smart feature that allows users to enter the name of a dish they want to cook, and automatically get a list of ingredients required for that recipe. These ingredients can then be added to their shopping cart with a single click.

## How It Works

1. **Enter Recipe Name**: Type the name of any dish you want to cook (e.g., "Paneer Curry", "Chicken Alfredo Pasta")
2. **Get Ingredients**: The system uses Google's Gemini AI model to generate a list of ingredients required for the recipe
3. **Review Ingredients**: Review the generated list of ingredients
4. **Add to Cart**: Add individual ingredients or all ingredients to your cart at once

## Technical Implementation

### Frontend Components
- `AICart.tsx`: The main React component that handles the user interface for recipe input and ingredient display
- Integration with the existing cart functionality through the CartContext

### Backend API
- `/api/get-ingredients`: A Flask-based API endpoint that processes recipe requests
- Uses Google's Gemini API to generate ingredients for any given recipe
- Falls back to local logic if the API call fails

### Environment Setup
- Requires a Google Gemini API key (configured in the .env file)
- The API key is used server-side only and not exposed to the client

## Deployment Notes

When deploying to Vercel, make sure to:

1. Add the GEMINI_API_KEY as an environment variable in the Vercel dashboard
2. The Python backend is automatically deployed with the `@vercel/python` builder
3. The vercel.json configuration handles routing between the React app and Python API

## Fallback Mechanism

If the API call fails for any reason, the application will fall back to a client-side mock implementation that provides basic ingredients based on common recipe types. This ensures the feature remains functional even if the external API is unavailable.

## Future Enhancements

Possible future enhancements for this feature:

1. Add recipe details including preparation steps
2. Include estimated cooking time and difficulty level
3. Display nutritional information for recipes
4. Allow users to save their favorite recipes
5. Provide ingredient quantity estimations
6. Add recipe images using an image generation API 