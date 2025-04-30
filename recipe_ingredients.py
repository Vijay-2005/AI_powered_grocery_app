import os
import json
from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes with all origins

# Configure Gemini API
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyBAtmmFhg7XjMCozgh_6paz-nBN-IUgXAQ')

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY environment variable is not set!")
else:
    print(f"Using Gemini API key: {GEMINI_API_KEY[:4]}...{GEMINI_API_KEY[-4:]}")

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("Successfully configured Gemini API")
except Exception as e:
    print(f"Error configuring Gemini API: {str(e)}")
    model = None

@app.route('/api/get-ingredients', methods=['POST'])
def get_ingredients():
    try:
        print("==== API Request Received ====")
        print(f"Headers: {request.headers}")
        
        data = request.get_json()
        if not data:
            print("No JSON data received!")
            print(f"Request data: {request.data}")
            return jsonify({'error': 'No JSON data received', 'ingredients': []}), 400
            
        user_input = data.get('recipe', '')
        
        print(f"Received request for recipe: {user_input}")
        
        if not user_input:
            return jsonify({'error': 'No recipe provided', 'ingredients': []}), 400
        
        if not model or not GEMINI_API_KEY:
            print("Using fallback mode - Gemini API not configured properly")
            return jsonify({
                'success': False, 
                'error': 'Gemini API not configured',
                'ingredients': []
            }), 500
        
        prompt = f"List all the ingredients needed to make {user_input}. Respond with a simple comma-separated list only. No extra text."
        
        try:
            print(f"Sending prompt to Gemini: {prompt}")
            response = model.generate_content(prompt)
            print(f"Gemini response: {response.text}")
            
            ingredients = [item.strip() for item in response.text.split(',') if item.strip()]
            
            print(f"Successfully processed request for: {user_input}")
            print(f"Found {len(ingredients)} ingredients: {ingredients}")
            
            return jsonify({
                'success': True,
                'ingredients': ingredients,
                'recipe': user_input
            })
        except Exception as gen_error:
            print(f"Gemini API error: {str(gen_error)}")
            return jsonify({
                'error': f"Gemini API error: {str(gen_error)}", 
                'ingredients': [],
                'success': False
            }), 500
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({
            'error': str(e), 
            'ingredients': [],
            'success': False
        }), 500

# Serve test.html for API testing
@app.route('/test.html')
def serve_test_html():
    return send_from_directory('.', 'test.html')

# Add a simple health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'gemini_configured': model is not None and GEMINI_API_KEY is not None
    })

# For local development
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting Flask server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True) 