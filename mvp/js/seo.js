/**
 * Site SEO, company info, and per-page meta updates
 */
const SiteSEO = (() => {
  const cfg = () => window.APP_CONFIG || {};
  const siteUrl = () => (cfg().siteUrl || 'https://englishlearner.store/').replace(/\/?$/, '/');

  const DEFAULT_KEYWORDS = [
    'learn english', 'spoken english', 'english for indians', 'hindi to english',
    'english speaking app india', 'learn english in 100 days', 'english course online india',
    'job interview english', 'english grammar hindi', 'spoken english course',
    'english learning app', 'MarketMind Labs', 'english practice daily'
  ].join(', ');

  const PAGES = {
    landing: {
      title: 'English in 100 Days — Learn Spoken English for Indians | MarketMind Labs',
      description: 'Learn spoken English in 100 days with 5 minutes daily. Hindi to English, AI speaking, job interview prep. 3-day free trial. By MarketMind Labs.',
      keywords: DEFAULT_KEYWORDS
    },
    about: {
      title: 'About Us — MarketMind Labs | English in 100 Days',
      description: 'MarketMind Labs builds practical English learning tools for Indian learners. Meet the team behind English in 100 Days.',
      keywords: 'MarketMind Labs, about english in 100 days, edtech india english'
    },
    contact: {
      title: 'Contact — MarketMind Labs | English in 100 Days',
      description: 'Contact MarketMind Labs for English in 100 Days support, schools, and partnerships. Email mml.products26@gmail.com',
      keywords: 'contact english course, MarketMind Labs contact, english app support india'
    },
    blog: {
      title: 'English Learning Blog — Tips for Indian Learners | MarketMind Labs',
      description: 'Free articles on spoken English, Hindi to English, job interviews, and daily practice habits for Indian learners.',
      keywords: 'english learning blog, spoken english tips india, hindi to english blog'
    },
    products: {
      title: 'Our Products — MarketMind Labs',
      description: 'Explore MarketMind Labs products: English in 100 Days, WorkPilot Tools (67+ free online tools), and LogicTrade (trading analysis for India).',
      keywords: 'MarketMind Labs products, workpilottools, logictrade, englishlearner.store'
    },
    auth: {
      title: 'Start Free Trial — English in 100 Days',
      description: 'Sign up with email and mobile. 3-day free trial, then continue learning English for ₹299/month.',
      keywords: 'free english trial, start learning english'
    }
  };

  function setMeta(name, content, attr = 'name') {
    if (!content) return;
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setCanonical(url) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }

  function updatePage(viewId, article) {
    const page = PAGES[viewId] || PAGES.landing;
    const title = article?.title ? `${article.title} | English Blog` : page.title;
    const desc = article?.excerpt || page.description;
    const kw = article?.keywords || page.keywords || DEFAULT_KEYWORDS;

    document.title = title;
    setMeta('description', desc);
    setMeta('keywords', kw);
    setMeta('og:title', title, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', desc);

    const path = article ? `blog/${article.slug}.html` : (viewId === 'landing' ? '' : `${viewId}.html`);
    setCanonical(siteUrl() + path);
  }

  function renderSiteFooter() {
    const email = cfg().contactEmail || 'mml.products26@gmail.com';
    const company = cfg().companyName || 'MarketMind Labs';
    return `
      <footer class="bg-slate-100 border-t py-10 mt-auto">
        <div class="max-w-5xl mx-auto px-4">
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
            <div>
              <p class="font-bold text-brand-700 mb-3">English in 100 Days</p>
              <p class="text-slate-500 text-xs">By ${company}. Practical spoken English for India.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Learn</p>
              <ul class="space-y-1 text-slate-600">
                <li><a href="index.html" class="hover:text-brand-600">Home</a></li>
                <li><a href="index.html#auth" class="hover:text-brand-600">Free Trial</a></li>
                <li><a href="blog.html" class="hover:text-brand-600">Blog</a></li>
                <li><a href="admin.html" class="hover:text-brand-600">Schools</a></li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Company</p>
              <ul class="space-y-1 text-slate-600">
                <li><a href="products.html" class="hover:text-brand-600">Our Products</a></li>
                <li><a href="about.html" class="hover:text-brand-600">About</a></li>
                <li><a href="contact.html" class="hover:text-brand-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Contact</p>
              <p class="text-slate-600 text-xs"><a href="mailto:${email}" class="text-brand-600 hover:underline">${email}</a></p>
              <p class="text-slate-500 text-xs mt-2">${company}</p>
            </div>
          </div>
          <p class="text-center text-xs text-slate-400">© 2026 ${company} • <a href="index.html" class="hover:text-brand-600">Home</a> · <a href="products.html">Products</a> · <a href="about.html">About</a> · <a href="blog.html">Blog</a> · <a href="contact.html">Contact</a></p>
          <div id="amazonFooterNote"></div>
        </div>
      </footer>`;
  }

  function injectOrgSchema() {
    if (document.getElementById('schema-org')) return;
    const script = document.createElement('script');
    script.id = 'schema-org';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: cfg().companyName || 'MarketMind Labs',
      url: siteUrl(),
      email: cfg().contactEmail || 'mml.products26@gmail.com',
      description: 'EdTech and productivity company building English in 100 Days, WorkPilot Tools, and LogicTrade for Indian users.'
    });
    document.head.appendChild(script);
  }

  function renderStaticFooter() {
    const email = cfg().contactEmail || 'mml.products26@gmail.com';
    const company = cfg().companyName || 'MarketMind Labs';
    return `
      <footer class="bg-slate-100 border-t py-10 mt-auto">
        <div class="max-w-5xl mx-auto px-4">
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
            <div>
              <p class="font-bold text-brand-700 mb-3">English in 100 Days</p>
              <p class="text-slate-500 text-xs">By ${company}. Practical spoken English for India.</p>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Learn</p>
              <ul class="space-y-1 text-slate-600">
                <li><a href="index.html" class="hover:text-brand-600">Home</a></li>
                <li><a href="index.html#auth" class="hover:text-brand-600">Free Trial</a></li>
                <li><a href="blog.html" class="hover:text-brand-600">Blog</a></li>
                <li><a href="admin.html" class="hover:text-brand-600">Schools</a></li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Company</p>
              <ul class="space-y-1 text-slate-600">
                <li><a href="products.html" class="hover:text-brand-600">Our Products</a></li>
                <li><a href="about.html" class="hover:text-brand-600">About</a></li>
                <li><a href="contact.html" class="hover:text-brand-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <p class="font-semibold text-slate-700 mb-2">Contact</p>
              <p class="text-slate-600 text-xs"><a href="mailto:${email}" class="text-brand-600 hover:underline">${email}</a></p>
              <p class="text-slate-500 text-xs mt-2">${company}</p>
            </div>
          </div>
          <p class="text-center text-xs text-slate-400">© 2026 ${company} • <a href="index.html" class="hover:text-brand-600">Home</a> · <a href="products.html">Products</a> · <a href="about.html">About</a> · <a href="blog.html">Blog</a> · <a href="contact.html">Contact</a></p>
        </div>
      </footer>`;
  }

  return { updatePage, renderSiteFooter, renderStaticFooter, injectOrgSchema, DEFAULT_KEYWORDS, siteUrl };
})();

if (typeof window !== 'undefined') window.SiteSEO = SiteSEO;
