(function () {
  var CONSENT_KEY = 'teotl-cookie-consent';
  var GA_ID = 'G-FHLXQK0F8D';
  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';

  var STRINGS = {
    es: {
      text: 'Usamos cookies de Google Analytics para entender cómo se usa este sitio. Puedes aceptarlas o rechazarlas.',
      more: 'Más información',
      accept: 'Aceptar',
      decline: 'Rechazar'
    },
    en: {
      text: 'We use Google Analytics cookies to understand how this site is used. You can accept or decline them.',
      more: 'Learn more',
      accept: 'Accept',
      decline: 'Decline'
    }
  }[lang];

  function loadAnalytics() {
    if (document.getElementById('ga-script')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', lang === 'en' ? 'Cookie notice' : 'Aviso de cookies');
    banner.innerHTML =
      '<p>' + STRINGS.text + ' <a href="aviso-privacidad.html">' + STRINGS.more + '</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-decline">' + STRINGS.decline + '</button>' +
      '<button type="button" class="cookie-accept button">' + STRINGS.accept + '</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (e) {}
      loadAnalytics();
      banner.remove();
    });
    banner.querySelector('.cookie-decline').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'declined'); } catch (e) {}
      banner.remove();
    });
  }

  var stored = null;
  try { stored = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (stored === 'accepted') {
    loadAnalytics();
  } else if (stored !== 'declined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
