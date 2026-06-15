/**
 * Razorpay checkout for Premium subscription (₹99/month)
 */
const Payments = (() => {
  const PREMIUM_AMOUNT = () => window.APP_CONFIG?.premiumAmount || 9900;

  function isEnabled() {
    const c = window.APP_CONFIG;
    return c?.razorpayEnabled && c?.razorpayKeyId && typeof Razorpay !== 'undefined';
  }

  function isPremium(user) {
    if (!user) return false;
    if (user.plan === 'premium') {
      if (user.premiumExpiresAt) {
        return new Date(user.premiumExpiresAt) > new Date();
      }
      return true;
    }
    return false;
  }

  async function createOrder(user) {
    // Use Cloud Function when Firebase is enabled
    if (window.FirebaseApp?.ready && window.FirebaseApp.auth?.currentUser) {
      try {
        const data = await window.FirebaseApp.callFunction('createRazorpayOrder', {
          amount: PREMIUM_AMOUNT(),
          currency: 'INR',
          plan: 'premium_monthly'
        });
        return data;
      } catch (e) {
        console.warn('Cloud Function order failed, using client-only mode:', e.message);
      }
    }

    // Fallback: client-only test checkout (Razorpay test mode)
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
      description: cfg.premiumDescription || 'Premium Monthly',
      image: 'https://em-content.zobj.net/source/twitter/376/flag-united-kingdom_1f1ec-1f1e7.png',
      order_id: orderData.orderId || undefined,
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
        contact: user?.phone || ''
      },
      notes: {
        userId: user?.uid || 'local',
        plan: 'premium_monthly'
      },
      theme: { color: '#2563eb' },
      handler: function (response) {
        onSuccess(response);
      },
      modal: {
        ondismiss: function () {
          console.log('Payment cancelled');
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (resp) {
      alert('Payment failed: ' + (resp.error?.description || 'Please try again.'));
    });
    rzp.open();
  }

  async function buyPremium(user, saveUserFn, onComplete) {
    if (!isEnabled()) {
      // Demo mode when Razorpay not configured
      if (user) {
        user.plan = 'premium';
        user.premiumExpiresAt = new Date(Date.now() + 30 * 86400000).toISOString();
        saveUserFn();
      }
      onComplete?.(true, 'demo');
      return;
    }

    try {
      const order = await createOrder(user);
      openCheckout(order, user, async (response) => {
        if (user) {
          user.plan = 'premium';
          user.premiumExpiresAt = new Date(Date.now() + 30 * 86400000).toISOString();
          user.razorpayPaymentId = response.razorpay_payment_id;
          saveUserFn();

          // Verify on server if Firebase available
          if (window.FirebaseApp?.ready && user.uid) {
            try {
              await window.FirebaseApp.callFunction('verifyRazorpayPayment', {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              });
            } catch (e) {
              console.warn('Payment verification pending:', e.message);
            }
          }
        }
        onComplete?.(true, 'paid');
      });
    } catch (e) {
      alert('Could not start payment: ' + e.message);
      onComplete?.(false);
    }
  }

  return { isEnabled, isPremium, buyPremium, createOrder };
})();

if (typeof window !== 'undefined') window.Payments = Payments;
