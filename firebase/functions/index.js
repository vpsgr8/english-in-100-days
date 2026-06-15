const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { OpenAI } = require('openai');
const Razorpay = require('razorpay');
const crypto = require('crypto');

admin.initializeApp();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const region = functions.region('asia-south1');

const SYSTEM_PROMPT = `You are a friendly English teacher for Indian learners.
Teach spoken English practically. Use simple sentences.
If the user writes in Hindi, translate to English and explain.
Keep answers under 150 words. Encourage the user to speak aloud.`;

exports.chatTeacher = region.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required.');

  const { message, currentDay, learningGoal } = data;
  if (!message) throw new functions.https.HttpsError('invalid-argument', 'Message required.');

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `${SYSTEM_PROMPT} User goal: ${learningGoal || 'general'}. Current lesson day: ${currentDay || 1}.` },
      { role: 'user', content: message }
    ],
    max_tokens: 300,
    temperature: 0.7
  });

  return { reply: response.choices[0].message.content };
});

exports.englishBuddy = region.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required.');

  const { hindiText, nativeLanguage } = data;
  if (!hindiText) throw new functions.https.HttpsError('invalid-argument', 'Text required.');

  const langMap = { hindi: 'Hindi', bengali: 'Bengali', tamil: 'Tamil', telugu: 'Telugu' };
  const lang = langMap[nativeLanguage] || 'Hindi';

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: `Translate ${lang} to natural spoken English for Indian learners. Return JSON only: {"english":"","meaning":"","phonetic":"","practice":""}. phonetic = simple pronunciation guide. practice = a sentence starting with "Say:"` },
      { role: 'user', content: hindiText }
    ],
    max_tokens: 200,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
});

exports.createRazorpayOrder = region.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required.');

  const amount = data.amount || 9900;
  const order = await rzp.orders.create({
    amount,
    currency: data.currency || 'INR',
    receipt: `prem_${context.auth.uid.slice(0, 8)}_${Date.now()}`,
    notes: { userId: context.auth.uid, plan: data.plan || 'premium_monthly' }
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  };
});

exports.verifyRazorpayPayment = region.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required.');

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected !== razorpay_signature) {
    throw new functions.https.HttpsError('permission-denied', 'Invalid payment signature.');
  }

  const expiresAt = admin.firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 86400000));
  await admin.firestore().collection('users').doc(context.auth.uid).set({
    plan: 'premium',
    premiumExpiresAt: expiresAt,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  await admin.firestore().collection('subscriptions').add({
    userId: context.auth.uid,
    plan: 'premium_monthly',
    status: 'active',
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    amount: 9900,
    currency: 'INR',
    startedAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt
  });

  return { success: true, plan: 'premium' };
});

exports.razorpayWebhook = functions.https.onRequest(async (req, res) => {
  // Verify Razorpay signature in production
  const event = req.body.event;
  if (event === 'subscription.activated') {
    const userId = req.body.payload.subscription.entity.notes.userId;
    await admin.firestore().collection('users').doc(userId).update({
      plan: 'premium',
      premiumExpiresAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 86400000))
    });
  }
  res.status(200).send('OK');
});
