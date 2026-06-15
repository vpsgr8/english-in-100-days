/**
 * App configuration — fill in your Firebase & Razorpay keys before production.
 * Copy this file to config.local.js and override values (gitignore config.local.js).
 */
const APP_CONFIG = {
  // Set to true after adding Firebase credentials below
  firebaseEnabled: false,

  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },

  // Set to true after adding Razorpay test/live key
  razorpayEnabled: false,

  // Client-side key only (rzp_test_... or rzp_live_...)
  razorpayKeyId: '',

  // Premium plan pricing (paise — 9900 = ₹99)
  premiumAmount: 9900,
  premiumCurrency: 'INR',
  premiumPlanName: 'English in 100 Days Premium',
  premiumDescription: 'Unlimited AI speaking, all scenarios, certificates',

  // Cloud Function region (for createOrder)
  functionsRegion: 'asia-south1',

  // Auto-detected: '' for root, '/repo-name/' for GitHub Pages project sites
  basePath: (function () {
    if (typeof location === 'undefined') return '/';
    const p = location.pathname;
    if (p.includes('.')) return p.substring(0, p.lastIndexOf('/') + 1);
    return p.endsWith('/') ? p : p + '/';
  })()
};

function assetPath(path) {
  const base = (window.APP_CONFIG || {}).basePath || '/';
  return base + String(path).replace(/^\//, '');
}

// Optional local overrides (create mvp/config.local.js)
if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
  window.assetPath = assetPath;
}
