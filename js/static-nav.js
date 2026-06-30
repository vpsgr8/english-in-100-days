/** Shared header HTML for static content pages */
function staticPageHeader(active) {
  const link = (href, label, key) => {
    const cls = active === key ? 'text-brand-600 font-semibold' : 'hover:text-brand-600';
    return `<a href="${href}" class="${cls}">${label}</a>`;
  };
  return `
<header class="bg-white border-b">
  <div class="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
    <a href="index.html" class="font-bold text-brand-700 text-lg">🇬🇧 English in 100 Days</a>
    <nav class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
      ${link('index.html', 'Home', 'home')}
      ${link('free-lesson.html', 'Free Lesson', 'lesson')}
      ${link('blog.html', 'Blog', 'blog')}
      ${link('about.html', 'About', 'about')}
      ${link('contact.html', 'Contact', 'contact')}
    </nav>
  </div>
</header>`;
}
