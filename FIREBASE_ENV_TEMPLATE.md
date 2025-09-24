# Firebase Environment Variables Setup

## 🔒 SECURITY REQUIREMENT

The Google API key that was previously leaked has been removed from `creer-profil.html`. You must set up these environment variables to restore Firebase functionality.

## Required Environment Variables

Add these to your deployment environment (Vercel, Netlify, etc.):

```env
FIREBASE_API_KEY=your-actual-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

## How to Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (hayschool-1aecd)
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Click on your web app
6. Copy the config values from the `firebaseConfig` object

## Local Development

For local development, create a `.env.local` file in your project root:

```env
FIREBASE_API_KEY=your-actual-api-key
FIREBASE_AUTH_DOMAIN=hayschool-1aecd.firebaseapp.com
FIREBASE_PROJECT_ID=hayschool-1aecd
FIREBASE_STORAGE_BUCKET=hayschool-1aecd.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=743730530001
FIREBASE_APP_ID=1:743730530001:web:685da061b9f979f4e227f0
```

## Security Notes

- ✅ **NEVER commit API keys to Git**
- ✅ **Use environment variables in production**
- ✅ **Keep Firebase config secure**
- ❌ **Don't hardcode API keys in HTML/JavaScript**

The app will work with placeholder values but Firebase features won't function until you set the real environment variables.
