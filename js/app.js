const whatsapp = '5215577858914';
const message = 'Hola, mi nombre es:\ny me interesa un plan integral con Teotl Team.';

document.querySelectorAll('[data-wa]').forEach((link) => {
  link.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');
menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#menu a').forEach((link) => link.addEventListener('click', () => {
  menu?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

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
