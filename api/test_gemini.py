import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyBAtmmFhg7XjMCozgh_6paz-nBN-IUgXAQ')

print(f"Using Gemini API key: {GEMINI_API_KEY[:4]}...{GEMINI_API_KEY[-4:]}")

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("Successfully configured Gemini API")
    
    # Test a recipe
    test_recipe = "chicken curry"
    prompt = f"List all the ingredients needed to make {test_recipe}. Respond with a simple comma-separated list only. No extra text."
    
    print(f"Sending prompt: {prompt}")
    response = model.generate_content(prompt)
    
    print(f"Response: {response.text}")
    ingredients = [item.strip() for item in response.text.split(',') if item.strip()]
    print(f"Parsed ingredients: {ingredients}")
    
except Exception as e:
    print(f"Error: {str(e)}") 