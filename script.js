document.addEventListener("DOMContentLoaded", function () {
  
  initMobileNavigation();
  initSkillsAnimation();
  initTechMarquee();
  initProjectsCarousel();

  function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  function initSkillsAnimation() {
    const circles = document.querySelectorAll('.hb');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillCircle(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    
    circles.forEach(circle => observer.observe(circle));
  }

  function animateSkillCircle(circle) {
    const percent = parseInt(circle.dataset.percentage);
    const progress = circle.querySelector('.progress');
    const percentageText = circle.querySelector('.percentage');
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    progress.style.strokeDashoffset = offset;
    
    let count = 0;
    const interval = setInterval(() => {
      if (count <= percent) {
        percentageText.textContent = count + '%';
        count++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  function initTechMarquee() {
    const track = document.querySelector('.tech-track');
    if (track) {
      const content = track.innerHTML; 
      track.innerHTML += content;
    }
  }

  function initProjectsCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    let currentPosition = 0;
    const speed = 1.0; 
    let isRunning = true;

    function getCardWidth() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) return 230;
      if (screenWidth <= 768) return 265;
      if (screenWidth <= 1024) return 300;
      return 350;
    }

    function animateCarousel() {
      if (!isRunning) return;

      const cardWidth = getCardWidth();
      const totalWidth = cardWidth * 5;
      
      currentPosition -= speed;
      
      if (Math.abs(currentPosition) >= totalWidth) {
        currentPosition = 0;
      }
      
      carouselTrack.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(animateCarousel);
    }

    function setupCarouselControls() {
      const carouselContainer = document.querySelector('.carousel-container');
      if (!carouselContainer) return;

      carouselContainer.addEventListener('mouseenter', () => {
        isRunning = false;
      });
      
      carouselContainer.addEventListener('mouseleave', () => {
        isRunning = true;
        animateCarousel();
      });

      carouselContainer.addEventListener('touchstart', () => {
        isRunning = false;
      }, { passive: true });

      carouselContainer.addEventListener('touchend', () => {
        setTimeout(() => {
          isRunning = true;
          animateCarousel();
        }, 1000);
      }, { passive: true });
    }

    function setupCarouselObserver() {
      const projectsSection = document.getElementById('proyectos');
      if (!projectsSection) return;

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isRunning = true;
            animateCarousel();
          } else {
            isRunning = false;
          }
        });
      }, { threshold: 0.3 });

      sectionObserver.observe(projectsSection);
    }

    window.addEventListener('resize', () => {
      currentPosition = 0;
    });

    carouselTrack.style.transition = 'none';
    
    setupCarouselControls();
    setupCarouselObserver();
    animateCarousel();
  }

});