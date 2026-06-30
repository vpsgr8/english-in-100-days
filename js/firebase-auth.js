/**
 * Firebase Auth + Firestore sync for English in 100 Days
 * Uses Firebase compat SDK (loaded from CDN in index.html)
 */
const FirebaseApp = (() => {
  let app = null;
  let auth = null;
  let db = null;
  let functions = null;
  let ready = false;

  function isEnabled() {
    const c = window.APP_CONFIG;
    return c?.firebaseEnabled && c.firebase?.apiKey && c.firebase?.projectId;
  }

  async function init() {
    if (!isEnabled() || ready) return false;
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded');
      return false;
    }

    const cfg = window.APP_CONFIG.firebase;
    app = firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.firestore();
    functions = firebase.app().functions(window.APP_CONFIG.functionsRegion || 'asia-south1');

    // Persist auth across sessions
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    ready = true;
    return true;
  }

  function onAuthChange(callback) {
    if (!auth) return () => {};
    return auth.onAuthStateChanged(callback);
  }

  async function signInWithGoogle() {
    if (!auth) throw new Error('Firebase not initialized');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await auth.signInWithPopup(provider);
    return result.user;
  }

  async function signInWithEmail(email, password) {
    if (!auth) throw new Error('Firebase not initialized');
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      return result.user;
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        return result.user;
      }
      throw e;
    }
  }

  async function signOut() {
    if (auth) await auth.signOut();
  }

  async function loadUserDoc(uid) {
    if (!db) return null;
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? snap.data() : null;
  }

  async function saveUserDoc(uid, data) {
    if (!db) return;
    await db.collection('users').doc(uid).set({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  async function createUserProfile(fbUser, extras) {
    const profile = {
      email: fbUser.email || '',
      displayName: fbUser.displayName || extras.name || 'Learner',
      photoURL: fbUser.photoURL || null,
      nativeLanguage: extras.nativeLanguage || 'hindi',
      learningGoal: extras.learningGoal || 'daily',
      plan: 'free',
      currentDay: 1,
      completedDays: [],
      streak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      totalXP: 0,
      dailyChatCount: 0,
      dailySpeakingCount: 0,
      limitsResetDate: new Date().toISOString().slice(0, 10),
      onboardingComplete: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await saveUserDoc(fbUser.uid, profile);
    return profile;
  }

  function mergeProfiles(fbUser, firestoreData, localData) {
    const base = firestoreData || {};
    const local = localData || {};
    return {
      uid: fbUser.uid,
      name: base.displayName || fbUser.displayName || local.name || 'Learner',
      email: fbUser.email || local.email || '',
      photoURL: fbUser.photoURL || null,
      nativeLanguage: base.nativeLanguage || local.nativeLanguage || 'hindi',
      goal: base.learningGoal || local.goal || 'daily',
      plan: base.plan || local.plan || 'free',
      premiumExpiresAt: base.premiumExpiresAt || local.premiumExpiresAt || null,
      currentDay: base.currentDay ?? local.currentDay ?? 1,
      completedDays: base.completedDays?.length ? base.completedDays : (local.completedDays || []),
      certificates: base.certificates?.length ? base.certificates : (local.certificates || []),
      streak: base.streak ?? local.streak ?? 0,
      lastActiveDate: base.lastActiveDate || local.lastActiveDate || null,
      xp: base.totalXP ?? local.xp ?? 0,
      dailySpeaking: base.dailySpeakingCount ?? local.dailySpeaking ?? 0,
      chatCount: base.dailyChatCount ?? local.chatCount ?? 0,
      firebase: true
    };
  }

  function toFirestore(user) {
    return {
      displayName: user.name,
      nativeLanguage: user.nativeLanguage,
      learningGoal: user.goal,
      plan: user.plan,
      premiumExpiresAt: user.premiumExpiresAt || null,
      currentDay: user.currentDay,
      completedDays: user.completedDays,
      certificates: user.certificates || [],
      streak: user.streak,
      lastActiveDate: user.lastActiveDate,
      totalXP: user.xp,
      dailySpeakingCount: user.dailySpeaking,
      dailyChatCount: user.chatCount,
      limitsResetDate: new Date().toISOString().slice(0, 10)
    };
  }

  async function callFunction(name, data) {
    if (!functions) throw new Error('Functions not initialized');
    const fn = functions.httpsCallable(name);
    const result = await fn(data);
    return result.data;
  }

  return {
    init, isEnabled, onAuthChange,
    signInWithGoogle, signInWithEmail, signOut,
    loadUserDoc, saveUserDoc, createUserProfile,
    mergeProfiles, toFirestore, callFunction,
    get auth() { return auth; },
    get db() { return db; },
    get ready() { return ready; }
  };
})();

if (typeof window !== 'undefined') window.FirebaseApp = FirebaseApp;
