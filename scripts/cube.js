// 3D Cube Navigation functionality
class CubeNavigator {
  constructor() {
    this.cube = document.getElementById('navigationCube');
    this.controlButtons = document.querySelectorAll('.cube-control-btn');
    this.currentFace = 'front';
    this.autoRotateInterval = null;
    this.autoRotateDelay = 4000; // 4 seconds
    
    this.init();
  }

  init() {
    if (!this.cube) return;
    
    // Set initial state
    this.showFace('front');
    
    // Add click events to control buttons
    this.controlButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const face = e.target.getAttribute('data-face');
        this.showFace(face);
        this.resetAutoRotate();
      });
    });

    // Add click event to cube faces for navigation
    const cubeLinks = this.cube.querySelectorAll('a.cube-face');
    cubeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Allow normal navigation - no preventDefault needed
        this.pauseAutoRotate();
      });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });

    // Add mouse wheel navigation
    this.cube.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.handleWheelNavigation(e);
    });

    // Start auto-rotation
    this.startAutoRotate();

    // Pause auto-rotation on hover
    this.cube.addEventListener('mouseenter', () => this.pauseAutoRotate());
    this.cube.addEventListener('mouseleave', () => this.startAutoRotate());
  }

  showFace(face) {
    if (!this.cube) return;
    
    // Remove all face classes
    this.cube.classList.remove('show-front', 'show-back', 'show-right', 'show-left');
    
    // Add the new face class
    this.cube.classList.add(`show-${face}`);
    
    // Update control buttons
    this.controlButtons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('data-face') === face) {
        button.classList.add('active');
      }
    });
    
    this.currentFace = face;
  }

  getNextFace() {
    const faces = ['front', 'right', 'back', 'left'];
    const currentIndex = faces.indexOf(this.currentFace);
    return faces[(currentIndex + 1) % faces.length];
  }

  getPreviousFace() {
    const faces = ['front', 'right', 'back', 'left'];
    const currentIndex = faces.indexOf(this.currentFace);
    return faces[(currentIndex - 1 + faces.length) % faces.length];
  }

  handleKeyNavigation(e) {
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.showFace(this.getNextFace());
        this.resetAutoRotate();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.showFace(this.getPreviousFace());
        this.resetAutoRotate();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.showFace('top');
        this.resetAutoRotate();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.showFace('bottom');
        this.resetAutoRotate();
        break;
    }
  }

  handleWheelNavigation(e) {
    if (e.deltaY > 0) {
      // Scroll down - next face
      this.showFace(this.getNextFace());
    } else {
      // Scroll up - previous face
      this.showFace(this.getPreviousFace());
    }
    this.resetAutoRotate();
  }

  startAutoRotate() {
    this.pauseAutoRotate(); // Clear any existing interval
    this.autoRotateInterval = setInterval(() => {
      this.showFace(this.getNextFace());
    }, this.autoRotateDelay);
  }

  pauseAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  resetAutoRotate() {
    this.pauseAutoRotate();
    setTimeout(() => {
      this.startAutoRotate();
    }, 2000); // Wait 2 seconds before resuming auto-rotation
  }
}

// Initialize cube navigator when components are loaded
document.addEventListener('componentsLoaded', function() {
  // Small delay to ensure everything is rendered
  setTimeout(() => {
    new CubeNavigator();
  }, 100);
});

// Fallback initialization if componentsLoaded doesn't fire
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    if (document.getElementById('navigationCube') && !window.cubeNavigatorInitialized) {
      new CubeNavigator();
      window.cubeNavigatorInitialized = true;
    }
  }, 500);
});