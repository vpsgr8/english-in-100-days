/**
 * Google AdSense — auto ads + optional banner units (hidden for premium users).
 */
const AdSense = (() => {
  let scriptLoaded = false;

  function clientId() {
    return (window.APP_CONFIG?.adsenseClientId || '').trim();
  }

  function bannerSlot() {
    return (window.APP_CONFIG?.adsenseBannerSlot || '').trim();
  }

  function isConfigured() {
    return /^ca-pub-\d+$/i.test(clientId());
  }

  function isEnabled() {
    return window.APP_CONFIG?.adsenseEnabled !== false && isConfigured();
  }

  function shouldShow() {
    if (!isEnabled()) return false;
    if (window.GuestAccess?.isPaid?.(window.user)) return false;
    return true;
  }

  function loadScript() {
    if (scriptLoaded || !isEnabled()) return;
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      scriptLoaded = true;
    }
  }

  function prepareUnits() {
    const id = clientId();
    const slot = bannerSlot();
    document.querySelectorAll('ins.adsbygoogle').forEach((ins) => {
      ins.setAttribute('data-ad-client', id);
      if (slot) ins.setAttribute('data-ad-slot', slot);
    });
  }

  function pushUnit(ins) {
    if (!ins || ins.dataset.adPushed === '1') return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      ins.dataset.adPushed = '1';
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }

  function refreshForView(viewId) {
    if (!isEnabled()) return;

    const show = shouldShow();
    const noAds = new Set(['lesson', 'auth']);

    document.querySelectorAll('.ad-slot').forEach((slot) => {
      const views = (slot.dataset.adViews || '').split(',').map((v) => v.trim());
      const visible = show && !noAds.has(viewId) && views.includes(viewId);
      slot.classList.toggle('hidden', !visible);
      if (visible) {
        const ins = slot.querySelector('ins.adsbygoogle');
        if (ins && bannerSlot()) pushUnit(ins);
      }
    });
  }

  function init() {
    if (!isEnabled()) return;
    prepareUnits();
    loadScript();
  }

  return { init, refreshForView, shouldShow, isEnabled, clientId };
})();

if (typeof window !== 'undefined') window.AdSense = AdSense;
