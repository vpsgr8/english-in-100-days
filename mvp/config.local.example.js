// Copy to config.local.js for local overrides (gitignored)
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  trialDays: 3,
  razorpayEnabled: true,
  razorpayKeyId: '',  // optional: rzp_test_... from dashboard.razorpay.com
  razorpayPaymentLink: 'https://razorpay.me/@vishalpratapsingh601'
};
