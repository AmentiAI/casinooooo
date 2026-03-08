/* =====================================================
   WINNA CASINO AFFILIATE — SCRIPT 2026
   ===================================================== */

const WINNA_URL = 'https://winna.com/?r=Amen_scented28';

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const floatingCta = document.getElementById('floatingCta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    if (floatingCta) floatingCta.style.display = 'flex';
  } else {
    navbar.classList.remove('scrolled');
    if (floatingCta) floatingCta.style.display = 'none';
  }
}, { passive: true });

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsEl = document.getElementById('carouselDots');
const slides = track ? [...track.querySelectorAll('.carousel-slide')] : [];
let cur = 0, autoTimer;

if (slides.length) {
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => { go(i); resetAuto(); };
    dotsEl.appendChild(d);
  });

  function go(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }
  function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => go(cur + 1), 5500); }

  prevBtn.onclick = () => { go(cur - 1); resetAuto(); };
  nextBtn.onclick = () => { go(cur + 1); resetAuto(); };
  resetAuto();

  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { dx > 0 ? go(cur + 1) : go(cur - 1); resetAuto(); }
  });
}

// ===== FAQ =====
function toggleFaq(el) {
  const open = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!open) el.classList.add('open');
}

// ===== TICKER DUPLICATE =====
const ticker = document.getElementById('tickerTrack');
if (ticker) ticker.innerHTML += ticker.innerHTML;

// ===== PARTICLES =====
function spawnParticles(containerId, count = 18) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const colors = ['rgba(245,197,24,0.55)', 'rgba(168,85,247,0.5)', 'rgba(14,165,233,0.5)', 'rgba(34,197,94,0.4)', 'rgba(239,68,68,0.4)'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;background:${colors[i % colors.length]};left:${Math.random() * 100}%;bottom:0;animation-duration:${Math.random() * 14 + 10}s;animation-delay:${Math.random() * 10}s;box-shadow:0 0 ${size * 3}px ${colors[i % colors.length]};`;
    c.appendChild(p);
  }
}
spawnParticles('particles', 22);
spawnParticles('fcaParticles', 16);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const format = n => n >= 1000 ? n.toLocaleString('en-US') : n;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = format(Math.round(ease * target));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ===== JACKPOT LIVE TICKER =====
let jackpot = 4200000;
function tickJackpot() {
  jackpot += Math.floor(Math.random() * 600 + 150);
  const fmt = jackpot.toLocaleString('en-US');
  ['jackpotAmt', 'moolahAmt'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '$' + fmt;
  });
}
setInterval(tickJackpot, 2200);

// ===== SCROLL REVEAL =====
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Trigger stat counters
      e.target.querySelectorAll && e.target.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.bp-card, .op-card, .game-card, .live-card, .faq-item, .pay-card, .step, .score-bar-row').forEach(el => {
  el.classList.add('reveal');
  ro.observe(el);
});

// Observe showcase for stat animation
const showcase = document.querySelector('.winna-showcase');
if (showcase) {
  const so = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
      so.disconnect();
    }
  }, { threshold: 0.3 });
  so.observe(showcase);
}

// ===== WIN TOASTS =====
const wins = [
  { name: 'CryptoKing_', msg: 'just caught a Winna Rain drop!' },
  { name: 'BTCwinner', msg: 'earned instant rakeback on Winna!' },
  { name: 'Lucky7', msg: 'won big on Crash at Winna Originals!' },
  { name: 'SilverFox', msg: 'hit a massive Plinko multiplier at Winna!' },
  { name: 'NightOwl', msg: 'won on Book of Dead at Winna!' },
  { name: 'Vegas_Vince', msg: 'transferred VIP & got $18,000 at Winna!' },
  { name: 'SpinQueen', msg: 'just joined Winna — no KYC, instant access!' },
  { name: 'DiamondHands', msg: 'withdrew crypto instantly from Winna!' },
  { name: 'PlinkoKing', msg: 'caught the Winna Rain crypto drop!' },
  { name: 'SolanaGuy', msg: 'deposited SOL and playing Mines at Winna!' },
];
const toast = document.getElementById('winToast');
let ti = 0, toastTimer;

function showToast() {
  if (!toast) return;
  const w = wins[ti++ % wins.length];
  document.getElementById('toastName').textContent = w.name;
  document.getElementById('toastMsg').textContent = w.msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(showToast, Math.random() * 9000 + 7000);
  }, 4500);
}
function closeToast() {
  clearTimeout(toastTimer);
  toast.classList.remove('show');
  setTimeout(showToast, Math.random() * 9000 + 7000);
}

setTimeout(showToast, 3500);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - (navbar.offsetHeight + 20), behavior: 'smooth' });
    }
  });
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let active = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 200) active = s.id; });
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${active}` ? 'var(--gold)' : '';
  });
}, { passive: true });

// ===== NEWSLETTER =====
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const inp = e.target.querySelector('input');
  btn.innerHTML = '<i class="fas fa-check"></i> You\'re subscribed!';
  btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
  btn.disabled = true;
  inp.value = '';
  setTimeout(() => { btn.innerHTML = '<i class="fas fa-bell"></i> Get Alerts'; btn.style.background = ''; btn.disabled = false; }, 4000);
}

// ===== AFFILIATE CLICK TRACKING =====
document.querySelectorAll(`a[href*="winna.com"]`).forEach(a => {
  a.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'affiliate_click', { event_category: 'winna', event_label: a.textContent.trim().slice(0, 60) });
    }
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('trackCustom', 'AffiliateClick', { casino: 'winna', label: a.textContent.trim().slice(0, 60) });
    }
  });
});

console.log('%c🎰 Winna Casino — Powered by WinnaReview 2026', 'color:#f5c518;font-size:16px;font-weight:bold');
