export default function() {
  if (!('IntersectionObserver' in window)) return;

  const revealItems = [
    ['.section-title', 'bottom', 100],
    ['.about-wrapper__image', 'left', 150],
    ['.about-wrapper__info', 'right', 300],
    ['.project-wrapper__text', 'left', 150],
    ['.project-wrapper__image', 'right', 300]
  ];

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  revealItems.forEach(([selector, origin, delay]) => {
    document.querySelectorAll(selector).forEach(element => {
      element.classList.add('reveal', `reveal-${origin}`);
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      observer.observe(element);
    });
  });
}
