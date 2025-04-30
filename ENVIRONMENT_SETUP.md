# Environment Variables Setup for Vercel Deployment

This guide explains how to set up environment variables for your Fresh Cart application when deploying to Vercel.

## Local Development

For local development, create a `.env` file in the root directory of your project with the following variables:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# API URLs
REACT_APP_API_BASE_URL=https://api.example.com/v1
```

Replace the placeholder values with your actual Firebase credentials.

## Setting Up Environment Variables in Vercel

When deploying to Vercel, you'll need to add these environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard.
2. Navigate to "Settings" > "Environment Variables".
3. Add each of the environment variables from your `.env` file with their actual values.
4. Make sure to select the appropriate "Environment" (Production, Preview, Development) for each variable.
5. Click "Save" to apply the changes.

## Security Best Practices

1. **Never commit your actual `.env` file to Git**. The `.gitignore` file already includes `.env` and other environment-specific files to prevent accidental commits.

2. **Use separate Firebase projects** for development and production environments.

3. **Set up Firebase Security Rules** to restrict access to your database and storage based on user authentication.

4. **Configure Vercel preview environments** with test credentials if needed.

## Verifying Environment Variables

To verify that your environment variables are properly set up in Vercel:

1. After deployment, navigate to your deployed site.
2. Check that authentication and API calls are working correctly.
3. If you encounter issues, verify the environment variables in the Vercel dashboard and make sure they match your local `.env` file.

## Getting Firebase Credentials

If you need to set up a new Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. Click on the web app icon (</>) to add a web app to your project.
4. Register your app with a nickname (e.g., "Fresh Cart Web").
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

6. Use these values in your environment variables. 