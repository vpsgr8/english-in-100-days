/**
 * App configuration — Razorpay keys for payments after free trial.
 */
const APP_CONFIG = {
  // Free trial length (days)
  trialDays: 3,

  // Razorpay Checkout (optional — needs key from dashboard.razorpay.com)
  razorpayEnabled: true,
  razorpayKeyId: '',

  // Razorpay Payment Link (works without API keys — your razorpay.me link)
  razorpayPaymentLink: 'https://razorpay.me/@vishalpratapsingh601',

  premiumAmount: 9900,
  premiumCurrency: 'INR',
  premiumPlanName: 'English in 100 Days',
  premiumDescription: 'Continue learning after your 3-day free trial',

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

if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
  window.assetPath = assetPath;
}
