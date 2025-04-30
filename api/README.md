# AI Recipe Cart API

This API provides recipe ingredient suggestions using Google's Gemini AI. It powers the AI Cart feature in the Fresh Cart application.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up your environment variables:
   - Create a `.env` file in the `api` directory
   - Add your Gemini API key: `GEMINI_API_KEY=your_api_key_here`

## API Endpoints

### GET /api/health
Health check endpoint to verify the API is running and Gemini is properly configured.

### POST /api/get-ingredients
Get ingredients for a recipe.

**Request Body:**
```json
{
  "recipe": "chicken curry"
}
```

**Response:**
```json
{
  "success": true,
  "ingredients": ["chicken", "onions", "garlic", "ginger", "curry powder", ...],
  "recipe": "chicken curry"
}
```

## Local Development

Run the API locally:
```
python recipe_ingredients.py
```

The API will be available at `http://localhost:5000`.

## Deployment

This API is configured for deployment on Vercel as serverless functions. The configuration is in the `vercel.json` file. 