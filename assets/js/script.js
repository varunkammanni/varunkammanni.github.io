document.addEventListener('DOMContentLoaded', () => {
  // Fade in body on load
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)';
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 50);

  // Navigation with fade out
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').startsWith('#') 
        ? link.getAttribute('href').substring(1)
        : link.getAttribute('href');
      if (targetId.includes('.html') || targetId === '/') {
        document.body.style.opacity = 1;
        document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)';
        document.body.style.opacity = 0;
        setTimeout(() => {
          window.location.href = targetId === '/' ? '/' : targetId;
        }, 400);
      } else {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Ripple effect for buttons and links
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    button.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 600);
  }

  const rippleTargets = document.querySelectorAll('a[href], button');
  rippleTargets.forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', createRipple);
  });
});

// Ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  background: rgba(30, 64, 175, 0.18);
  pointer-events: none;
  z-index: 10;
}
@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}`;
document.head.appendChild(rippleStyle);