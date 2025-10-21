// Education Page Interactive Functionality
class EducationInteractions {
  constructor() {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.skillBars = document.querySelectorAll('.skill-progress');
    this.achievementCards = document.querySelectorAll('.achievement-card');
    
    console.log('Found timeline items:', this.timelineItems.length);
    this.timelineItems.forEach((item, index) => {
      const card = item.querySelector('.timeline-card');
      const educationType = card ? card.getAttribute('data-education') : 'NO CARD';
      console.log(`Timeline item ${index}:`, educationType);
    });
    
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
        // Add click interaction with debugging
        card.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Card clicked:', card.getAttribute('data-education'));
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
        
        // Make cards clearly clickable
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        // Add keyboard support
        card.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Card activated via keyboard:', card.getAttribute('data-education'));
            this.showEducationDetails(card);
          }
        });
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
    console.log('Showing details for education type:', educationType);
    const details = this.getEducationDetails(educationType);
    
    if (details) {
      console.log('Details found:', details.title);
      this.showModal(details);
    } else {
      console.error('No details found for education type:', educationType);
    }
  }

  getEducationDetails(type) {
    const details = {
      fellowship: {
        title: 'Corporate Fellow - Product Manager',
        institution: 'Microsoft',
        period: '2025 - Present',
        description: 'Leading product strategy and development initiatives, driving innovation in enterprise solutions and user experience design.',
        highlights: [
          'Leading cross-functional teams in product development',
          'Driving strategic initiatives in cloud and AI technologies',
          'Managing product lifecycle from conception to launch',
          'Collaborating with engineering and design teams on UX innovation'
        ],
        skills: ['Product Management', 'Strategic Planning', 'Team Leadership', 'Azure', 'AI/ML', 'User Experience']
      },
      'usasoc-analyst': {
        title: 'Data Analyst',
        institution: 'U.S. Army Special Operations Command',
        period: '2024 - 2025',
        description: 'Advanced data analysis and intelligence operations, developing predictive models and strategic insights for military operations.',
        highlights: [
          'Developed predictive models for operational planning',
          'Created automated reporting systems reducing analysis time by 60%',
          'Led intelligence briefings for senior military leadership',
          'Implemented machine learning algorithms for pattern recognition'
        ],
        skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Intelligence Analysis', 'Statistical Modeling']
      },
      mba: {
        title: 'MBA in Business Analytics',
        institution: 'Regent University',
        period: '2023 - Present',
        description: 'Comprehensive program focusing on data-driven business decision making, advanced analytics, and strategic leadership.',
        highlights: [
          'Specialized in Machine Learning and Predictive Analytics',
          'Capstone project on customer segmentation using clustering algorithms',
          'Dean\'s List recognition for academic excellence',
          'Leadership role in Analytics Student Association'
        ],
        skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Machine Learning', 'Statistical Analysis']
      },
      psyops: {
        title: 'Psychological Operations Specialist',
        institution: '1st Psychological Operations Battalion',
        period: '2021 - 2025',
        description: 'Strategic communication and psychological warfare operations, cultural analysis, and information influence campaigns.',
        highlights: [
          '5+ years of active duty service in Special Operations',
          'Multiple overseas deployments in support of combat operations',
          'Leadership positions managing teams of 8-12 soldiers',
          'Expert in cultural intelligence and strategic communication',
          'Security clearance holder with extensive intelligence experience'
        ],
        skills: ['Strategic Communication', 'Cultural Analysis', 'Leadership', 'Intelligence', 'Critical Thinking', 'Adaptability']
      },
      captiveaire: {
        title: 'Technical Sales Representative',
        institution: 'CaptiveAire',
        period: '2020 - 2021',
        description: 'Commercial kitchen ventilation systems sales, technical consultation, and client relationship management in the foodservice industry.',
        highlights: [
          'Exceeded sales targets by 25% in first year',
          'Provided technical expertise for complex commercial projects',
          'Built strong relationships with contractors and restaurant owners',
          'Managed territory covering Florida and Georgia markets'
        ],
        skills: ['Technical Sales', 'Client Relations', 'Engineering Consultation', 'Project Management', 'Territory Management']
      },
      absen: {
        title: 'Technical Sales Representative',
        institution: 'Absen, Inc.',
        period: '2019 - 2020',
        description: 'LED display solutions sales, technical support, and project management for commercial and entertainment applications.',
        highlights: [
          'Managed high-value LED display projects for major venues',
          'Provided technical support during installation and setup',
          'Collaborated with engineers on custom display solutions',
          'Achieved 95% customer satisfaction rating'
        ],
        skills: ['Technical Sales', 'LED Technology', 'Project Management', 'Customer Support', 'Problem Solving']
      },
      mechanical: {
        title: 'Bachelor\'s in Mechanical Engineering',
        institution: 'University of South Florida',
        period: '2016 - 2019',
        description: 'Engineering fundamentals, thermodynamics, materials science, and mechanical systems design and analysis.',
        highlights: [
          'Graduated with solid foundation in engineering principles',
          'Senior design project focused on renewable energy systems',
          'Strong background in CAD design and technical analysis',
          'Developed analytical and problem-solving skills'
        ],
        skills: ['Engineering Design', 'CAD Software', 'Technical Analysis', 'Problem Solving', 'Project Management', 'Mathematics']
      },
      biology: {
        title: 'Bachelor\'s in Biology',
        institution: 'University of South Florida',
        period: '2011 - 2015',
        description: 'Life sciences foundation, research methodology, laboratory techniques, and scientific analysis and communication.',
        highlights: [
          'Strong foundation in scientific methodology and research',
          'Extensive laboratory experience and technical skills',
          'Completed undergraduate research projects',
          'Developed analytical thinking and attention to detail'
        ],
        skills: ['Scientific Research', 'Laboratory Techniques', 'Data Analysis', 'Critical Thinking', 'Technical Writing', 'Attention to Detail']
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
  console.log('Components loaded, initializing education interactions');
  setTimeout(() => {
    if (!window.educationInteractionsInitialized) {
      new EducationInteractions();
      window.educationInteractionsInitialized = true;
    }
  }, 100);
});

// Fallback initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, checking education interactions');
  setTimeout(() => {
    if (!window.educationInteractionsInitialized) {
      console.log('Initializing education interactions (fallback)');
      new EducationInteractions();
      window.educationInteractionsInitialized = true;
    }
  }, 500);
});