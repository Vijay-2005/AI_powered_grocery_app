# Vercel Deployment: Quick Reference

## Required Files
- `vercel.json` - Configuration for Vercel deployment
- `.env.local` - Environment variables (create from `env.template`)

## Required Environment Variables
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

## Quick Deploy Commands
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (Preview)
npm run deploy:vercel

# Deploy (Production)
npm run deploy:vercel:prod

# Interactive Deploy with Environment Variables
npm run deploy
```

## Vercel Dashboard Deployment
1. Push to GitHub
2. Import repository in Vercel
3. Configure Build Settings:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add Environment Variables
5. Deploy

## Common Issues & Solutions

### Issue: "Failed to Compile"
**Solution**: Check build logs for errors, fix code issues

### Issue: "Page Not Found" after refresh
**Solution**: Vercel.json is configured to handle this with the routes setting

### Issue: "Firebase Authentication Failed"
**Solution**: Add your Vercel domain to Firebase Auth allowed domains

### Issue: "Environment Variables Not Working"
**Solution**: Check that all env vars are properly set in Vercel dashboard

## Helpful Links
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [Firebase Console](https://console.firebase.google.com/)

## Reminders
- Never commit `.env.local` with real credentials
- Update Firebase security rules for production
- Test your app thoroughly after deployment 