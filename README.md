# Fresh Cart - Grocery Shopping App

![Screenshot 2025-05-06 202023.png](<https://media-hosting.imagekit.io/99b98f26f3254b9e/Screenshot 2025-05-06 202023.png?Expires=1841151075&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=mMphM6sZV05OKuzweigc0LjHS4AUxskTzogldWzEXGRgo--pCHlPsaflbN8~3U~yOU-0hZHeuzgz8fcHysLQow8-o4lpIqgI2D-gpvtZnjCe2d3FN--qCpvzeQLWEM-tP5uGiQ1C1uGz~xQhazD3vx7ntY2-pfOEsB5TnUdRvy3bTLckNI0MWGtHNGNVbH1oMea83koHaBc1OUCU5PvbGsvU3587dyNN9xd9zsc9F1xsQZ8mxvBugPHhhKYlQCPezUq2zPjFMgWyZIdZqTTP2WijfaKDgZC65ZO4hrnXd0mRSFJf9hcYV2a9lfzxnhKX4jf2reIsxkQ7-RPKu5dAow__>)

A modern React-based grocery shopping application with TypeScript and Firebase integration. Shop for fresh groceries with a beautiful UI, intuitive shopping cart, and secure UPI payment processing.

## 🌟 Features

- **User Authentication** - Secure sign-in and sign-up with Firebase
- **Product Browsing** - Browse through categories with search functionality
- **Shopping Cart** - Add, remove, and update quantities in a responsive cart
- **UPI Payment Integration** - Secure checkout with UPI payment verification
- **Responsive Design** - Beautiful UI that works on all devices
- **Error Handling** - Graceful error states and loading indicators
- **AI-Powered Recipe Suggestions** - Get ingredient lists for recipes using Gemini AI

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **UI Components**: Material UI v7
- **Authentication & Database**: Firebase and Railway Mysql 
- **Routing**: React Router v7
- **State Management**: Context API
- **Styling**: Emotion (CSS-in-JS)
- **Deployment**: Vercel
- **AI Integration**: Google Gemini API

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Firebase account
- Google Gemini API key (for recipe ingredient suggestions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fresh-cart.git
   cd fresh-cart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your actual API keys and credentials:
     - Firebase configuration
     - Gemini API key
     - UPI payment credentials

4. Start the frontend development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. For the backend API (recipe suggestions):
   ```bash
   cd api
   pip install -r requirements.txt
   python recipe_ingredients.py
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000)

## 📷 Screenshots
![Screenshot 2025-05-06 202023.png](<https://media-hosting.imagekit.io/99b98f26f3254b9e/Screenshot%202025-05-06%20202023.png?Expires=1841151075&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=mMphM6sZV05OKuzweigc0LjHS4AUxskTzogldWzEXGRgo--pCHlPsaflbN8~3U~yOU-0hZHeuzgz8fcHysLQow8-o4lpIqgI2D-gpvtZnjCe2d3FN--qCpvzeQLWEM-tP5uGiQ1C1uGz~xQhazD3vx7ntY2-pfOEsB5TnUdRvy3bTLckNI0MWGtHNGNVbH1oMea83koHaBc1OUCU5PvbGsvU3587dyNN9xd9zsc9F1xsQZ8mxvBugPHhhKYlQCPezUq2zPjFMgWyZIdZqTTP2WijfaKDgZC65ZO4hrnXd0mRSFJf9hcYV2a9lfzxnhKX4jf2reIsxkQ7-RPKu5dAow__>)

  
 ![Screenshot 2025-05-06 203854.png](<https://media-hosting.imagekit.io/7ee360152cd74a70/Screenshot%202025-05-06%20203854.png?Expires=1841152166&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JYSxa8N~Luhxu1tS3dkczp9t4bv~Nf~RZ5ET-v5tLE-0lbn-8368PpwxROH~aRG4ry4q9DfeLChRk9~VPz31OPTcmNg-xnq2urU~DbHAkrVZCsw1tN-YERZpSKbwKSD28TiMMDvGPJzqWhQ04pGPKSeQPVCEqIQ~rBsIKjicZlcDsDc4nTayohADc6lZfHz-i~PqGx7~MjtIIGftN9FQEzdtyY7XD5RUiGN4mEZZ0WGjUU2FBUuxsQe2-4t8N943a~t-jqnbn9zvmnV7xF7F5iK9iQmqGAy~xLgienKBoQg06AhOsP8xwRGYthueOA5lb0icy0NWw-Gvv8o0u8vndQ__>)

 ![Screenshot 2025-05-06 204038.png](<https://media-hosting.imagekit.io/cea3356e530242da/Screenshot%202025-05-06%20204038.png?Expires=1841152250&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WJmRrb89JXEzZeGVJpylHhJk9txAU1zWRQ5t9WhtoArn2UORZbNIHLc27kDtaBk2TwTY1aE5TM02fG9iSjdt7qNeFdbPVzlUl8-mKtKf3Va1fChQmvkEM87uHehGe2MulCQoGWOGXDua9doerOarZe3~umuEVV4AnUIL~SwNMZCfIoK6WWycqTXjawwi6T3tXIt6VDaAH0V0SqOguf0pVRccZFJlTkMyyp538dvjb7E1HXsAJXANdbpiGGxHA~eM03pTEEv2yoQqXMe05e3AjfleCxUatOSrsRRShrhVS5FIdy~rfbDerq2lx4Crf4eXBLWMs8N5O14qAVBxFxflCg__>)

 ![Screenshot 2025-05-06 203832.png](<https://media-hosting.imagekit.io/02955b8c24bc4357/Screenshot%202025-05-06%20203832.png?Expires=1841152327&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=LOTOv~9RVJouj973gOjAQDW9E0wzqgSxNAo4NGNMwxiYAArIzLZ~5uj1DOYTHzkgVCCbw883~vSQWUqWwmP4SAiyNRgFr0aMWmsdUUcoY16peohf41bXHoGU3WNSwfDtxhdyUFzRX1D4Ty3GlvSYNNy3revKvCuY0gSRXAMrfD98pmGTSi39~7S~wIkbbaWqGMLeYzV-slXN6yOS08qrtwlZjM~X8XWHhyGNC1YLp9PRChL5MwJYuUbf-9TeA580vgdwk~KOHnN2DqgXKoi0Fvw0c9E9iBaOWx4HUWERCq6W66mh0FdcaT2rBO~hDAAKyBspT5UkQ39LUu4rQqm3mA__>)
  

## 🌐 Deployment

This project is configured for easy deployment to Vercel. See [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) for detailed deployment instructions.

### Quick Deployment Steps

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Configure environment variables
4. Deploy!

## 📁 Project Structure

```
src/
  ├── components/      # React components
  │   ├── Cart.tsx     # Shopping cart component
  │   ├── Home.tsx     # Home page with product listings
  │   ├── SignIn.tsx   # Authentication components
  │   └── ...
  ├── contexts/        # Context providers
  │   ├── AuthContext.tsx    # User authentication state
  │   └── CartContext.tsx    # Shopping cart state
  ├── firebase/        # Firebase configuration
  │   └── config.ts    # Firebase setup and services
  ├── data/            # Product and category data
  ├── types/           # TypeScript type definitions
  └── App.tsx          # Main application component
```

## 🔐 Environment Variables

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed information about required environment variables.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Material UI](https://mui.com/) for the beautiful components
- [Firebase](https://firebase.google.com/) for authentication and database
- [React Router](https://reactrouter.com/) for navigation
- [Unsplash](https://unsplash.com/) for stock images

---

Developed with ❤️ by [Your Name]
