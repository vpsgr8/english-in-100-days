/**
 * Razorpay checkout — fixed ₹299/month (no manual amount entry)
 */
const Payments = (() => {
  const PREMIUM_AMOUNT = () => window.APP_CONFIG?.premiumAmount || 29900;

  function premiumPriceRupees() {
    return (PREMIUM_AMOUNT() / 100).toLocaleString('en-IN');
  }

  function hasCheckoutKey() {
    const c = window.APP_CONFIG;
    return c?.razorpayEnabled && c?.razorpayKeyId && typeof Razorpay !== 'undefined';
  }

  /** Reject razorpay.me/@profile links — those ask users to type any amount. */
  function isFixedPaymentLink(link) {
    if (!link || typeof link !== 'string') return false;
    const trimmed = link.trim();
    if (/razorpay\.me\/@[^/]+$/i.test(trimmed)) return false;
    return /rzp\.io\/|pages\.razorpay\.com|razorpay\.com\/payment-link|razorpay\.com\/pl_/i.test(trimmed);
  }

  function hasPaymentLink() {
    return isFixedPaymentLink(window.APP_CONFIG?.razorpayPaymentLink);
  }

  function isEnabled() {
    return hasCheckoutKey() || hasPaymentLink();
  }

  function isPremium(user) {
    if (!user) return false;
    if (user.plan === 'premium') {
      if (user.premiumExpiresAt) return new Date(user.premiumExpiresAt) > new Date();
      return true;
    }
    return false;
  }

  function unlockPremium(user, paymentId) {
    user.plan = 'premium';
    user.premiumExpiresAt = new Date(Date.now() + 30 * 86400000).toISOString();
    if (paymentId) user.razorpayPaymentId = paymentId;
  }

  function openCheckout(user, onSuccess) {
    const cfg = window.APP_CONFIG;
    const amount = PREMIUM_AMOUNT();
    const options = {
      key: cfg.razorpayKeyId,
      amount,
      currency: cfg.premiumCurrency || 'INR',
      name: cfg.premiumPlanName || 'English in 100 Days',
      description: `${cfg.premiumDescription || 'Monthly subscription'} — ₹${premiumPriceRupees()}`,
      prefill: { name: user?.name || '', email: user?.email || '', contact: user?.phone || '' },
      notes: { email: user?.email || '', phone: user?.phone || '', plan: 'premium_monthly', amount_inr: premiumPriceRupees() },
      theme: { color: '#2563eb' },
      handler(response) { onSuccess(response); },
      modal: { ondismiss() {} }
    };
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', (resp) => {
      alert('Payment failed: ' + (resp.error?.description || 'Please try again.'));
    });
    rzp.open();
  }

  function openFixedPaymentLink(user) {
    const link = window.APP_CONFIG.razorpayPaymentLink.trim();
    const url = new URL(link);
    if (user?.email) url.searchParams.set('email', user.email);
    window.open(url.toString(), '_blank', 'noopener');
    return confirm(
      `Complete the ₹${premiumPriceRupees()} payment in Razorpay.\n\nAfter paying, click OK to unlock your account.`
    );
  }

  function paymentSetupError() {
    alert(
      'Online payment is not fully configured yet.\n\n' +
      'Add your Razorpay Key ID (rzp_live_... or rzp_test_...) in config so customers pay exactly ₹' +
      premiumPriceRupees() + ' — no manual amount entry.\n\n' +
      'Get keys: dashboard.razorpay.com → Settings → API Keys'
    );
  }

  async function buyPremium(user, saveUserFn, onComplete) {
    if (!user) {
      onComplete?.(false);
      return;
    }

    if (!isEnabled()) {
      if (window.APP_CONFIG?.razorpayPaymentLink?.includes('razorpay.me/@')) {
        paymentSetupError();
        onComplete?.(false);
        return;
      }
      unlockPremium(user);
      saveUserFn();
      onComplete?.(true, 'demo');
      return;
    }

    try {
      if (hasCheckoutKey()) {
        openCheckout(user, (response) => {
          unlockPremium(user, response.razorpay_payment_id);
          saveUserFn();
          onComplete?.(true, 'paid');
        });
        return;
      }

      if (hasPaymentLink()) {
        const confirmed = openFixedPaymentLink(user);
        if (confirmed) {
          unlockPremium(user, 'link_' + Date.now());
          saveUserFn();
          onComplete?.(true, 'link');
        } else {
          onComplete?.(false);
        }
      }
    } catch (e) {
      alert('Could not start payment: ' + e.message);
      onComplete?.(false);
    }
  }

  function payButtonLabel() {
    if (hasCheckoutKey() || hasPaymentLink()) {
      return `Pay ₹${premiumPriceRupees()}/month`;
    }
    return `Unlock — ₹${premiumPriceRupees()}/month`;
  }

  return {
    isEnabled,
    isPremium,
    buyPremium,
    unlockPremium,
    hasPaymentLink,
    hasCheckoutKey,
    premiumPriceRupees,
    payButtonLabel,
    paymentSetupError
  };
})();

if (typeof window !== 'undefined') window.Payments = Payments;
