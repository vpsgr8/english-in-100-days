/** PWA install prompt + service worker registration */
const PWA = (() => {
  let deferredPrompt = null;

  function init() {
    if ('serviceWorker' in navigator) {
      const swUrl = (window.assetPath || (p => p))('sw.js');
      navigator.serviceWorker.register(swUrl).catch(console.warn);
    }

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      showInstallBanner();
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      hideInstallBanner();
    });

    handleDeepLink();
  }

  function showInstallBanner() {
    if (document.getElementById('pwaInstallBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3';
    banner.innerHTML = `
      <span class="text-2xl">📲</span>
      <div class="flex-1">
        <p class="font-semibold text-sm">Install App</p>
        <p class="text-xs text-slate-300">Add to home screen for daily reminders</p>
      </div>
      <button onclick="PWA.install()" class="bg-brand-500 hover:bg-brand-600 px-3 py-2 rounded-lg text-sm font-semibold shrink-0">Install</button>
      <button onclick="PWA.dismiss()" class="text-slate-400 hover:text-white text-lg shrink-0">×</button>`;
    document.body.appendChild(banner);
  }

  function hideInstallBanner() {
    document.getElementById('pwaInstallBanner')?.remove();
  }

  async function install() {
    if (!deferredPrompt) {
      alert('To install: tap browser menu → "Add to Home Screen" / "Install App"');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    hideInstallBanner();
  }

  function dismiss() {
    hideInstallBanner();
    localStorage.setItem('ei100d_pwa_dismissed', '1');
  }

  function handleDeepLink() {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (!action) return;
    setTimeout(() => {
      if (action === 'lesson' && typeof startLesson === 'function') startLesson();
      else if (action === 'buddy') showView?.('buddy');
      else if (action === 'auth') showView?.('auth');
      history.replaceState({}, '', location.pathname);
    }, 800);
  }

  function shareApp() {
    const text = 'Learn Spoken English in 100 Days — just 5 min/day! 🇬🇧🇮🇳';
    const url = location.origin + location.pathname;
    if (navigator.share) {
      navigator.share({ title: 'English in 100 Days', text, url });
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(wa, '_blank');
    }
  }

  return { init, install, dismiss, shareApp };
})();

if (typeof window !== 'undefined') window.PWA = PWA;
