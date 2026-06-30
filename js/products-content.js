/**
 * MarketMind Labs product portfolio
 */
const ProductsContent = (() => {
  const PRODUCTS = [
    {
      id: 'english',
      name: 'English in 100 Days',
      tagline: 'Spoken English for Indian learners',
      url: 'https://englishlearner.store/',
      icon: '🇬🇧',
      description: 'Learn English the natural way — listen first, speak daily, and pick up grammar as you go. Built for job seekers, students, and homemakers who want confident spoken English in just 5 minutes a day, with Hindi support, AI speaking practice, and job interview scenarios.',
      highlights: ['5 min/day · 100-day program', '3-day free trial', 'Hindi to English · AI speaking'],
      cta: 'Start free trial',
      internal: true
    },
    {
      id: 'workpilot',
      name: 'WorkPilot Tools',
      tagline: '67+ free online tools in your browser',
      url: 'https://workpilottools.biz/',
      icon: '🛠️',
      description: 'Convert, compress, create, and edit files directly in your browser — no installs required. WorkPilot groups PDF, AI, image, audio, video, business, pregnancy, and baby & parenting tools in one place, plus practical how-to guides. Also home to BizBuilt AI — an SME operating system with CRM, HR, payroll, invoices, and more.',
      highlights: ['PDF · AI · image tools', 'Business & parenting calculators', 'BizBuilt AI for SMEs'],
      cta: 'Visit WorkPilot',
      internal: false
    },
    {
      id: 'logictrade',
      name: 'LogicTrade',
      tagline: 'Probability & market structure for traders',
      url: 'https://logictrade.site/',
      icon: '📈',
      description: 'India\'s probability and market structure analysis platform for retail traders. Trade NIFTY, BANKNIFTY, and SENSEX with data — not emotions. Includes probability models, GANN intelligence, master candle detection, support & resistance engine, and daily AI market outlook.',
      highlights: ['NIFTY · BANKNIFTY analysis', 'GANN & probability models', '10+ trading modules'],
      cta: 'Explore LogicTrade',
      internal: false
    }
  ];

  function renderCard(p, opts = {}) {
    const link = p.internal
      ? `<button type="button" onclick="showView('auth')" class="inline-block bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700">${p.cta}</button>`
      : `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-block bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700">${p.cta} →</a>`;
    const homeLink = p.internal
      ? `<button type="button" onclick="showView('landing')" class="text-brand-600 text-sm font-medium hover:underline">englishlearner.store</button>`
      : `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-brand-600 text-sm font-medium hover:underline">${p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>`;
    return `
      <article class="bg-white border rounded-2xl p-6 card-hover flex flex-col h-full">
        <div class="flex items-start gap-4 mb-4">
          <span class="text-3xl" aria-hidden="true">${p.icon}</span>
          <div>
            <h2 class="text-xl font-bold text-slate-900">${p.name}</h2>
            <p class="text-sm text-brand-600 font-medium">${p.tagline}</p>
            <p class="text-xs text-slate-400 mt-1">${homeLink}</p>
          </div>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed flex-1 mb-4">${p.description}</p>
        <ul class="flex flex-wrap gap-2 mb-5">
          ${p.highlights.map((h) => `<li class="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">${h}</li>`).join('')}
        </ul>
        ${link}
      </article>`;
  }

  function renderPage() {
    return `
      <div class="grid md:grid-cols-1 gap-6">
        ${PRODUCTS.map((p) => renderCard(p)).join('')}
      </div>
      <p class="mt-10 text-center text-sm text-slate-500">
        All products by <strong>MarketMind Labs</strong> ·
        <button type="button" onclick="showView('about')" class="text-brand-600 hover:underline">About us</button> ·
        <button type="button" onclick="showView('contact')" class="text-brand-600 hover:underline">Contact</button>
      </p>`;
  }

  function renderStaticCards() {
    return PRODUCTS.map((p) => {
      const domain = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const cta = p.internal
        ? `<a href="index.html#auth" class="inline-block bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700">${p.cta}</a>`
        : `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="inline-block bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700">${p.cta} →</a>`;
      return `
        <article class="bg-white border rounded-2xl p-6 card-hover">
          <div class="flex items-start gap-4 mb-4">
            <span class="text-3xl">${p.icon}</span>
            <div>
              <h2 class="text-xl font-bold">${p.name}</h2>
              <p class="text-sm text-brand-600 font-medium">${p.tagline}</p>
              <p class="text-xs text-slate-400 mt-1">${domain}</p>
            </div>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">${p.description}</p>
          <ul class="flex flex-wrap gap-2 mb-5">
            ${p.highlights.map((h) => `<li class="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">${h}</li>`).join('')}
          </ul>
          ${cta}
        </article>`;
    }).join('');
  }

  return { PRODUCTS, renderPage, renderStaticCards, renderCard };
})();

if (typeof window !== 'undefined') window.ProductsContent = ProductsContent;
