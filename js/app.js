const whatsapp='5215577858914',message='Hola, mi nombre es: \ny me interesa un plan integral con Teotl Team.';document.querySelectorAll('[data-wa]').forEach(link=>link.href=`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`);const button=document.querySelector('.menu-button'),menu=document.querySelector('#menu');button?.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',open)});document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');button?.setAttribute('aria-expanded','false')}));document.querySelector('#year').textContent=new Date().getFullYear();const top=document.querySelector('.top');addEventListener('scroll',()=>top.classList.toggle('show',scrollY>650),{passive:true});top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

const slides = [...document.querySelectorAll('.shirt-slide')];
const previews = [...document.querySelectorAll('.shirt-preview')];
const previousButton = document.querySelector('.shirt-arrow.previous');
const nextButton = document.querySelector('.shirt-arrow.next');

let currentSlide = 0;
let carouselTimer;

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, position) => {
    slide.classList.toggle('active', position === currentSlide);
  });

  previews.forEach((preview, position) => {
    preview.classList.toggle('active', position === currentSlide);
  });
}

function startCarousel() {
  clearInterval(carouselTimer);

  carouselTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4000);
}

previews.forEach((preview) => {
  preview.addEventListener('click', () => {
    showSlide(Number(preview.dataset.slide));
    startCarousel();
  });
});

previousButton?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startCarousel();
});

nextButton?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  startCarousel();
});

startCarousel();
