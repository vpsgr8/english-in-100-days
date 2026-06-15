# English in 100 Days 🇬🇧🇮🇳

> **Learn Spoken English in 100 Days for Indians** — Listen → Speak → Understand → Grammar

A web-first English learning platform targeting Indian learners. Just 5 minutes a day.

---

## Host free on GitHub Pages (recommended)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/english-in-100-days.git
git push -u origin main
```

Then: **GitHub repo → Settings → Pages → Source: GitHub Actions**

Live at: `https://YOUR_USERNAME.github.io/english-in-100-days/`

Full guide: **[docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md)**

## Quick Start (local)

```bash
npm run dev          # http://localhost:3000
```

## Host on Netlify (alternative)

```bash
npm run deploy       # needs netlify-cli
```

See [docs/NETLIFY_DOMAIN.md](docs/NETLIFY_DOMAIN.md)

---

## What's Included

| File | Description |
|------|-------------|
| [`mvp/index.html`](mvp/index.html) | Single-file MVP app |
| [`mvp/lessons.json`](mvp/lessons.json) | **100 days** complete curriculum |
| [`mvp/config.js`](mvp/config.js) | Firebase + Razorpay config |
| [`mvp/js/firebase-auth.js`](mvp/js/firebase-auth.js) | Firebase Auth + Firestore sync |
| [`mvp/js/razorpay-pay.js`](mvp/js/razorpay-pay.js) | Razorpay checkout integration |
| [`docs/SETUP.md`](docs/SETUP.md) | **Firebase + Razorpay setup guide** |
| [`scripts/generate-lessons.js`](scripts/generate-lessons.js) | Generator for Days 4–100 |
| [`docs/PRD.md`](docs/PRD.md) | Full Product Requirements Document |
| [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md) | Firebase Firestore schema |
| [`firebase/`](firebase/) | Firestore rules, Cloud Functions, seed script |
| [`netlify.toml`](netlify.toml) | One-click Netlify deploy config |

---

## MVP Features (Working Now)

- ✅ Landing page with pricing
- ✅ Onboarding (name, language, goal)
- ✅ Dashboard with streak, XP, progress
- ✅ Daily 5-min lessons (**100 days** complete curriculum)
- ✅ **Certificate PDFs** at Day 30, 60, and 100
- ✅ **PWA** — install on Android/iPhone (Add to Home Screen)
- ✅ **Marketing landing** — SEO, FAQ, testimonials, schools section
- ✅ **School admin panel** — `admin.html` with invite codes & CSV export
- ✅ **WhatsApp share** — Word of the Day viral loop
- ✅ Word of the Day
- ✅ Quiz system (pass 2/3 to unlock next day)
- ✅ AI Speaking Practice (Web Speech API + scores)
- ✅ English Buddy (Hindi → English bridge)
- ✅ 6 Real-Life Scenarios (restaurant, interview, travel...)
- ✅ AI Chat Teacher (rule-based demo; plug OpenAI for production)
- ✅ Word Puzzle game
- ✅ Premium upsell modal (₹99/month)
- ✅ LocalStorage progress persistence

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, Tailwind CSS, Vanilla JS |
| Backend (prod) | Firebase Auth + Firestore |
| AI (prod) | OpenAI API via Cloud Functions |
| Speech | Web Speech API + Speech Synthesis |
| Payments (prod) | Razorpay |
| Hosting | Netlify |

**Estimated launch cost:** Under ₹5,000

---

## 30-Day Roadmap

| Week | Tasks |
|------|-------|
| **Week 1** | Landing, login, dashboard ✅ (MVP done) |
| **Week 2** | Expand to 30+ lessons, quiz system ✅ (partial) |
| **Week 3** | Firebase + OpenAI integration |
| **Week 4** | Razorpay, certificates, deploy |

---

## Documentation

| Guide | Description |
|-------|-------------|
| [GITHUB_PAGES.md](docs/GITHUB_PAGES.md) | **Free hosting via GitHub** |
| [NETLIFY_DOMAIN.md](docs/NETLIFY_DOMAIN.md) | **Custom domain on Netlify** |
| [FIREBASE_PRODUCTION.md](docs/FIREBASE_PRODUCTION.md) | **Production Firebase keys** |
| [LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | **WhatsApp & Instagram launch plan** |
| [marketing/whatsapp-posts.md](docs/marketing/whatsapp-posts.md) | Copy-paste WhatsApp messages |
| [marketing/instagram-posts.md](docs/marketing/instagram-posts.md) | Instagram captions & Reels scripts |

## Production deploy

```bash
cp .env.example .env     # fill in Firebase + Razorpay keys
npm run deploy           # generates config.local.js + deploys to Netlify
```

See `docs/NETLIFY_DOMAIN.md` for custom domain DNS setup.

## Generate More Lessons

```bash
node scripts/generate-lessons.js   # Updates src/data + mvp/lessons.json
```

Edit `CURRICULUM` array in the script to add Days 31–100, then re-run.

## Firebase Setup

```bash
cd firebase/functions && npm install
firebase login
firebase init   # select Firestore, Functions, Hosting
node seed/seed-lessons.js   # after setting GOOGLE_APPLICATION_CREDENTIALS
firebase deploy
```

---

## Project Structure

```
english-in-100-days/
├── mvp/index.html          ← Start here
├── docs/                   ← PRD, schema, structure
├── src/data/lessons.json   ← Curriculum data
└── README.md
```

---

## License

Private — All rights reserved.
