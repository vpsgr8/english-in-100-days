/**
 * Generates mvp/config.local.js from environment variables.
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const razorpayKey = process.env.VITE_RAZORPAY_KEY_ID || '';
const paymentLink = process.env.VITE_RAZORPAY_PAYMENT_LINK || '';
const premiumAmount = Number(process.env.VITE_PREMIUM_AMOUNT) || 29900;

const out = `// AUTO-GENERATED — do not edit. Run: node scripts/generate-config.js
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  trialDays: ${Number(process.env.VITE_TRIAL_DAYS) || 3},
  premiumAmount: ${premiumAmount},
  razorpayEnabled: ${Boolean(razorpayKey)},
  razorpayKeyId: '${razorpayKey}',
  razorpayPaymentLink: '${paymentLink}'
};
`;

const outPath = path.join(__dirname, '../mvp/config.local.js');
fs.writeFileSync(outPath, out);
console.log(razorpayKey
  ? '✅ config.local.js generated with Razorpay checkout (₹' + (premiumAmount / 100) + ')'
  : '⚠️  Set VITE_RAZORPAY_KEY_ID for fixed-amount payments');
