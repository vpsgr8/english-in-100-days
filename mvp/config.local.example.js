// Copy to config.local.js and fill in your keys (gitignored in production setups)
// Then add <script src="config.local.js"></script> after config.js in index.html

window.APP_CONFIG = {
  ...window.APP_CONFIG,
  firebaseEnabled: true,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abc123'
  },
  razorpayEnabled: true,
  razorpayKeyId: 'rzp_test_YOUR_KEY_ID'
};
