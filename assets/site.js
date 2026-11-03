// Shared behaviour for IMEMA pages: reveal-on-scroll, header state, scroll indicator.
(function () {
  // Reveal elements as they enter the viewport (fade + rise), like the original site.
  var els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity .7s ease, transform .7s ease'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Home page header: transparent over the hero, solid once scrolled.
  var header = document.querySelector('header[data-solid-on-scroll]');
  if (header) {
    var solid = ['bg-background/85', 'backdrop-blur-md', 'border-b', 'border-border'];
    var update = function () {
      var on = window.scrollY > 40;
      solid.forEach(function (c) { header.classList.toggle(c, on); });
      header.classList.toggle('bg-transparent', !on);
    };
    addEventListener('scroll', update, { passive: true }); update();
  }

  // Scroll indicator line bobbing.
  var bob = document.querySelector('[data-bob]');
  if (bob) {
    var t = 0;
    (function loop() { t += 0.05; bob.style.transform = 'translateY(' + (Math.sin(t) * 6).toFixed(2) + 'px)'; requestAnimationFrame(loop); })();
  }
})();

// Show the page once Tailwind has generated its styles.
requestAnimationFrame(function () { requestAnimationFrame(function () { document.documentElement.classList.add('tw-ready'); }); });
