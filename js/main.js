// ---------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------------------------------------------------------------
// Scroll-thread signature: a left-edge progress rail that fills and
// carries a traveler dot as the visitor scrolls down the page.
// ---------------------------------------------------------------
const threadFill = document.querySelector('.thread-fill');
const threadDot = document.querySelector('.thread-dot');

function updateThread() {
  if (!threadFill) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
  threadFill.style.height = pct + '%';
  if (threadDot) threadDot.style.top = pct + '%';
}
document.addEventListener('scroll', updateThread, { passive: true });
window.addEventListener('resize', updateThread);
updateThread();

// ---------------------------------------------------------------
// Reveal-on-scroll for cards/sections
// ---------------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
