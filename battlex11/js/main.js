// ============================================================
// BATTLEX11 – MAIN JAVASCRIPT
// ============================================================

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal, .feature-card, .step-card, .content-block, .step-mini, .value-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = i % 4;
  revealObserver.observe(el);
});

/* ---- Hero particles ---- */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(14,165,233,${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleDrift ${Math.random() * 8 + 6}s ease-in-out infinite alternate;
      animation-delay: ${Math.random() * 4}s;
    `;
    particleContainer.appendChild(dot);
  }
  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleDrift {
      0%   { transform: translate(0,0) scale(1); opacity: 0.4; }
      100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*30+10)}px, -${Math.floor(Math.random()*40+20)}px) scale(1.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const success = document.getElementById('formSuccess');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    setTimeout(() => {
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span>';
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1500);
  });
}

/* ---- Active nav link ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
