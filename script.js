const sections = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
});
sections.forEach(s => observer.observe(s));
