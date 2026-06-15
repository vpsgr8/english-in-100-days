/**
 * Seed Firestore with lessons from src/data/lessons.json
 *
 * Setup:
 *   1. npm install firebase-admin (in firebase/seed/)
 *   2. Download service account key from Firebase Console
 *   3. Set GOOGLE_APPLICATION_CREDENTIALS env var
 *   4. node seed-lessons.js
 */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!SERVICE_ACCOUNT) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();

const lessonsPath = path.join(__dirname, '../../src/data/lessons.json');
const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

async function seed() {
  const batch = db.batch();
  let count = 0;

  for (const [day, lesson] of Object.entries(lessons)) {
    const ref = db.collection('lessons').doc(day);
    batch.set(ref, { ...lesson, published: true, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    count++;

    const wotdRef = db.collection('wordOfTheDay').doc(`day-${day}`);
    if (lesson.wordOfTheDay) {
      batch.set(wotdRef, {
        date: `day-${day}`,
        ...lesson.wordOfTheDay,
        lessonDay: parseInt(day, 10),
        shareText: `Word of the Day: ${lesson.wordOfTheDay.word} — ${lesson.wordOfTheDay.meaning}`
      });
    }
  }

  await batch.commit();
  console.log(`Seeded ${count} lessons + word-of-the-day entries.`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
