/**
 * Amazon Associates — affiliate links (amazon.in)
 */
const AmazonAffiliate = (() => {
  const tag = () => (window.APP_CONFIG?.amazonAffiliateTag || '').trim();
  const domain = () => window.APP_CONFIG?.amazonDomain || 'amazon.in';

  function isEnabled() {
    return Boolean(tag());
  }

  function url(path, params = {}) {
    if (!isEnabled()) return `https://www.${domain()}`;
    const base = `https://www.${domain()}${path.startsWith('/') ? path : '/' + path}`;
    const u = new URL(base);
    u.searchParams.set('tag', tag());
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    return u.toString();
  }

  function search(keywords) {
    return url('/s', { k: keywords });
  }

  const PICKS = [
    { emoji: '📘', title: 'Spoken English Books', keywords: 'spoken english book for beginners india' },
    { emoji: '📖', title: 'English Grammar', keywords: 'english grammar book hindi medium' },
    { emoji: '💼', title: 'Interview English', keywords: 'job interview english book india' },
    { emoji: '🎧', title: 'Listening Practice', keywords: 'english listening practice book' }
  ];

  function renderDashboardCard() {
    if (!isEnabled()) return '';
    const links = PICKS.map((p) => `
      <a href="${search(p.keywords)}" target="_blank" rel="noopener sponsored"
         class="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 hover:border-orange-300 hover:bg-orange-50 transition text-sm">
        <span class="text-xl">${p.emoji}</span>
        <span class="font-medium text-slate-800">${p.title}</span>
        <span class="ml-auto text-orange-600 text-xs">Amazon →</span>
      </a>`).join('');

    return `
      <div class="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 mb-6">
        <h3 class="font-semibold text-orange-900 mb-1">📚 Recommended on Amazon</h3>
        <p class="text-xs text-orange-800/80 mb-4">Extra books &amp; tools to boost your English (affiliate links — we may earn a small commission at no extra cost to you).</p>
        <div class="space-y-2">${links}</div>
      </div>`;
  }

  function renderFooterNote() {
    if (!isEnabled()) return '';
    return `<p class="text-xs text-slate-400 mt-6 text-center">Some links are Amazon affiliate links (tag: ${tag()}).</p>`;
  }

  return { isEnabled, url, search, renderDashboardCard, renderFooterNote, PICKS };
})();

if (typeof window !== 'undefined') window.AmazonAffiliate = AmazonAffiliate;
