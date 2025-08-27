# Firebase Authentication Setup Guide

## Prerequisites
- A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
- Firebase project configuration

## Setup Steps

### 1. Get Your Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web app icon (</>)
7. Copy the configuration object

### 2. Update Firebase Configuration
Replace the placeholder values in `src/firebase.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 3. Enable Authentication in Firebase Console
1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### 4. Create Test Users (Optional)
1. In Authentication section, go to "Users" tab
2. Click "Add user"
3. Enter email and password for testing

## Features Implemented

### Login
- Email/password authentication
- Error handling
- Loading states
- Form validation

### Relogin
- "Relogin" button to switch between users
- Automatic session management
- Persistent authentication state

### Logout
- Secure logout functionality
- Session cleanup

### Authentication State Management
- Context-based state management
- Automatic authentication state detection
- Loading states during authentication checks

## Usage

### Basic Login
```javascript
import { loginUser } from './firebase';

const result = await loginUser(email, password);
if (result.success) {
  console.log('Logged in:', result.user);
} else {
  console.error('Login failed:', result.error);
}
```

### Check Current User
```javascript
import { getCurrentUser } from './firebase';

const user = getCurrentUser();
if (user) {
  console.log('Current user:', user.email);
}
```

### Logout
```javascript
import { logoutUser } from './firebase';

const result = await logoutUser();
if (result.success) {
  console.log('Logged out successfully');
}
```

### Use Authentication Context
```javascript
import { useAuth } from './AuthContext';

function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## Security Notes
- Never commit your Firebase API keys to version control
- Use environment variables for production
- Implement proper user role management
- Add additional authentication methods as needed (Google, Facebook, etc.)

## Troubleshooting

### Common Issues
1. **"Firebase: Error (auth/user-not-found)"** - User doesn't exist
2. **"Firebase: Error (auth/wrong-password)"** - Incorrect password
3. **"Firebase: Error (auth/invalid-email)"** - Invalid email format
4. **"Firebase: Error (auth/too-many-requests)"** - Too many failed attempts

### Solutions
- Verify user exists in Firebase Console
- Check email/password spelling
- Wait before retrying after multiple failed attempts
- Ensure Firebase configuration is correct
