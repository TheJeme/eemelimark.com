import initSr from './js/sr';
import './style/main.scss';
import resumePdf from './assets/Resume.pdf';

const resumeLink = document.getElementById('resume-link');
if (resumeLink) {
  resumeLink.href = resumePdf;
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
});

document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.rel = 'noopener noreferrer';
});

document.querySelectorAll('.project-wrapper .row').forEach(project => {
  const title = project.querySelector('.project-wrapper__text-title');
  const viewLink = project.querySelector('.project-wrapper__text .cta-btn');
  const image = project.querySelector('.project-wrapper__image img');

  if (title && viewLink) {
    viewLink.setAttribute('aria-label', `View ${title.textContent.trim()}`);
  }

  if (image) {
    image.loading = 'lazy';
    image.decoding = 'async';
  }
});

if (!prefersReducedMotion) {
  initSr();
}
