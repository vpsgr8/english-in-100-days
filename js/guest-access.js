/**
 * Guest access — email capture, 3-day trial, premium check (no Firebase)
 */
const GuestAccess = (() => {
  const trialDays = () => window.APP_CONFIG?.trialDays || 3;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  }

  function normalizePhone(mobile) {
    const digits = String(mobile || '').replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
    if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
    return digits;
  }

  function isValidPhone(phone) {
    return /^[6-9]\d{9}$/.test(String(phone || ''));
  }

  function startTrial(email) {
    const started = new Date();
    const ends = new Date(started.getTime() + trialDays() * 86400000);
    return {
      email: email.trim().toLowerCase(),
      trialStartedAt: started.toISOString(),
      trialEndsAt: ends.toISOString()
    };
  }

  function isPaid(user) {
    return window.Payments?.isPremium(user) || user?.plan === 'premium';
  }

  function isTrialActive(user) {
    if (!user?.trialEndsAt) return false;
    return new Date(user.trialEndsAt) > new Date();
  }

  function trialDaysLeft(user) {
    if (!user?.trialEndsAt) return 0;
    const ms = new Date(user.trialEndsAt) - Date.now();
    if (ms <= 0) return 0;
    return Math.ceil(ms / 86400000);
  }

  function canLearn(user) {
    if (!user) return false;
    return isPaid(user) || isTrialActive(user);
  }

  function migrateUser(user) {
    if (!user || isPaid(user)) return user;
    if (!user.trialStartedAt || !user.trialEndsAt) {
      const trial = startTrial(user.email || 'guest@local');
      user.trialStartedAt = trial.trialStartedAt;
      user.trialEndsAt = trial.trialEndsAt;
      if (!user.email) user.email = trial.email;
    }
    return user;
  }

  function statusLabel(user) {
    if (isPaid(user)) return { type: 'premium', text: '⭐ Premium' };
    if (isTrialActive(user)) {
      const left = trialDaysLeft(user);
      return { type: 'trial', text: `🎁 Free trial — ${left} day${left === 1 ? '' : 's'} left` };
    }
    return { type: 'expired', text: '⏰ Trial ended — pay to continue' };
  }

  return {
    trialDays,
    isValidEmail,
    isValidPhone,
    normalizePhone,
    startTrial,
    isPaid,
    isTrialActive,
    trialDaysLeft,
    canLearn,
    migrateUser,
    statusLabel
  };
})();

if (typeof window !== 'undefined') window.GuestAccess = GuestAccess;
