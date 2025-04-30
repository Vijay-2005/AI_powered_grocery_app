import os
import json
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyBAtmmFhg7XjMCozgh_6paz-nBN-IUgXAQ')

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY environment variable is not set!")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

@app.route('/api/get-ingredients', methods=['POST'])
def get_ingredients():
    try:
        data = request.get_json()
        user_input = data.get('recipe', '')
        
        if not user_input:
            return jsonify({'error': 'No recipe provided', 'ingredients': []}), 400
        
        prompt = f"List all the ingredients needed to make {user_input}. Respond with a simple comma-separated list only. No extra text."
        response = model.generate_content(prompt)
        
        # Parse the response into a list of ingredients
        ingredients = [item.strip() for item in response.text.split(',') if item.strip()]
        
        print(f"Successfully processed request for: {user_input}")
        print(f"Found {len(ingredients)} ingredients: {ingredients}")
        
        return jsonify({
            'success': True,
            'ingredients': ingredients,
            'recipe': user_input
        })
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({
            'error': str(e), 
            'ingredients': [],
            'success': False
        }), 500

# For local development
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 