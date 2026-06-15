# Setup Guide — Firebase Auth + Razorpay

## 1. Run the MVP locally

```bash
npx serve mvp
# Open http://localhost:3000
```

> Do not open `index.html` via `file://` — lessons and scripts need HTTP.

---

## 2. Firebase Auth (Google + Email)

### Create project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project → Enable **Authentication**
3. Enable sign-in: **Google** and **Email/Password**
4. Create **Firestore** database (production mode, then deploy rules)

### Get web config
Project Settings → Your apps → Web app → copy config object

### Configure MVP
```bash
cp mvp/config.local.example.js mvp/config.local.js
```

Edit `mvp/config.local.js`:
```javascript
window.APP_CONFIG = {
  ...window.APP_CONFIG,
  firebaseEnabled: true,
  firebase: {
    apiKey: 'AIza...',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abc'
  }
};
```

### Deploy Firestore rules
```bash
cd firebase
firebase deploy --only firestore:rules
```

### Deploy Cloud Functions
```bash
cd firebase/functions
npm install
firebase functions:config:set razorpay.key_id="rzp_test_xxx" razorpay.key_secret="xxx" openai.key="sk-xxx"
# Or use .env with Firebase secrets (recommended for v2)
firebase deploy --only functions
```

Set environment variables in Firebase Console → Functions → Environment variables:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `OPENAI_API_KEY`

---

## 3. Razorpay (₹99/month Premium)

### Create account
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get **Test Mode** keys from Dashboard → API Keys

### Configure MVP (client key only)
In `mvp/config.local.js`:
```javascript
  razorpayEnabled: true,
  razorpayKeyId: 'rzp_test_YOUR_KEY_ID'
```

### Configure server (secret key)
Set `RAZORPAY_KEY_SECRET` in Firebase Functions environment.

### Test payment
Use Razorpay test card: `4111 1111 1111 1111`, any future expiry, any CVV.

### Payment flow
```
User clicks Upgrade → createRazorpayOrder (Cloud Function)
→ Razorpay checkout opens → User pays
→ verifyRazorpayPayment (Cloud Function) → Firestore user.plan = premium
```

---

## 4. Auth modes

| Mode | How | Progress stored |
|------|-----|-----------------|
| **Guest** | "Continue as Guest" | localStorage only |
| **Google** | Firebase Google OAuth | Firestore + localStorage |
| **Email** | Firebase Email/Password | Firestore + localStorage |

---

## 5. Deploy to Netlify

```bash
netlify deploy --dir=mvp --prod
```

Add `config.local.js` values via Netlify environment (or embed in a build step).
For static MVP, keep `config.local.js` in the deployed folder (do not commit real keys).

---

## 6. Curriculum

**100 days complete** (beginner → intermediate → advanced).

```bash
node scripts/generate-lessons.js
```

Curriculum modules: `scripts/curriculum-31-60.js`, `scripts/curriculum-61-100.js`

## 7. Certificates & AI

- **Certificates** — PDF download at Day 30 (free), 60 & 100 (Premium)
- **OpenAI Buddy + Chat** — requires Firebase login + deployed Functions + `OPENAI_API_KEY`
