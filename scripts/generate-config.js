/**
 * Generates mvp/config.local.js from environment variables.
 * Used by Netlify build and local production testing.
 *
 * Local:  cp .env.example .env  → fill values → node scripts/generate-config.js
 * Netlify: Set env vars in dashboard → build runs this automatically
 */
const fs = require('fs');
const path = require('path');

// Load .env if present (simple parser, no dotenv dependency)
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const firebaseKey = process.env.VITE_FIREBASE_API_KEY || '';
const razorpayKey = process.env.VITE_RAZORPAY_KEY_ID || '';

const config = {
  firebaseEnabled: Boolean(firebaseKey && process.env.VITE_FIREBASE_PROJECT_ID),
  firebase: {
    apiKey: firebaseKey,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.VITE_FIREBASE_APP_ID || ''
  },
  razorpayEnabled: Boolean(razorpayKey),
  razorpayKeyId: razorpayKey
};

const out = `// AUTO-GENERATED — do not edit. Run: node scripts/generate-config.js
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  firebaseEnabled: ${config.firebaseEnabled},
  firebase: ${JSON.stringify(config.firebase, null, 2)},
  razorpayEnabled: ${config.razorpayEnabled},
  razorpayKeyId: '${config.razorpayKeyId}'
};
`;

const outPath = path.join(__dirname, '../mvp/config.local.js');
fs.writeFileSync(outPath, out);

if (config.firebaseEnabled) {
  console.log('✅ config.local.js generated with Firebase +', config.razorpayEnabled ? 'Razorpay' : 'no Razorpay');
} else {
  console.log('⚠️  config.local.js generated (demo mode — set VITE_FIREBASE_* env vars for production)');
}
