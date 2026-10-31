/* Visitor counter in the footer, using Vercount (busuanzi-compatible, no account;
   https://github.com/EvanNotFound/vercount). The theme's own counter line only
   exists when its busuanzi plugin is on, so this script adds the line itself.
   It shows "…" while loading and hides the line if no numbers arrive within
   8 seconds. The theme navigates with Pjax, which keeps the footer, so the
   counter script is loaded again after each Pjax page change. */
hexo.extend.injector.register('body_end', `<script>
(function () {
  var SRC = 'https://events.vercount.one/js';
  function ensureLine() {
    var line = document.getElementById('visitor-counter');
    if (line) return line;
    var anchor = document.getElementById('statistic-times');
    if (!anchor || !anchor.parentNode) return null;
    line = document.createElement('div');
    line.id = 'visitor-counter';
    line.className = 'size-small';
    line.innerHTML = 'Visitors: <strong><span id="vercount_value_site_uv">\u2026</span></strong> \u00b7 Page views: <strong><span id="vercount_value_site_pv">\u2026</span></strong>';
    anchor.parentNode.insertAdjacentElement('afterend', line);
    return line;
  }
  function count() {
    var line = ensureLine();
    if (!line) return;
    line.style.display = '';
    var s = document.createElement('script');
    s.src = SRC;
    s.defer = true;
    document.body.appendChild(s);
    setTimeout(function () {
      var uv = document.getElementById('vercount_value_site_uv');
      if (uv && uv.textContent.trim() === '\u2026') line.style.display = 'none';
    }, 8000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', count); else count();
  document.addEventListener('pjax:complete', count);
})();
</script>`);
