// Winter Mode Controller - Magical Snowfall Effect
class WinterMode {
  constructor() {
    this.isActive = false;
    this.snowflakesContainer = null;
    this.snowflakes = [];
    this.snowflakeInterval = null;
    this.snowflakeTypes = ['❄', '❅', '❆', '✻', '✼', '❈'];
    this.maxSnowflakes = 150;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupWinterMode());
    } else {
      this.setupWinterMode();
    }
  }

  setupWinterMode() {
    const toggleBtn = document.getElementById('winterModeToggle');
    if (!toggleBtn) {
      console.error('Winter mode toggle button not found');
      return;
    }

    // Add click event listener
    toggleBtn.addEventListener('click', () => this.toggleWinterMode());

    // Create snowflakes container
    this.createSnowflakesContainer();

    // Check for saved winter mode state
    const savedState = localStorage.getItem('winterMode');
    if (savedState === 'active') {
      this.activateWinterMode();
    }
  }

  createSnowflakesContainer() {
    this.snowflakesContainer = document.createElement('div');
    this.snowflakesContainer.className = 'snowflakes-container';
    this.snowflakesContainer.style.display = 'none';
    document.body.appendChild(this.snowflakesContainer);
  }

  toggleWinterMode() {
    if (this.isActive) {
      this.deactivateWinterMode();
    } else {
      this.activateWinterMode();
    }
  }

  activateWinterMode() {
    this.isActive = true;
    const toggleBtn = document.getElementById('winterModeToggle');
    
    // Update button state
    toggleBtn.classList.add('active');
    toggleBtn.title = 'Deactivate Winter Mode';
    
    // Show snowflakes container
    this.snowflakesContainer.style.display = 'block';
    
    // Start generating snowflakes
    this.startSnowfall();
    
    // Save state
    localStorage.setItem('winterMode', 'active');
  }

  deactivateWinterMode() {
    this.isActive = false;
    const toggleBtn = document.getElementById('winterModeToggle');
    
    // Update button state
    toggleBtn.classList.remove('active');
    toggleBtn.title = 'Activate Winter Mode';
    
    // Stop generating snowflakes
    this.stopSnowfall();
    
    // Hide container after a delay to let existing flakes finish
    setTimeout(() => {
      if (!this.isActive) {
        this.snowflakesContainer.style.display = 'none';
      }
    }, 3000);
    
    // Save state
    localStorage.setItem('winterMode', 'inactive');
  }

  startSnowfall() {
    // Generate snowflakes at a faster rate for heavier snowfall
    this.snowflakeInterval = setInterval(() => {
      if (this.snowflakes.length < this.maxSnowflakes) {
        this.createSnowflake();
      }
    }, 150);
  }

  stopSnowfall() {
    if (this.snowflakeInterval) {
      clearInterval(this.snowflakeInterval);
      this.snowflakeInterval = null;
    }
  }

  createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random snowflake character
    const snowflakeChar = this.snowflakeTypes[Math.floor(Math.random() * this.snowflakeTypes.length)];
    snowflake.textContent = snowflakeChar;
    
    // Random size class
    const sizes = ['small', 'medium', 'large'];
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    snowflake.classList.add(sizeClass);
    
    // Random horizontal position
    snowflake.style.left = Math.random() * 100 + '%';
    
    // Random animation duration based on size
    let duration;
    switch (sizeClass) {
      case 'small':
        duration = 8 + Math.random() * 4; // 8-12 seconds
        break;
      case 'medium':
        duration = 10 + Math.random() * 4; // 10-14 seconds
        break;
      case 'large':
        duration = 12 + Math.random() * 4; // 12-16 seconds
        break;
    }
    snowflake.style.animationDuration = duration + 's';
    
    // Random delay to create more natural effect
    snowflake.style.animationDelay = Math.random() * 2 + 's';
    
    // Add to container
    this.snowflakesContainer.appendChild(snowflake);
    this.snowflakes.push(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
        this.snowflakes = this.snowflakes.filter(flake => flake !== snowflake);
      }
    }, (duration + 2) * 1000);
  }
}

// Initialize Winter Mode when script loads
const winterMode = new WinterMode();