document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').startsWith('#') 
        ? link.getAttribute('href').substring(1)
        : link.getAttribute('href');
      if (targetId.includes('.html') || targetId === '/') {
        window.location.href = targetId === '/' ? '/' : targetId;
      } else {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});