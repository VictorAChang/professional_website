// Education Page Interactive Functionality
class EducationInteractions {
  constructor() {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.achievementCards = document.querySelectorAll('.achievement-card');
    this.init();
  }

  init() {
    // Initialize animations when page loads
    this.setupIntersectionObserver();
    this.animateSkillBars();
    this.setupTimelineInteractions();
    this.setupAchievementAnimations();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Trigger skill bar animations when skills section comes into view
          if (entry.target.id === 'skills-section') {
            this.animateSkillBars();
          }
        }
      });
    }, observerOptions);

    // Observe timeline items
    this.timelineItems.forEach(item => {
      observer.observe(item);
    });

    // Observe skills section
    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    // Observe achievements section
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
      observer.observe(achievementsSection);
    }
  }

  animateSkillBars() {
    setTimeout(() => {
      this.skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
      });
    }, 500);
  }

  setupTimelineInteractions() {
    this.timelineItems.forEach((item, index) => {
      const card = item.querySelector('.timeline-card');
      
      if (card) {
        // Add click interaction
        card.addEventListener('click', () => {
          this.showEducationDetails(card);
        });

        // Add hover effects
        card.addEventListener('mouseenter', () => {
          this.highlightTimelineItem(item);
        });

        card.addEventListener('mouseleave', () => {
          this.removeHighlight(item);
        });

        // Stagger animation delays
        item.style.animationDelay = `${index * 0.2}s`;
      }
    });
  }

  highlightTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    if (marker) {
      marker.style.transform = 'translateX(-50%) scale(1.2)';
      marker.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.5)';
    }
  }

  removeHighlight(item) {
    const marker = item.querySelector('.timeline-marker');
    if (marker && !marker.classList.contains('active')) {
      marker.style.transform = 'translateX(-50%) scale(1)';
      marker.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
    }
  }

  showEducationDetails(card) {
    const educationType = card.getAttribute('data-education');
    const details = this.getEducationDetails(educationType);
    
    if (details) {
      this.showModal(details);
    }
  }

  getEducationDetails(type) {
    const details = {
      mba: {
        title: 'MBA in Business Analytics',
        institution: 'University of South Florida',
        period: '2022 - 2024',
        description: 'Comprehensive program focusing on data-driven business decision making, advanced analytics, and strategic leadership.',
        highlights: [
          'Specialized in Machine Learning and Predictive Analytics',
          'Capstone project on customer segmentation using clustering algorithms',
          'Dean\'s List recognition for academic excellence',
          'Leadership role in Analytics Student Association'
        ],
        skills: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Machine Learning', 'Statistical Analysis']
      },
      military: {
        title: 'Psychological Operations Specialist',
        institution: 'U.S. Army Special Operations Command',
        period: '2015 - 2021',
        description: 'Specialized training in strategic communication, cultural analysis, and psychological warfare tactics.',
        highlights: [
          '6+ years of active duty service',
          'Multiple overseas deployments',
          'Leadership positions and team management',
          'Cultural intelligence and communication expertise'
        ],
        skills: ['Strategic Planning', 'Cultural Analysis', 'Leadership', 'Communication', 'Critical Thinking', 'Adaptability']
      },
      undergrad: {
        title: 'Bachelor\'s Degree',
        institution: 'Various Institutions',
        period: '2011 - 2015',
        description: 'Foundational education in liberal arts with emphasis on critical thinking and communication.',
        highlights: [
          'Strong foundation in research methodology',
          'Excellent written and verbal communication skills',
          'Interdisciplinary learning approach',
          'Community service and leadership activities'
        ],
        skills: ['Research', 'Writing', 'Critical Analysis', 'Public Speaking', 'Project Management']
      },
      continuous: {
        title: 'Continuous Learning Journey',
        institution: 'Various Platforms & Certifications',
        period: 'Ongoing',
        description: 'Committed to lifelong learning through online courses, certifications, and hands-on projects.',
        highlights: [
          'Self-taught web development and programming',
          'Multiple online certifications in AI/ML',
          'Active participation in coding communities',
          'Personal projects showcasing learned skills'
        ],
        skills: ['Web Development', 'AI/ML', 'Data Science', 'Cloud Computing', 'DevOps', 'Continuous Integration']
      }
    };

    return details[type] || null;
  }

  showModal(details) {
    // Create modal HTML
    const modalHTML = `
      <div class="modal fade" id="educationModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${details.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <h6 class="text-primary">${details.institution}</h6>
                <p class="text-muted">${details.period}</p>
              </div>
              <p>${details.description}</p>
              
              <h6 class="mt-4 mb-3">Key Highlights:</h6>
              <ul>
                ${details.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
              </ul>
              
              <h6 class="mt-4 mb-3">Skills Developed:</h6>
              <div class="d-flex flex-wrap gap-2">
                ${details.skills.map(skill => `<span class="badge bg-primary">${skill}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('educationModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('educationModal'));
    modal.show();

    // Clean up modal after it's hidden
    document.getElementById('educationModal').addEventListener('hidden.bs.modal', function() {
      this.remove();
    });
  }

  setupAchievementAnimations() {
    this.achievementCards.forEach((card, index) => {
      // Stagger animation
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        // Animate in when visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        }, { threshold: 0.3 });

        observer.observe(card);
      }, index * 100);
    });
  }
}

// Initialize education interactions when components are loaded
document.addEventListener('componentsLoaded', function() {
  setTimeout(() => {
    new EducationInteractions();
  }, 100);
});

// Fallback initialization
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (!window.educationInteractionsInitialized) {
      new EducationInteractions();
      window.educationInteractionsInitialized = true;
    }
  }, 500);
});