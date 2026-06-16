/**
 * Blog posts — English learning articles with internal links
 */
const BlogContent = (() => {
  const POSTS = [
    {
      slug: 'learn-spoken-english-100-days',
      title: 'How to Learn Spoken English in 100 Days',
      excerpt: 'A practical roadmap for Indian learners: listen, speak, understand, then grammar — 5 minutes a day.',
      date: '2026-06-10',
      keywords: 'learn spoken english 100 days, english course india, daily english habit',
      body: `
        <p>Most Indian learners fail at English because they start with grammar rules instead of <strong>speaking</strong>. Our method flips that: <em>Listen → Speak → Understand → Grammar</em>.</p>
        <h3 class="font-bold text-lg mt-6 mb-2">Why 100 days?</h3>
        <p>Research on habit formation shows that small daily practice beats weekend cramming. Five minutes every day for 100 days builds real spoken confidence — enough for jobs, travel, and daily life.</p>
        <h3 class="font-bold text-lg mt-6 mb-2">What to do each day</h3>
        <ul class="list-disc pl-5 space-y-2 text-slate-600">
          <li>Learn 5 new words with Hindi meaning</li>
          <li>Practice one sentence pattern aloud</li>
          <li>Role-play a real conversation</li>
          <li>Take a quick quiz to lock in progress</li>
        </ul>
        <p class="mt-6">Ready to start? <a href="index.html" class="text-brand-600 font-semibold hover:underline">Try English in 100 Days free for 3 days</a> — no grammar textbook required.</p>
        <p class="mt-4 text-sm text-slate-500">Related: <a href="blog/hindi-to-english-tips.html" class="text-brand-600 hover:underline">Hindi to English tips</a> · <a href="about.html" class="text-brand-600 hover:underline">About MarketMind Labs</a></p>`
    },
    {
      slug: 'hindi-to-english-tips',
      title: 'Hindi to English: 7 Tips That Actually Work',
      excerpt: 'Stop translating word-by-word. Learn how Indian speakers move from Hindi thinking to natural English.',
      date: '2026-06-08',
      keywords: 'hindi to english, learn english from hindi, indian english tips',
      body: `
        <p>If you think in Hindi and translate each word, your English will sound unnatural. Here are seven tips used by successful Indian English speakers:</p>
        <ol class="list-decimal pl-5 space-y-3 text-slate-600 mt-4">
          <li><strong>Learn phrases, not single words</strong> — "How are you?" is one unit, not three translations.</li>
          <li><strong>Speak aloud daily</strong> — even 2 minutes changes muscle memory.</li>
          <li><strong>Use our English Buddy</strong> — type Hindi, get natural English + pronunciation.</li>
          <li><strong>Watch your word order</strong> — English puts time words differently than Hindi.</li>
          <li><strong>Practice real situations</strong> — market, interview, airport — not random sentences.</li>
          <li><strong>Accept mistakes</strong> — fluency comes before perfection.</li>
          <li><strong>Stay consistent</strong> — 5 minutes daily beats 2 hours once a week.</li>
        </ol>
        <p class="mt-6"><a href="index.html" class="text-brand-600 font-semibold hover:underline">Start free trial →</a> · <a href="blog/job-interview-english-india.html" class="text-brand-600 hover:underline">Interview English guide</a></p>`
    },
    {
      slug: 'job-interview-english-india',
      title: 'English for Job Interviews in India',
      excerpt: 'Introduce yourself, answer "Tell me about yourself", and sound confident in Indian job interviews.',
      date: '2026-06-05',
      keywords: 'job interview english india, interview english speaking, introduce yourself english',
      body: `
        <p>Indian job interviews often start with: <em>"Tell me about yourself."</em> Here is a simple 60-second template:</p>
        <blockquote class="border-l-4 border-brand-500 pl-4 my-4 italic text-slate-700">"Good morning. My name is [Name]. I am from [City]. I have completed [degree/course] and I am passionate about [field]. I am a quick learner and I work well in teams. I am excited about this opportunity."</blockquote>
        <p>Practice this until it feels natural — not memorized. Use our <strong>AI Speaking Practice</strong> to get pronunciation scores.</p>
        <p class="mt-4">Also prepare answers for: strengths, weaknesses, why this company, and salary expectations — in simple English.</p>
        <p class="mt-6"><a href="index.html" class="text-brand-600 font-semibold hover:underline">Practice speaking in the app</a> · <a href="contact.html" class="text-brand-600 hover:underline">Contact us for schools</a></p>`
    },
    {
      slug: 'five-minute-english-habit',
      title: 'The 5-Minute Daily English Habit',
      excerpt: 'Why short daily sessions beat long study marathons for spoken English fluency.',
      date: '2026-06-01',
      keywords: 'daily english practice, 5 minute english, english habit india',
      body: `
        <p>Busy with work, college, or family? You do not need two hours a day. <strong>Five focused minutes</strong> is enough if you never skip.</p>
        <p>Each lesson in English in 100 Days is designed for one coffee break: new words, one sentence pattern, one conversation, one quiz. That is deliberate — your brain remembers better with spaced repetition.</p>
        <p>Track your streak on the dashboard. Learners who hit 30 days report much higher confidence in shops, offices, and phone calls.</p>
        <p class="mt-6"><a href="index.html" class="text-brand-600 font-semibold hover:underline">Begin Day 1 free</a> · <a href="blog/common-english-mistakes-indians.html" class="text-brand-600 hover:underline">Common mistakes to avoid</a></p>`
    },
    {
      slug: 'common-english-mistakes-indians',
      title: '10 Common English Mistakes Indians Make',
      excerpt: 'Fix these everyday errors to sound more natural in spoken English.',
      date: '2026-05-28',
      keywords: 'english mistakes indians, common english errors, indian english speaking',
      body: `
        <ul class="space-y-3 text-slate-600">
          <li>❌ "I am having a car" → ✅ "I have a car"</li>
          <li>❌ "Do one thing" → ✅ "Please do this" / "Here's what we can do"</li>
          <li>❌ "Myself [Name]" → ✅ "My name is [Name]"</li>
          <li>❌ "Out of station" → ✅ "Out of town" / "Away"</li>
          <li>❌ "Prepone" → ✅ "Reschedule earlier" (prepone is Indian English)</li>
          <li>❌ Silent letters skipped → ✅ Practice pronunciation with audio</li>
          <li>❌ Subject-verb mismatch → ✅ "He goes" not "He go"</li>
          <li>❌ Overusing "only" → ✅ Drop filler words</li>
          <li>❌ Direct Hindi idioms → ✅ Learn English idioms separately</li>
          <li>❌ Fear of speaking → ✅ Speak daily, mistakes are normal</li>
        </ul>
        <p class="mt-6"><a href="index.html" class="text-brand-600 font-semibold hover:underline">Learn correctly from Day 1</a> · <a href="blog.html" class="text-brand-600 hover:underline">More articles</a></p>`
    }
  ];

  function getPost(slug) {
    return POSTS.find((p) => p.slug === slug) || null;
  }

  function renderList() {
    return POSTS.map((p) => `
      <article class="bg-white border rounded-2xl p-6 card-hover">
        <time class="text-xs text-slate-400">${p.date}</time>
        <h2 class="text-xl font-bold mt-2 mb-2">
          <button type="button" onclick="openBlogPost('${p.slug}')" class="text-left hover:text-brand-600">${p.title}</button>
        </h2>
        <p class="text-slate-600 text-sm mb-4">${p.excerpt}</p>
        <button type="button" onclick="openBlogPost('${p.slug}')" class="text-brand-600 text-sm font-semibold hover:underline">Read more →</button>
        <a href="blog/${p.slug}.html" class="text-slate-400 text-xs ml-3 hover:underline">Permalink</a>
      </article>`).join('');
  }

  function renderPost(slug) {
    const p = getPost(slug);
    if (!p) return '<p class="text-slate-500">Article not found. <button onclick="showView(\'blog\')" class="text-brand-600">Back to blog</button></p>';
    return `
      <article class="prose prose-slate max-w-none">
        <time class="text-xs text-slate-400">${p.date}</time>
        <h1 class="text-3xl font-bold mt-2 mb-4">${p.title}</h1>
        <div class="text-slate-700 leading-relaxed space-y-4">${p.body}</div>
      </article>
      <div class="mt-8 flex flex-wrap gap-3 text-sm">
        <button onclick="showView('blog')" class="text-brand-600 hover:underline">← All articles</button>
        <button onclick="showView('auth')" class="bg-brand-600 text-white px-4 py-2 rounded-lg font-semibold">Start Free Trial</button>
        <a href="about.html" class="text-slate-600 hover:text-brand-600">About</a>
        <a href="contact.html" class="text-slate-600 hover:text-brand-600">Contact</a>
      </div>`;
  }

  return { POSTS, getPost, renderList, renderPost };
})();

if (typeof window !== 'undefined') window.BlogContent = BlogContent;
