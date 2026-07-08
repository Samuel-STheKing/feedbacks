document.addEventListener('DOMContentLoaded', () => {

  /* Menú móvil */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Barra de progreso de lectura */
  const progressFill = document.getElementById('progressFill');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* Sistema de Navegación Interna para la página menciones.html */
  const mencionButtons = document.querySelectorAll('.mencion-card-btn');
  const mencionesMenu = document.getElementById('mencionesMenu');
  const mencionesPagesContainer = document.getElementById('mencionesPagesContainer');
  const btnVolverMenciones = document.getElementById('btnVolverMenciones');
  const mencionPageViews = document.querySelectorAll('.mencion-page-view');

  // Solo se ejecuta si los elementos existen en el HTML actual (menciones.html)
  if (mencionButtons.length && mencionesMenu && mencionesPagesContainer && btnVolverMenciones) {
    
    mencionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        
        mencionPageViews.forEach(page => page.classList.remove('active-page'));
        
        const activePage = document.getElementById(targetId);
        if (activePage) {
          activePage.classList.add('active-page');
        }
        
        mencionesMenu.style.display = 'none';
        mencionesPagesContainer.removeAttribute('hidden');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    btnVolverMenciones.addEventListener('click', () => {
      mencionesPagesContainer.setAttribute('hidden', '');
      mencionesMenu.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Revelado suave con Intersection Observer */
  const revealTargets = document.querySelectorAll(
    '.mencion-card-btn, .g-item, .nosotros-copy, .nosotros-crest, .intro-cards-preview'
  );
  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealTargets.forEach(el => io.observe(el));
  }
});