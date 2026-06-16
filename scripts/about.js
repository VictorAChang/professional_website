// About Page Interactive Functionality
class AboutPageInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupTypingAnimation();
    this.setupCounterAnimations();
    this.setupStoryTimeline();
    this.setupScrollAnimations();
    this.setupSmoothScrolling();
    this.setupTooltips();
    this.setupParallaxEffects();
  }

  // Typing Animation
  setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
      "Data Analyst & Product Manager",
      "Former Military Operations Specialist", 
      "Self-Taught Developer",
      "Recipe Website Creator",
      "Problem Solver & Innovator"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      const cursor = typingElement.querySelector('.type-cursor');
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // Add cursor back
      if (cursor) {
        typingElement.appendChild(cursor);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(typeEffect, 1000);
  }

  // Counter Animations
  setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            setTimeout(() => animateCounter(counter), 200);
          }
        }
      });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Story Timeline Interactions
  setupStoryTimeline() {
    const storyPoints = document.querySelectorAll('.story-point');
    const storyCards = document.querySelectorAll('.story-card');

    storyPoints.forEach(point => {
      point.addEventListener('click', () => {
        // Remove active class from all points and cards
        storyPoints.forEach(p => p.classList.remove('active'));
        storyCards.forEach(c => c.classList.remove('active'));

        // Add active class to clicked point
        point.classList.add('active');

        // Show corresponding story card
        const storyType = point.getAttribute('data-story');
        const targetCard = document.getElementById(`story-${storyType}`);
        if (targetCard) {
          setTimeout(() => {
            targetCard.classList.add('active');
          }, 100);
        }

        // Add ripple effect
        this.createRipple(point);
      });
    });
  }

  // Create ripple effect
  createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(40, 167, 69, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: 100px;
      height: 100px;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Scroll Animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.style.animationDelay = delay + 'ms';
            entry.target.classList.add('animated');
          }, parseInt(delay));
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
      scrollObserver.observe(element);
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Bootstrap Tooltips
  setupTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Parallax Effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shapes, .floating-recipes');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  // Mouse Move Effects for Profile Image
  setupProfileInteraction() {
    const profileImage = document.getElementById('profileImage');
    if (!profileImage) return;

    profileImage.addEventListener('mousemove', (e) => {
      const rect = profileImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    profileImage.addEventListener('mouseleave', () => {
      profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Add floating animation to shapes
  setupFloatingAnimations() {
    const shapes = document.querySelectorAll('.shape, .recipe-float');
    
    shapes.forEach((shape, index) => {
      const delay = index * 1000;
      const duration = 3000 + (index * 500);
      
      shape.style.animationDelay = delay + 'ms';
      shape.style.animationDuration = duration + 'ms';
    });
  }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    new AboutPageInteractions();
  }, 100);
});

// Initialize when components are loaded (for modular loading)
document.addEventListener('componentsLoaded', function() {
  setTimeout(() => {
    new AboutPageInteractions();
  }, 100);
});