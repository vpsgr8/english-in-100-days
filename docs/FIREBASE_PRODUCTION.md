# Firebase Production Setup

Production checklist for Auth, Firestore, Cloud Functions, and OpenAI.

---

## 1. Create production Firebase project

1. [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
2. Name: `english-in-100-days-prod`
3. Enable Google Analytics (optional)
4. Select **asia-south1** (Mumbai) region when prompted for Firestore

---

## 2. Enable Authentication

**Authentication → Sign-in method:**

| Provider | Action |
|----------|--------|
| Google | Enable → set support email |
| Email/Password | Enable |

**Authentication → Settings → Authorized domains** — add ALL:

```
YOUR_USERNAME.github.io
englishin100days.in
www.englishin100days.in
```

---

## 3. Create Firestore database

1. **Firestore Database → Create database**
2. Mode: **Production** (not test)
3. Location: `asia-south1`
4. Deploy rules from repo:

```bash
cd firebase
firebase login
firebase use --add          # select prod project
firebase deploy --only firestore:rules,firestore:indexes
```

---

## 4. Register web app

1. Project Settings → **Your apps** → Web `</>`
2. App nickname: `English100 Web`
3. Copy config object → use in `config.local.js` or Netlify env vars

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "english-in-100-days-prod.firebaseapp.com",
  projectId: "english-in-100-days-prod",
  storageBucket: "english-in-100-days-prod.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 5. Configure MVP (`mvp/config.local.js`)

```bash
cp mvp/config.local.example.js mvp/config.local.js
```

```javascript
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  firebaseEnabled: true,
  firebase: {
    apiKey: 'AIza...',           // safe to expose (restricted by domain)
    authDomain: '....firebaseapp.com',
    projectId: 'english-in-100-days-prod',
    storageBucket: '....appspot.com',
    messagingSenderId: '...',
    appId: '1:...:web:...'
  },
  razorpayEnabled: true,
  razorpayKeyId: 'rzp_live_XXXXX'  // LIVE key for production
};
```

> **Never** put `OPENAI_API_KEY` or `RAZORPAY_KEY_SECRET` in frontend config.

---

## 6. Deploy Cloud Functions

```bash
cd firebase/functions
npm install
```

Set secrets in **Firebase Console → Functions → Environment variables** (or CLI):

```bash
firebase functions:secrets:set OPENAI_API_KEY
firebase functions:secrets:set RAZORPAY_KEY_ID
firebase functions:secrets:set RAZORPAY_KEY_SECRET
```

Or use Google Cloud Console → Cloud Functions → Edit → Runtime environment variables:

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | `sk-proj-...` |
| `RAZORPAY_KEY_ID` | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | `...` |

Deploy:

```bash
cd firebase
firebase deploy --only functions
```

Functions deployed (asia-south1):
- `chatTeacher` — AI chat
- `englishBuddy` — Hindi → English
- `createRazorpayOrder` — payments
- `verifyRazorpayPayment` — payment verification

---

## 7. Seed production lessons

```bash
# Download service account: Project Settings → Service accounts → Generate key
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
node firebase/seed/seed-lessons.js
```

---

## 8. Razorpay production

1. [dashboard.razorpay.com](https://dashboard.razorpay.com) → activate **Live Mode**
2. Complete KYC (PAN, bank account)
3. Copy **Live** API keys (`rzp_live_...`)
4. Set webhook URL:

```
https://asia-south1-YOUR_PROJECT.cloudfunctions.net/razorpayWebhook
```

Events: `subscription.activated`, `payment.captured`

---

## 9. API key security

### Firebase API key restrictions (recommended)

Google Cloud Console → APIs → Credentials → Browser key:

- **Application restrictions:** HTTP referrers
- Add: `https://englishin100days.in/*`, `https://*.netlify.app/*`

### Firestore rules

Already in `firebase/firestore.rules` — users can only read/write own data.

### OpenAI budget cap

OpenAI Dashboard → Settings → **Usage limits** → set monthly cap (e.g. $20)

---

## 10. Production verification checklist

- [ ] Google sign-in works on live domain
- [ ] Email sign-up works
- [ ] User profile saves to Firestore
- [ ] Progress syncs after lesson complete
- [ ] English Buddy returns AI translation (not demo)
- [ ] AI Chat returns OpenAI responses
- [ ] Razorpay live payment completes
- [ ] Premium unlocks after payment
- [ ] Functions logs show no errors (Firebase Console → Functions → Logs)

---

## 11. Netlify env vars (automated config)

Instead of committing `config.local.js`, use Netlify environment variables and run:

```bash
node scripts/generate-config.js
```

See root `.env.example` for all variable names.

---

## Monthly cost estimate (production)

| Service | Est. cost |
|---------|-----------|
| Firebase (free tier) | ₹0 up to ~50K reads/day |
| Cloud Functions | ₹0–500/month |
| OpenAI GPT-4o-mini | ₹2–5 per active user |
| Razorpay | 2% per transaction |
| Netlify | ₹0 (free tier) |
| Domain | ~₹60/month |

**At 500 users, 5% premium:** ~₹2,500 MRR − costs ≈ profitable from month 1.
