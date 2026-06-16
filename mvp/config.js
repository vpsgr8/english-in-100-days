/**
 * App configuration — Razorpay keys for payments after free trial.
 */
const APP_CONFIG = {
  trialDays: 3,

  // Required for fixed-amount checkout (dashboard.razorpay.com → API Keys)
  razorpayEnabled: true,
  razorpayKeyId: '',

  // Optional: fixed-amount Payment Link from Razorpay dashboard (NOT razorpay.me/@profile)
  razorpayPaymentLink: '',

  premiumAmount: 29900,
  premiumCurrency: 'INR',
  premiumPlanName: 'English in 100 Days',
  premiumDescription: 'Monthly subscription — continue after 3-day free trial',

  // Google AdSense (https://adsense.google.com → Account → Settings)
  adsenseEnabled: true,
  adsenseClientId: 'ca-pub-5121623665404680',
  adsenseBannerSlot: '',

  // Amazon Associates India
  amazonAffiliateTag: 'glamstore072-21',
  amazonDomain: 'amazon.in',

  companyName: 'MarketMind Labs',
  contactEmail: 'mml.products26@gmail.com',
  siteUrl: 'https://vpsgr8.github.io/',

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
