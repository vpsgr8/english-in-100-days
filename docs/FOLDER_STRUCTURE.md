# Folder Structure — English in 100 Days

```
english-in-100-days/
│
├── README.md                          # Project overview, setup instructions
│
├── mvp/
│   └── index.html                     # ★ Single-file MVP (deploy to Netlify)
│
├── docs/
│   ├── PRD.md                         # Product Requirements Document
│   ├── DATABASE_SCHEMA.md             # Firestore schema & sample data
│   └── FOLDER_STRUCTURE.md          # This file
│
├── src/                               # Production app (post-MVP split)
│   ├── index.html                     # Entry point
│   ├── css/
│   │   └── custom.css                 # Tailwind overrides (if needed)
│   ├── js/
│   │   ├── app.js                     # App bootstrap, routing
│   │   ├── auth.js                    # Firebase Auth wrapper
│   │   ├── lessons.js                 # Lesson loader & quiz logic
│   │   ├── speaking.js                # Web Speech API + scoring
│   │   ├── chat.js                    # AI teacher chat
│   │   ├── buddy.js                   # English Buddy (Hindi bridge)
│   │   ├── scenarios.js               # Real-life situation roleplay
│   │   ├── games.js                   # Word games (Phase 2)
│   │   ├── payments.js                # Razorpay integration
│   │   └── utils.js                   # Helpers, localStorage, TTS
│   ├── data/
│   │   ├── lessons.json                 # Days 1–100 curriculum
│   │   ├── scenarios.json               # Restaurant, interview, travel
│   │   ├── stories.json                 # Story learning (Phase 2)
│   │   └── translations.json            # UI strings (en, hi)
│   └── assets/
│       ├── logo.svg
│       ├── icons/
│       └── images/
│
├── firebase/
│   ├── firebase.json                  # Firebase hosting & functions config
│   ├── firestore.rules                # Security rules
│   ├── firestore.indexes.json         # Composite indexes
│   ├── .firebaserc                    # Project aliases
│   ├── functions/
│   │   ├── package.json
│   │   ├── index.js                   # Cloud Functions entry
│   │   └── src/
│   │       ├── openai-proxy.js        # Secure OpenAI API calls
│   │       ├── razorpay-webhook.js    # Payment webhook handler
│   │       ├── buddy-translate.js     # Hindi → English pipeline
│   │       └── daily-reset.js         # Reset daily usage limits (cron)
│   └── seed/
│       ├── seed-lessons.js            # Upload lessons to Firestore
│       └── seed-word-of-day.js
│
├── netlify/
│   └── netlify.toml                   # Build config, redirects, headers
│
└── .env.example                       # Environment variable template
```

---

## File Responsibilities

### MVP (`mvp/index.html`)
Single self-contained file with:
- Tailwind CSS via CDN
- All JS inline (no build step)
- localStorage for demo mode
- Web Speech API for speaking practice
- Mock AI responses (replace with Firebase Functions in production)

**Deploy:** Drag `mvp/` folder to Netlify or `netlify deploy --dir=mvp`

---

### Production Split (`src/`)

| Module | Responsibility |
|--------|----------------|
| `app.js` | SPA routing, view switching, init |
| `auth.js` | Login, signup, Google OAuth, session |
| `lessons.js` | Fetch lesson, render words/sentence/conversation, quiz |
| `speaking.js` | STT, scoring algorithm, score display |
| `chat.js` | AI teacher chat UI + API calls |
| `buddy.js` | Hindi input → English output flow |
| `scenarios.js` | Roleplay scenarios with AI prompts |
| `payments.js` | Razorpay checkout, premium unlock |
| `utils.js` | TTS, date helpers, streak logic |

---

### Firebase (`firebase/`)

| File | Purpose |
|------|---------|
| `firestore.rules` | User can only read/write own data |
| `functions/openai-proxy.js` | Hides API key, rate limits requests |
| `functions/razorpay-webhook.js` | Activates premium on payment |
| `functions/daily-reset.js` | Scheduled: reset `dailyChatCount` etc. |

---

## Environment Variables

```bash
# .env.example
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Server-side only (Firebase Functions)
OPENAI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```

---

## Deployment Targets

| Stage | URL | Method |
|-------|-----|--------|
| MVP Demo | `english100days.netlify.app` | Netlify drag-and-drop |
| Staging | `staging.english100days.in` | Netlify branch deploy |
| Production | `english100days.in` | Netlify + custom domain |

---

## Development Workflow

```
Week 1–2:  Work in mvp/index.html (fast iteration)
Week 3:    Extract modules to src/js/, connect Firebase
Week 4:    Deploy functions, Razorpay, go live
```

---

## Tech Dependencies

### MVP (zero install)
- Tailwind CSS 3.x (CDN)
- Google Fonts: Inter + Noto Sans Devanagari
- No npm required

### Production
```json
{
  "dependencies": {
    "firebase": "^10.x",
    "razorpay": "^2.x"
  },
  "devDependencies": {
    "firebase-tools": "^13.x",
    "tailwindcss": "^3.x"
  }
}
```

---

*Structure version: 1.0*
