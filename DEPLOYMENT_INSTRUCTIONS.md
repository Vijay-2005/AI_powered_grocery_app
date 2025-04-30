# Deploying Fresh Cart to Vercel

This document provides step-by-step instructions for deploying your Fresh Cart application to Vercel.

## Option 1: Deploy using Vercel CLI (Recommended)

### Prerequisites
- Node.js and npm installed
- Vercel CLI installed (`npm install -g vercel`)
- A Vercel account

### Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel** (if not already logged in):
   ```bash
   vercel login
   ```

3. **Deploy using our helper script**:
   ```bash
   npm run deploy
   ```
   This script will guide you through the process of setting up environment variables and deploying to Vercel.

4. **Or deploy directly using Vercel CLI**:
   ```bash
   # For development/preview deployment
   npm run deploy:vercel
   
   # For production deployment
   npm run deploy:vercel:prod
   ```

## Option 2: Deploy using the Vercel Dashboard

1. **Push your code to GitHub** (see `GITHUB_GUIDE.md` for instructions)

2. **Log in to Vercel Dashboard** at [vercel.com](https://vercel.com)

3. **Import your GitHub repository**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose your Fresh Cart repository

4. **Configure your project**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

5. **Add Environment Variables**:
   - Go to "Settings" > "Environment Variables"
   - Add each variable from your `.env.local` file:
     
     | NAME | VALUE |
     |------|-------|
     | REACT_APP_FIREBASE_API_KEY | your-api-key |
     | REACT_APP_FIREBASE_AUTH_DOMAIN | your-app.firebaseapp.com |
     | REACT_APP_FIREBASE_PROJECT_ID | your-project-id |
     | REACT_APP_FIREBASE_STORAGE_BUCKET | your-app.appspot.com |
     | REACT_APP_FIREBASE_MESSAGING_SENDER_ID | your-messaging-sender-id |
     | REACT_APP_FIREBASE_APP_ID | your-app-id |
     | REACT_APP_API_BASE_URL | your-api-url |

6. **Deploy**:
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be available at a URL like `https://your-project-name.vercel.app`

## Verifying Your Deployment

After deployment, check that:

1. Your app loads correctly
2. User authentication works
3. Products display properly
4. The shopping cart functionality works
5. UPI payment integration works

## Troubleshooting

If you encounter issues:

1. **Check environment variables**: Make sure all required variables are set in Vercel.
2. **Check build logs**: Look for errors in the Vercel deployment logs.
3. **Check Firebase console**: Ensure your Firebase project is properly configured.
4. **Domain restrictions**: If authentication fails, check if you need to add the Vercel domain to your Firebase authentication allowed domains.

## Setting Up a Custom Domain

1. In the Vercel dashboard, go to your project
2. Click on "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to set up DNS records

## Automating Deployments

Vercel automatically deploys when you push changes to your GitHub repository. You can configure this behavior in the Vercel dashboard under "Settings" > "Git". 