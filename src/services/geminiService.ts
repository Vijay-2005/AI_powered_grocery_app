import axios from 'axios';

// Get Gemini API key from environment variables with proper REACT_APP prefix
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Gemini AI API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Log if API key is loaded (without exposing the actual key)
console.log('Gemini API key loaded:', !!GEMINI_API_KEY);

/**
 * Get recipe ingredients using Google's Gemini API
 * @param recipe The recipe name to get ingredients for
 * @returns A Promise that resolves to an array of ingredients
 */
export const getRecipeIngredients = async (recipe: string): Promise<string[]> => {
  try {
    console.log(`Fetching ingredients for recipe: ${recipe}`);
    
    // Create the prompt for Gemini
    const prompt = `List all the ingredients needed to make ${recipe}. Respond with a simple comma-separated list only. No extra text.`;
    
    // Make the API request to Gemini
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Extract the text response from Gemini
    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);
    
    // Parse the comma-separated list into an array of ingredients
    const ingredients = generatedText
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
    
    console.log('Parsed ingredients:', ingredients);
    return ingredients;
    
  } catch (error) {
    console.error('Error fetching ingredients from Gemini:', error);
    throw error;
  }
};