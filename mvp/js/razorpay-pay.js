/**
 * Razorpay checkout — client-only (no Firebase backend)
 */
const Payments = (() => {
  const PREMIUM_AMOUNT = () => window.APP_CONFIG?.premiumAmount || 9900;

  function hasCheckoutKey() {
    const c = window.APP_CONFIG;
    return c?.razorpayEnabled && c?.razorpayKeyId && typeof Razorpay !== 'undefined';
  }

  function hasPaymentLink() {
    return Boolean(window.APP_CONFIG?.razorpayPaymentLink);
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

  function createOrder() {
    return {
      orderId: null,
      amount: PREMIUM_AMOUNT(),
      currency: 'INR',
      keyId: window.APP_CONFIG.razorpayKeyId
    };
  }

  function openCheckout(orderData, user, onSuccess) {
    const cfg = window.APP_CONFIG;
    const options = {
      key: orderData.keyId || cfg.razorpayKeyId,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: cfg.premiumPlanName || 'English in 100 Days',
      description: cfg.premiumDescription || 'Continue learning after free trial',
      order_id: orderData.orderId || undefined,
      prefill: { name: user?.name || '', email: user?.email || '' },
      notes: { email: user?.email || '', plan: 'premium_monthly' },
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

  function openPaymentLink(user) {
    const link = window.APP_CONFIG.razorpayPaymentLink;
    const url = new URL(link);
    if (user?.email) url.searchParams.set('email', user.email);
    window.open(url.toString(), '_blank', 'noopener');
    return confirm(
      'Complete ₹99 payment in the Razorpay window.\n\nAfter paying, click OK to unlock your account and continue learning.'
    );
  }

  async function buyPremium(user, saveUserFn, onComplete) {
    if (!user) {
      onComplete?.(false);
      return;
    }

    if (!isEnabled()) {
      unlockPremium(user);
      saveUserFn();
      onComplete?.(true, 'demo');
      return;
    }

    try {
      if (hasCheckoutKey()) {
        const order = createOrder();
        openCheckout(order, user, (response) => {
          unlockPremium(user, response.razorpay_payment_id);
          saveUserFn();
          onComplete?.(true, 'paid');
        });
        return;
      }

      if (hasPaymentLink()) {
        const confirmed = openPaymentLink(user);
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

  return { isEnabled, isPremium, buyPremium, unlockPremium, hasPaymentLink, hasCheckoutKey };
})();

if (typeof window !== 'undefined') window.Payments = Payments;
