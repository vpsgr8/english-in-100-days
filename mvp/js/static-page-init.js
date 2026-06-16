document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('siteFooter');
  if (footer && window.SiteSEO) footer.innerHTML = SiteSEO.renderStaticFooter();
  window.SiteSEO?.injectOrgSchema?.();
});
