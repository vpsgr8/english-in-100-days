// Copy to config.local.js for local overrides (gitignored)
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  trialDays: 3,
  razorpayEnabled: true,
  razorpayKeyId: 'rzp_test_YOUR_KEY_ID',  // from dashboard.razorpay.com → API Keys
  razorpayPaymentLink: ''  // optional fixed link (rzp.io/...), NOT razorpay.me/@profile
};
