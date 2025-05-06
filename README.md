# Fresh Cart - Grocery Shopping App

![Fresh Cart Logo](https://i.imgur.com/XGSLRrg.png)

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

<table>
  <tr>
    <td><img src="https://i.imgur.com/example1.png" alt="Home Page" width="100%"></td>
    <td><img src="https://i.imgur.com/example2.png" alt="Product Page" width="100%"></td>
  </tr>
  <tr>
    <td><img src="https://i.imgur.com/example3.png" alt="Shopping Cart" width="100%"></td>
    <td><img src="https://i.imgur.com/example4.png" alt="Checkout" width="100%"></td>
  </tr>
</table>

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
