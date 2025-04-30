# Guide to Pushing Your Project to GitHub

This guide explains how to safely push your Fresh Cart project to GitHub without exposing sensitive information like API keys.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your Fresh Cart project ready to be pushed

## Steps to Push Your Project to GitHub

### 1. Create a GitHub Repository

1. Log in to [GitHub](https://github.com/)
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "fresh-cart")
4. Choose public or private repository (private is recommended for projects with sensitive data)
5. Click "Create repository"

### 2. Initialize Git in Your Project (if not already done)

```bash
cd your-project-directory
git init
```

### 3. Create a .env.local File for Local Development

Create a `.env.local` file in your project root with your actual Firebase credentials:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-actual-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-actual-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-actual-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-actual-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-actual-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-actual-app-id

# API URLs
REACT_APP_API_BASE_URL=your-actual-api-url
```

### 4. Ensure .env Files Are Ignored by Git

Verify that your `.gitignore` file includes entries for environment files:

```
# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

This prevents your actual API keys from being pushed to GitHub.

### 5. Add, Commit, and Push Your Code

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/fresh-cart.git
git push -u origin main
```

Replace `your-username` with your actual GitHub username.

## Deploying to Vercel from GitHub

1. Log in to [Vercel](https://vercel.com/)
2. Click "Import Project"
3. Choose "Import Git Repository" and select your GitHub repository
4. Configure your project settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Under "Environment Variables", add all the variables from your `.env.local` file
6. Click "Deploy"

## Important Security Notes

1. **Never commit real API keys to GitHub**, even in a private repository.

2. **Always use environment variables** for sensitive information.

3. **Regularly rotate your API keys** if you suspect they've been compromised.

4. **Consider using Vercel's environment variables integration** with GitHub to automate the deployment process.

## Checking if Your API Keys Are Exposed

After pushing to GitHub, you can verify that your API keys are not exposed:

```bash
git grep "REACT_APP_FIREBASE_API_KEY"
```

This command should not return any results containing your actual API key.

## Additional Security Measures

1. **Consider using Firebase App Check** to add an additional layer of security to your Firebase backend.

2. **Implement security rules in Firebase** to control access to your data.

3. **Use Firebase Authentication** to secure your app and API endpoints. 