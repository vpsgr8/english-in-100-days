/**
 * Generates mvp/config.local.js and mvp/ads.txt from environment variables.
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
const adsenseClient = process.env.VITE_ADSENSE_CLIENT_ID || '';
const adsenseSlot = process.env.VITE_ADSENSE_BANNER_SLOT || '';

const out = `// AUTO-GENERATED — do not edit. Run: node scripts/generate-config.js
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  trialDays: ${Number(process.env.VITE_TRIAL_DAYS) || 3},
  premiumAmount: ${premiumAmount},
  razorpayEnabled: ${Boolean(razorpayKey)},
  razorpayKeyId: '${razorpayKey}',
  razorpayPaymentLink: '${paymentLink}',
  adsenseEnabled: ${Boolean(adsenseClient)},
  adsenseClientId: '${adsenseClient}',
  adsenseBannerSlot: '${adsenseSlot}'
};
`;

const outPath = path.join(__dirname, '../mvp/config.local.js');
fs.writeFileSync(outPath, out);

const adsTxtPath = path.join(__dirname, '../mvp/ads.txt');
if (/^ca-pub-\d+$/i.test(adsenseClient)) {
  const pub = adsenseClient.replace(/^ca-pub-/i, 'pub-');
  fs.writeFileSync(adsTxtPath, `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
} else {
  fs.writeFileSync(adsTxtPath, '# Set VITE_ADSENSE_CLIENT_ID and redeploy to generate ads.txt\n');
}

const notes = [];
if (razorpayKey) notes.push('Razorpay');
if (adsenseClient) notes.push('AdSense');
console.log(notes.length
  ? `✅ config.local.js generated with ${notes.join(' + ')}`
  : '⚠️  Set VITE_RAZORPAY_KEY_ID and/or VITE_ADSENSE_CLIENT_ID');
