# Product Requirements Document (PRD)
## English in 100 Days — Learn Spoken English for Indians

| Field | Value |
|-------|-------|
| **Version** | 1.0 (MVP) |
| **Date** | June 15, 2026 |
| **Status** | Ready for Development |
| **Tagline** | Learn Spoken English in 100 Days — Like a Child Learns |

---

## 1. Executive Summary

**English in 100 Days** is a web-first English learning platform targeting Indian learners who want practical spoken English, not grammar-first textbooks. The platform follows a natural acquisition model: **Listen → Speak → Understand → Grammar**.

Unlike Duolingo/Babbel (grammar-first, Western-centric), this product solves a specific Indian pain point: *"I understand English but cannot speak confidently."*

**MVP Goal:** Launch a functional web app in 30 days for under ₹5,000, validate with 500+ users, convert 5% to Premium (₹99/month).

---

## 2. Problem Statement

| Segment | Pain Point |
|---------|------------|
| Students (10–18) | English exams require speaking; schools teach reading/writing only |
| Job seekers | Fail interviews due to poor spoken English, not lack of skills |
| Housewives | Want independence (shopping, parent-teacher meetings) |
| Professionals | Need corporate/email English for promotions |
| Senior citizens | Want to talk to grandchildren abroad |
| Rural/semi-urban users | No access to spoken English coaches |

**Core insight:** 90% of Indian English learners know basic grammar but cannot hold a 2-minute conversation.

---

## 3. Target Users & Personas

### Persona 1: Priya (22, Job Seeker, Patna)
- Hindi medium background, B.Com graduate
- Failed 2 interviews due to English
- Uses phone 4+ hours/day, budget-conscious
- **Goal:** Crack HR interview in 60 days

### Persona 2: Ravi (15, Student, Chennai)
- Tamil → English learner
- Parents want spoken English for career
- Loves games and short content
- **Goal:** Speak confidently in class

### Persona 3: Sunita (45, Homemaker, Jaipur)
- Wants to help kids with homework, talk at society meetings
- **Goal:** Daily practical English for real situations

---

## 4. Unique Selling Proposition (USP)

| Competitors | English in 100 Days |
|-------------|---------------------|
| Grammar first | Listen → Speak → Understand → Grammar |
| Generic global content | India-specific (Hindi, Bengali, Tamil, Telugu bridges) |
| Long lessons (15–30 min) | **5-minute daily lessons** |
| No mother-tongue bridge | **English Buddy** — speak in Hindi, learn in English |
| Expensive (₹500–2000/month) | **₹99/month** Premium |

**Positioning:** *"Learn Spoken English in 100 Days for Indians"*

---

## 5. Core Features (MVP vs Future)

### 5.1 MVP (Month 1) — P0

| Feature | Description | Acceptance Criteria |
|---------|-------------|---------------------|
| Landing Page | Hero, features, pricing, CTA | Mobile-responsive, loads < 3s |
| Auth | Email/Google login via Firebase | Sign up, login, logout, session persist |
| Dashboard | Day streak, progress ring, quick actions | Shows current day (1–100), streak count |
| Daily 5-Min Lesson | 5 words + 1 sentence + 1 conversation | Day N unlocks after Day N-1 complete |
| Quiz | 3 questions per lesson | 70% pass to unlock next day |
| Word of the Day | Word, meaning, example sentence | New word daily, tied to lesson theme |
| AI Chat Teacher | Ask questions, get instant answers | OpenAI API, context-aware, Hindi support |
| Speaking Practice | Pronunciation/fluency/confidence scores | Web Speech API, score display |
| English Buddy | Hindi input → English output + practice | STT in Hindi, TTS in English |
| Real-Life Situations | Restaurant, Interview, Travel (3 scenarios) | AI roleplay with feedback |
| Progress Tracking | Lessons completed, streak, scores | Stored in Firestore |
| Premium Gate | Free vs Premium feature limits | Razorpay ₹99/month |

### 5.2 Phase 2 (Month 2–3) — P1

- Story Learning (100/300/1000 word levels)
- English for Jobs (email, presentation modules)
- English Games (puzzle, match, fill-blank, listening)
- Certificates (PDF on 30/60/100 day completion)
- Bengali, Tamil, Telugu language bridges
- School bulk license admin panel

### 5.3 Phase 3 (Month 4+) — P2

- Native Android/iOS apps
- Live group classes
- Community leaderboard
- Referral program ("Invite a friend, get 7 days Premium")

---

## 6. User Flows

### 6.1 Onboarding Flow
```
Landing → Sign Up → Select Native Language → Set Goal (Job/Study/Travel/Daily) → Day 1 Lesson
```

### 6.2 Daily Lesson Flow
```
Dashboard → Start Day N → Listen (TTS) → Repeat Words → Practice Sentence → 
Mini Conversation → Quiz (3 Q) → Pass → Streak +1 → Unlock Day N+1
```

### 6.3 English Buddy Flow
```
User speaks Hindi → STT → AI translates to English → 
Show pronunciation guide → User repeats → Score → Suggest practice sentence
```

### 6.4 Premium Conversion Flow
```
Hit limit (e.g., 3 speaking sessions/day) → Upgrade modal → Razorpay → Unlock unlimited
```

---

## 7. Feature Specifications

### 7.1 Daily 5-Minute Lesson Structure

**Per day (fixed template):**
1. **5 New Words** — image optional, audio (TTS), meaning in native language
2. **1 Sentence Pattern** — e.g., "I went to the market to buy fresh apples."
3. **1 Conversation** — 4–6 line dialogue (AI or scripted for MVP)
4. **Quiz** — 3 MCQ (word meaning, sentence fill, conversation comprehension)

**Example Day 1:**
| Words | Apple, Buy, Market, Fresh, Price |
| Sentence | I went to the market to buy fresh apples. |
| Conversation | Shopkeeper ↔ Customer at fruit market |

**Content:** 100 days pre-authored in JSON; AI generates variations in Phase 2.

### 7.2 AI Speaking Practice

**Input:** User microphone via Web Speech API  
**Output scores (0–100%):**
- **Pronunciation** — phoneme match vs expected text (Levenshtein + keyword match for MVP)
- **Fluency** — words per minute, pause detection
- **Confidence** — volume stability, completion rate

**Free tier:** 3 sessions/day  
**Premium:** Unlimited

### 7.3 Real-Life Situations

| Scenario | AI Opening | User Goal |
|----------|------------|-----------|
| Restaurant | "Welcome. What would you like to order?" | Order food politely |
| Interview | "Tell me about yourself." | 60-second self-intro |
| Airport | "May I see your passport, please?" | Check-in dialogue |
| Hotel | "Do you have a reservation?" | Check-in, ask for room |
| Taxi | "Where would you like to go?" | Give address, ask fare |
| Shopping | "Can I help you find something?" | Ask price, negotiate |

### 7.4 English Buddy (Viral Feature)

**Input languages (MVP):** Hindi  
**Phase 2:** Bengali, Tamil, Telugu

**Pipeline:**
1. User speaks in Hindi
2. STT (browser or Google Cloud)
3. OpenAI: translate + explain + pronunciation IPA/phonetic
4. TTS plays correct English
5. User repeats → scored

**Example:**
| Hindi | मुझे अंग्रेजी बोलना सीखना है। |
| English | I want to learn English speaking. |
| Practice | Say: "I want to learn English speaking." |

### 7.5 Word of the Day

- Synced with daily lesson vocabulary (1 highlighted word)
- Push notification (Phase 2)
- Share card for WhatsApp (viral loop)

### 7.6 Story Learning (Phase 2)

| Level | Word Count | Quiz |
|-------|------------|------|
| Level 1 | 100 words | 5 MCQ |
| Level 2 | 300 words | 8 MCQ |
| Level 3 | 1000 words | 12 MCQ |

### 7.7 English for Jobs (Phase 2)

Modules: Interview English, Corporate English, Email Writing, Presentation Skills

### 7.8 English Games (Phase 2)

- Word Puzzle (unscramble)
- Match Meaning (word ↔ definition)
- Fill in the Blank
- Listening Challenge (hear word → pick correct spelling)

---

## 8. AI Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │────▶│   Firebase   │────▶│  OpenAI API │
│  STT / TTS  │     │   Functions  │     │  GPT-4o-mini│
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       │                    ▼
       │             ┌──────────────┐
       └────────────▶│  Firestore   │
                     │  (progress)  │
                     └──────────────┘
```

| Use Case | Model | Est. Cost/User/Month |
|----------|-------|----------------------|
| Chat Teacher | GPT-4o-mini | ₹2–5 |
| English Buddy translate | GPT-4o-mini | ₹1–3 |
| Interview feedback | GPT-4o-mini | ₹2–4 |
| Speaking scoring (MVP) | Client-side heuristic | ₹0 |

**API key security:** Never expose OpenAI key in frontend. Use Firebase Cloud Functions as proxy.

---

## 9. Revenue Model

### 9.1 Free Tier
- Daily lesson (1/day)
- Word of the day
- Basic AI chat (10 messages/day)
- 3 speaking practice sessions/day
- 1 real-life scenario/day

### 9.2 Premium — ₹99/month
- Unlimited AI speaking practice
- All interview & travel scenarios
- Progress analytics & certificates
- Offline lesson download (Phase 2)
- Ad-free

### 9.3 Schools / Institutions
| Tier | Students | Price/Year |
|------|----------|------------|
| Small | 50 | ₹10,000 |
| Medium | 200 | ₹35,000 |
| Large | 500+ | ₹1,00,000 |

**Sales channel:** Direct outreach to coaching centers, schools in Tier 2/3 cities.

---

## 10. Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | HTML, Tailwind CSS, Vanilla JS | Zero build step, fast MVP |
| Backend | Firebase (Auth, Firestore, Functions) | Free tier, real-time, scales |
| AI | OpenAI API (via Cloud Functions) | Best Hindi→English quality |
| Speech | Web Speech API + Speech Synthesis API | Free, browser-native |
| Payments | Razorpay | India-native, UPI support |
| Hosting | Netlify | Free tier, CI/CD from Git |
| Analytics | Firebase Analytics + Plausible (optional) | Privacy-friendly |

**Estimated MVP cost:** ₹2,000–5,000 (domain + OpenAI credits + Razorpay setup)

---

## 11. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load (3G) | < 4 seconds |
| Mobile responsive | 320px–1920px |
| Uptime | 99.5% (Firebase/Netlify SLA) |
| Data privacy | GDPR-lite, Indian IT Act compliant |
| Accessibility | WCAG 2.1 AA (Phase 2) |
| Languages (UI) | English + Hindi (MVP) |

---

## 12. Success Metrics (KPIs)

### MVP (30 days)
| Metric | Target |
|--------|--------|
| Sign-ups | 500 |
| Day-7 retention | 25% |
| Avg. streak | 5 days |
| Premium conversion | 5% |
| NPS | > 40 |

### Growth (90 days)
| Metric | Target |
|--------|--------|
| MAU | 5,000 |
| MRR | ₹25,000 |
| School pilots | 3 |
| Viral coefficient (Buddy shares) | 0.3 |

---

## 13. 30-Day MVP Roadmap

### Week 1 — Foundation
- [ ] Landing page (hero, features, pricing, FAQ)
- [ ] Firebase project setup (Auth, Firestore)
- [ ] Login/signup (Google + email)
- [ ] Dashboard shell (streak, day progress)

### Week 2 — Core Learning
- [ ] 30 days of lesson content (JSON)
- [ ] Daily lesson UI (words, sentence, conversation)
- [ ] Quiz system with pass/fail
- [ ] Word of the day widget
- [ ] Progress persistence (Firestore)

### Week 3 — AI & Voice
- [ ] Firebase Function → OpenAI proxy
- [ ] AI Chat Teacher panel
- [ ] Web Speech recognition integration
- [ ] Speaking practice with scores
- [ ] English Buddy (Hindi bridge)
- [ ] 3 real-life scenarios

### Week 4 — Monetization & Launch
- [ ] Razorpay subscription integration
- [ ] Premium feature gates
- [ ] Certificate generation (Day 30 milestone)
- [ ] Netlify deploy + custom domain
- [ ] Soft launch (WhatsApp groups, Reddit r/India)

---

## 14. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| OpenAI costs spike | High | Rate limits, GPT-4o-mini, caching common answers |
| Web Speech API poor Hindi STT | High | Fallback to Google Cloud STT (Phase 2) |
| Low retention | High | Streaks, WhatsApp reminders, gamification |
| Competition copies | Medium | Niche positioning, Indian content moat |
| Payment failures | Medium | Razorpay retry, UPI-first UX |

---

## 15. Open Questions

1. **Content creation:** Hire freelancer for 100-day curriculum vs AI-generated with human review?
2. **Hindi STT accuracy:** Is browser STT sufficient for MVP or need Google Cloud from day 1?
3. **School sales:** B2B before or after 1,000 B2C users?
4. **Branding:** "English in 100 Days" vs regional name (e.g., "Angrezi Seekho")?

---

## 16. Appendix

### A. Competitive Landscape

| App | Price | Weakness for India |
|-----|-------|-------------------|
| Duolingo | Free/₹500+ | Grammar-first, no Hindi bridge |
| Babbel | ₹800+/mo | Expensive, Western scenarios |
| Hello English | Free/ads | Outdated UI, limited AI |
| EngVarta | ₹500+/mo | Live coaches only, expensive |

### B. Sample Lesson JSON Schema
See `docs/DATABASE_SCHEMA.md` → `lessons` collection.

### C. Wireframes
See `mvp/index.html` for interactive UI prototype.

---

*Document owner: Product Team*  
*Next review: Week 2 of development sprint*
