const instagram = document.querySelector('#instagram');
const blobWrapper = document.querySelector('#blobWrapper');
const avatar = document.querySelector('#avatar');
const hamburger = document.querySelector('#hamburger');
const menuPanel = document.querySelector('#menuPanel');
const menuLinks = menuPanel ? menuPanel.querySelectorAll('a') : [];
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupAnimations() {
  const { gsap, ScrollTrigger } = window;

  if (!gsap || !instagram || !blobWrapper || !avatar) return;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const reducedMotion = reducedMotionQuery.matches;

  gsap.from([blobWrapper, instagram, avatar], {
    y: reducedMotion ? 0 : 20,
    autoAlpha: 0,
    duration: reducedMotion ? 0.01 : 0.7,
    stagger: reducedMotion ? 0 : 0.08,
    ease: 'power2.out',
    overwrite: 'auto'
  });

  if (!reducedMotion && ScrollTrigger) {
    const exitTimeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '#next',
        start: 'top 88%',
        end: 'top 42%',
        scrub: 0.5,
        fastScrollEnd: true,
        invalidateOnRefresh: true
      }
    });

    exitTimeline
      .to(
        instagram,
        {
          xPercent: 130,
          autoAlpha: 0,
          force3D: true
        },
        0
      )
      .to(
        blobWrapper,
        {
          xPercent: -70,
          autoAlpha: 0,
          force3D: true
        },
        0
      )
      .to(
        avatar,
        {
          yPercent: -100,
          autoAlpha: 0,
          force3D: true
        },
        0
      );
  }
}

function toggleMenu(forceOpen) {
  if (!hamburger || !menuPanel) return;

  const panelOpen = menuPanel.classList.contains('is-open');
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !panelOpen;

  menuPanel.classList.toggle('is-open', shouldOpen);
  hamburger.setAttribute('aria-expanded', String(shouldOpen));
  menuPanel.setAttribute('aria-hidden', String(!shouldOpen));
}

if (hamburger && menuPanel) {
  hamburger.addEventListener('click', () => toggleMenu());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAnimations, { once: true });
} else {
  setupAnimations();
}
