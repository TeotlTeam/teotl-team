const whatsapp = '5215577858914';
const message = 'Hola, mi nombre es:\ny me interesa un plan integral con Teotl Team.';

document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
});

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');

const setMenu = (isOpen) => {
  menu?.classList.toggle('open', isOpen);
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
};

menuButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  setMenu(!menu.classList.contains('open'));
});

document.querySelectorAll('#menu a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('click', (event) => {
  if (menu?.classList.contains('open') && !menu.contains(event.target) && event.target !== menuButton) {
    setMenu(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) {
    setMenu(false);
    menuButton?.focus();
  }
});

if (header) {
  const toggleScrolled = () => header.classList.toggle('scrolled', scrollY > 10);
  toggleScrolled();
  addEventListener('scroll', toggleScrolled, { passive: true });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const topButton = document.querySelector('.top');
if (topButton) {
  addEventListener('scroll', () => topButton.classList.toggle('show', scrollY > 650), { passive: true });
  topButton.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

document.querySelectorAll('.product-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.product-track');
  const slides = [...track.children];
  const previews = [...carousel.querySelectorAll('.product-preview')];
  const previous = carousel.querySelector('.product-prev');
  const next = carousel.querySelector('.product-next');
  let index = 0;
  let timer;

  const goTo = (nextIndex, smooth = true) => {
    index = (nextIndex + slides.length) % slides.length;
    track.scrollTo({ left: slides[index].offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
    previews.forEach((preview, position) => preview.classList.toggle('active', position === index));
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 4500);
  };

  previous.addEventListener('click', () => { goTo(index - 1); restart(); });
  next.addEventListener('click', () => { goTo(index + 1); restart(); });
  previews.forEach((preview) => preview.addEventListener('click', () => { goTo(Number(preview.dataset.index)); restart(); }));
  track.addEventListener('scrollend', () => {
    index = Math.round(track.scrollLeft / track.clientWidth);
    previews.forEach((preview, position) => preview.classList.toggle('active', position === index));
  });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  restart();
});

/* Analytics */
function trackEvent(name, parameters = {}) {
  if (typeof gtag === 'function') {
    gtag('event', name, parameters);
  }
}

/* WhatsApp */
document.querySelectorAll('[data-wa]').forEach((link) => {
  link.addEventListener('click', () => {
    trackEvent('generate_lead', {
      lead_source: 'whatsapp',
      link_text: link.textContent.trim()
    });
  });
});

/* Agenda de Cal.com */
document.querySelectorAll('a[href*="cal.com"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackEvent('generate_lead', {
      lead_source: 'cal_com',
      link_text: link.textContent.trim()
    });
  });
});

/* Google Maps */
document.querySelectorAll('a[href*="google.com/maps"], a[href*="share.google"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackEvent('click_maps', {
      link_text: link.textContent.trim()
    });
  });
});

/* Redes sociales */
document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => {
  link.addEventListener('click', () => trackEvent('click_instagram'));
});

document.querySelectorAll('a[href*="facebook.com"]').forEach((link) => {
  link.addEventListener('click', () => trackEvent('click_facebook'));
});

document.querySelectorAll('a[href*="tiktok.com"]').forEach((link) => {
  link.addEventListener('click', () => trackEvent('click_tiktok'));
});
