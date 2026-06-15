# Database Schema — English in 100 Days
## Firebase Firestore + Firebase Auth

---

## 1. Overview

```
firestore-root/
├── users/{userId}
├── lessons/{dayNumber}
├── userProgress/{userId}
├── speakingSessions/{sessionId}
├── chatMessages/{messageId}
├── subscriptions/{subscriptionId}
├── wordOfTheDay/{date}
├── stories/{storyId}          # Phase 2
├── schools/{schoolId}         # Phase 2
└── certificates/{certId}      # Phase 2
```

**Auth:** Firebase Authentication (Email/Password, Google OAuth)

---

## 2. Collections & Documents

### 2.1 `users` — User Profiles

**Path:** `users/{userId}`  
**Document ID:** Firebase Auth UID

```typescript
interface User {
  // Identity
  email: string;
  displayName: string;
  photoURL: string | null;
  phone: string | null;

  // Preferences
  nativeLanguage: 'hindi' | 'bengali' | 'tamil' | 'telugu' | 'other';
  learningGoal: 'job' | 'study' | 'travel' | 'daily' | 'other';
  uiLanguage: 'en' | 'hi';

  // Subscription
  plan: 'free' | 'premium' | 'school';
  premiumExpiresAt: Timestamp | null;
  schoolId: string | null;  // if enrolled via school license

  // Gamification
  currentDay: number;          // 1–100, next lesson to complete
  completedDays: number[];     // [1, 2, 3, ...]
  streak: number;              // consecutive days
  longestStreak: number;
  lastActiveDate: string;      // "2026-06-15" (YYYY-MM-DD)
  totalXP: number;

  // Limits (reset daily)
  dailyChatCount: number;
  dailySpeakingCount: number;
  dailyScenarioCount: number;
  limitsResetDate: string;     // "2026-06-15"

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  onboardingComplete: boolean;
}
```

**Indexes:**
- `plan` + `createdAt` (admin analytics)
- `schoolId` + `displayName` (school admin panel)

**Security Rules:**
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

### 2.2 `lessons` — 100-Day Curriculum (Read-Only Content)

**Path:** `lessons/{dayNumber}`  
**Document ID:** `"1"` through `"100"` (string)

```typescript
interface Lesson {
  day: number;                   // 1–100
  title: string;                 // "At the Market"
  theme: string;                 // "shopping"
  level: 'beginner' | 'intermediate' | 'advanced';

  words: Word[];
  sentence: SentencePattern;
  conversation: Conversation;
  quiz: QuizQuestion[];
  wordOfTheDay: string;          // key from words[].word

  // Optional native language support
  translations: {
    hindi?: {
      words: Record<string, string>;  // "apple" → "सेब"
      sentence: string;
    };
    bengali?: { /* same structure */ };
    tamil?: { /* same structure */ };
    telugu?: { /* same structure */ };
  };

  estimatedMinutes: number;      // default: 5
  published: boolean;
  createdAt: Timestamp;
}

interface Word {
  word: string;
  meaning: string;
  meaningHindi?: string;
  phonetic: string;              // "AP-ul"
  example: string;               // "I ate an apple."
  audioUrl?: string;             // Cloud Storage URL (Phase 2)
}

interface SentencePattern {
  english: string;
  hindi?: string;
  pattern: string;               // "I went to [place] to [verb] [adjective] [noun]."
  keywords: string[];            // ["market", "buy", "fresh", "apples"]
}

interface Conversation {
  title: string;
  lines: ConversationLine[];
}

interface ConversationLine {
  speaker: 'ai' | 'user' | 'other';
  text: string;
  hint?: string;                 // for user lines
}

interface QuizQuestion {
  id: string;
  type: 'meaning' | 'fill_blank' | 'comprehension';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
```

**Security Rules:**
```javascript
match /lessons/{dayNumber} {
  allow read: if request.auth != null;
  allow write: if false;  // Admin SDK only
}
```

**Seed strategy:** Upload `src/data/lessons.json` via Firebase Admin script.

---

### 2.3 `userProgress` — Per-Lesson Completion

**Path:** `userProgress/{userId}/days/{dayNumber}`

```typescript
interface DayProgress {
  day: number;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: Timestamp | null;
  completedAt: Timestamp | null;

  // Quiz results
  quizScore: number;             // 0–100
  quizAttempts: number;
  quizAnswers: {
    questionId: string;
    selectedIndex: number;
    correct: boolean;
  }[];

  // Speaking practice for this day
  speakingScores: SpeakingScore[];

  // Time tracking
  timeSpentSeconds: number;
}

interface SpeakingScore {
  text: string;
  pronunciation: number;       // 0–100
  fluency: number;
  confidence: number;
  recordedAt: Timestamp;
}
```

**Security Rules:**
```javascript
match /userProgress/{userId}/days/{dayNumber} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

### 2.4 `speakingSessions` — AI Speaking Practice Logs

**Path:** `speakingSessions/{sessionId}`

```typescript
interface SpeakingSession {
  userId: string;
  type: 'daily_lesson' | 'english_buddy' | 'scenario' | 'free_practice';

  // Input
  inputLanguage: 'en' | 'hi' | 'bn' | 'ta' | 'te';
  inputText: string;             // STT result or typed
  expectedText: string;          // what user should have said

  // Scores
  pronunciation: number;
  fluency: number;
  confidence: number;
  overall: number;

  // Context
  scenarioId?: string;           // "restaurant", "interview", etc.
  lessonDay?: number;
  buddyTranslation?: {
    hindi: string;
    english: string;
    phonetic: string;
  };

  // Feedback from AI (Premium)
  aiFeedback?: string;

  createdAt: Timestamp;
}
```

**Indexes:**
- `userId` + `createdAt` DESC
- `userId` + `type` + `createdAt` DESC

---

### 2.5 `chatMessages` — AI Teacher Chat History

**Path:** `chatMessages/{messageId}`

```typescript
interface ChatMessage {
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'en' | 'hi';

  // Context for better AI responses
  context?: {
    currentDay?: number;
    learningGoal?: string;
  };

  tokensUsed?: number;
  createdAt: Timestamp;
}
```

**Indexes:**
- `userId` + `createdAt` ASC

**Retention:** Auto-delete messages older than 90 days (Cloud Function).

---

### 2.6 `subscriptions` — Payment Records

**Path:** `subscriptions/{subscriptionId}`

```typescript
interface Subscription {
  userId: string;
  plan: 'premium_monthly' | 'school_annual';
  status: 'active' | 'cancelled' | 'expired' | 'pending';

  // Razorpay
  razorpaySubscriptionId: string;
  razorpayPaymentId: string | null;
  amount: number;                // paise (9900 = ₹99)
  currency: 'INR';

  startedAt: Timestamp;
  expiresAt: Timestamp;
  cancelledAt: Timestamp | null;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Security Rules:**
```javascript
match /subscriptions/{subscriptionId} {
  allow read: if request.auth != null &&
    resource.data.userId == request.auth.uid;
  allow write: if false;  // Webhook / Cloud Functions only
}
```

---

### 2.7 `wordOfTheDay` — Daily Featured Word

**Path:** `wordOfTheDay/{date}`  
**Document ID:** `"2026-06-15"` (YYYY-MM-DD)

```typescript
interface WordOfTheDay {
  date: string;
  word: string;
  meaning: string;
  meaningHindi: string;
  phonetic: string;
  example: string;
  lessonDay: number;             // linked lesson
  shareText: string;             // pre-formatted for WhatsApp
}
```

---

### 2.8 `stories` — Story Learning (Phase 2)

**Path:** `stories/{storyId}`

```typescript
interface Story {
  id: string;
  title: string;
  level: 1 | 2 | 3;              // 100 / 300 / 1000 words
  wordCount: number;
  content: string;               // markdown or plain text
  vocabulary: string[];
  quiz: QuizQuestion[];
  published: boolean;
}
```

---

### 2.9 `schools` — B2B Licenses (Phase 2)

**Path:** `schools/{schoolId}`

```typescript
interface School {
  name: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  state: string;

  license: {
    tier: 'small' | 'medium' | 'large';
    maxStudents: number;
    activeStudents: number;
    expiresAt: Timestamp;
    amountPaid: number;
  };

  adminUserIds: string[];
  inviteCode: string;            // students join with this code

  createdAt: Timestamp;
}
```

---

### 2.10 `certificates` — Completion Certificates (Phase 2)

**Path:** `certificates/{certId}`

```typescript
interface Certificate {
  userId: string;
  type: 'day_30' | 'day_60' | 'day_100' | 'course_complete';
  displayName: string;
  completedAt: Timestamp;
  pdfUrl: string;                // Cloud Storage
  verificationCode: string;      // unique, for employer verification
}
```

---

## 3. Firebase Auth Users

Standard Firebase Auth fields. Custom claims for Premium:

```typescript
// Set via Admin SDK after payment webhook
interface CustomClaims {
  plan: 'free' | 'premium' | 'school';
  schoolId?: string;
}
```

---

## 4. Cloud Storage Structure

```
gs://english-in-100-days.appspot.com/
├── audio/
│   ├── lessons/day-{n}/word-{word}.mp3
│   └── scenarios/{scenarioId}/prompt.mp3
├── certificates/{userId}/{certId}.pdf
└── avatars/{userId}.jpg
```

---

## 5. Local Storage (MVP Single-File Fallback)

When Firebase is not configured, MVP uses `localStorage`:

```typescript
interface LocalUserData {
  user: Partial<User>;
  progress: Record<number, DayProgress>;
  chatHistory: ChatMessage[];
  speakingSessions: SpeakingSession[];
}
// Key: "ei100d_user_data"
```

---

## 6. Entity Relationship Diagram

```
┌──────────┐       ┌───────────────┐       ┌─────────┐
│  users   │──1:N──│ userProgress  │──N:1──│ lessons │
└──────────┘       └───────────────┘       └─────────┘
     │
     ├──1:N──▶ speakingSessions
     ├──1:N──▶ chatMessages
     ├──1:N──▶ subscriptions
     └──N:1──▶ schools (optional)

┌──────────────┐
│ wordOfTheDay │──N:1──▶ lessons
└──────────────┘
```

---

## 7. Sample Documents

### User (after onboarding)
```json
{
  "email": "priya@example.com",
  "displayName": "Priya Sharma",
  "nativeLanguage": "hindi",
  "learningGoal": "job",
  "plan": "free",
  "currentDay": 4,
  "completedDays": [1, 2, 3],
  "streak": 3,
  "longestStreak": 3,
  "lastActiveDate": "2026-06-15",
  "totalXP": 150,
  "dailyChatCount": 2,
  "dailySpeakingCount": 1,
  "limitsResetDate": "2026-06-15",
  "onboardingComplete": true
}
```

### Lesson Day 1
```json
{
  "day": 1,
  "title": "At the Market",
  "theme": "shopping",
  "level": "beginner",
  "words": [
    { "word": "Apple", "meaning": "A round fruit", "meaningHindi": "सेब", "phonetic": "AP-ul", "example": "I ate an apple." },
    { "word": "Buy", "meaning": "To get something by paying", "meaningHindi": "खरीदना", "phonetic": "BY", "example": "I want to buy milk." },
    { "word": "Market", "meaning": "A place to shop", "meaningHindi": "बाज़ार", "phonetic": "MAR-kit", "example": "Let's go to the market." },
    { "word": "Fresh", "meaning": "New and good", "meaningHindi": "ताज़ा", "phonetic": "FRESH", "example": "These vegetables are fresh." },
    { "word": "Price", "meaning": "How much something costs", "meaningHindi": "कीमत", "phonetic": "PRYS", "example": "What is the price?" }
  ],
  "sentence": {
    "english": "I went to the market to buy fresh apples.",
    "hindi": "मैं ताज़ा सेब खरीदने बाज़ार गया।",
    "pattern": "I went to [place] to [verb] [adjective] [noun].",
    "keywords": ["market", "buy", "fresh", "apples"]
  },
  "conversation": {
    "title": "Buying Apples",
    "lines": [
      { "speaker": "other", "text": "Hello! Fresh apples today. Only ₹80 per kg." },
      { "speaker": "user", "text": "I would like one kilo, please.", "hint": "Say: I would like one kilo, please." },
      { "speaker": "other", "text": "Sure! Anything else?" },
      { "speaker": "user", "text": "No, thank you. What is the total price?", "hint": "Ask about the price." }
    ]
  },
  "quiz": [
    {
      "id": "d1q1",
      "type": "meaning",
      "question": "What does 'Fresh' mean?",
      "options": ["Old", "New and good", "Expensive", "Small"],
      "correctIndex": 1,
      "explanation": "Fresh means new and good quality."
    },
    {
      "id": "d1q2",
      "type": "fill_blank",
      "question": "I went to the ___ to buy apples.",
      "options": ["school", "market", "hospital", "office"],
      "correctIndex": 1,
      "explanation": "Market is where we buy fruits and vegetables."
    },
    {
      "id": "d1q3",
      "type": "comprehension",
      "question": "How much are the apples per kg?",
      "options": ["₹50", "₹80", "₹100", "₹120"],
      "correctIndex": 1,
      "explanation": "The shopkeeper said ₹80 per kg."
    }
  ],
  "wordOfTheDay": "Opportunity",
  "estimatedMinutes": 5,
  "published": true
}
```

---

## 8. Migration & Seeding Scripts

| Script | Purpose |
|--------|---------|
| `firebase/seed-lessons.js` | Upload 100 lessons from JSON |
| `firebase/seed-word-of-day.js` | Generate 100 days of WOTD |
| `firebase/set-custom-claims.js` | Grant premium after payment |

---

## 9. Backup & Retention Policy

| Data | Retention |
|------|-----------|
| User profiles | Until account deletion |
| Chat messages | 90 days |
| Speaking sessions | 1 year |
| Subscriptions | 7 years (tax compliance) |
| Lessons | Permanent |

---

*Schema version: 1.0*  
*Compatible with: Firebase Firestore (Native mode)*
