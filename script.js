document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll('.hb');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percent = parseInt(circle.dataset.percentage);
        const progress = circle.querySelector('.progress');
        const percentageText = circle.querySelector('.percentage');
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        let offset = circumference - (percent / 100) * circumference;

        progress.style.strokeDashoffset = offset;

        let count = 0;
        let interval = setInterval(() => {
          if (count <= percent) {
            percentageText.textContent = count + '%';
            count++;
          } else {
            clearInterval(interval);
          }
        }, 20);

        observer.unobserve(circle); // solo una vez
      }
    });
  }, { threshold: 0.6 }); // cuando el 60% del círculo esté visible

  circles.forEach(circle => observer.observe(circle));
});
const menuTrigger = document.getElementById('menuTrigger');
  const sideNav = document.getElementById('sideNav');

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.tech-track');
  const content = track.innerHTML; // Guarda las palabras originales
  track.innerHTML += content; // Duplica el contenido para efecto infinito
});
