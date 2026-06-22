export default function() {
  if (typeof window.ScrollReveal !== 'function') return;

  const reveal = window.ScrollReveal({ reset: false });
  const defaultProps = {
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    distance: '30px',
    duration: 600,
    desktop: true,
    mobile: true
  };

  /* Section Title */
  reveal.reveal('.section-title', {
    ...defaultProps,
    delay: 150,
    distance: '0px',
    origin: 'bottom'
  });

  /* Hero Section */
  reveal.reveal('.hero-title', {
    ...defaultProps,
    delay: 150,
    origin: window.innerWidth > 768 ? 'left' : 'bottom'
  });
  reveal.reveal('.hero-cta', {
    ...defaultProps,
    delay: 300,
    origin: window.innerWidth > 768 ? 'left' : 'bottom'
  });

  /* About Section */
  reveal.reveal('.about-wrapper__image', {
    ...defaultProps,
    delay: 150,
    origin: window.innerWidth > 768 ? 'left' : 'bottom'
  });
  reveal.reveal('.about-wrapper__info', {
    ...defaultProps,
    delay: 300,
    origin: window.innerWidth > 768 ? 'right' : 'bottom'
  });

  /* Projects Section */
  reveal.reveal('.project-wrapper__text', {
    ...defaultProps,
    delay: 150,
    origin: window.innerWidth > 768 ? 'left' : 'bottom'
  });
  reveal.reveal('.project-wrapper__image', {
    ...defaultProps,
    delay: 300,
    origin: window.innerWidth > 768 ? 'right' : 'bottom'
  });

  /* Contact Section */
  reveal.reveal('.contact-wrapper', {
    ...defaultProps,
    delay: 300,
    origin: 'bottom'
  });
}
