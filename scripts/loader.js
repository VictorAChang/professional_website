// Component loader utility - handles loading of navbar, footer, and other partial components
class ComponentLoader {
  static async loadNavbar() {
    try {
      const response = await fetch('partials/_navbar.html');
      if (!response.ok) {
        throw new Error(`Failed to load navbar: ${response.status}`);
      }
      const navbarHTML = await response.text();
      
      // Find the navbar container and insert the HTML
      const navbarContainer = document.getElementById('navbar-container');
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
        console.log('Navbar loaded successfully');
      } else {
        console.error('Navbar container element not found');
      }
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }

  static async loadFooter() {
    try {
      const response = await fetch('partials/_footer.html');
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.status}`);
      }
      const footerHTML = await response.text();
      
      // Find the footer container and insert the HTML
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
        console.log('Footer loaded successfully');
      } else {
        console.error('Footer container element not found');
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  static async loadAllComponents() {
    // Load navbar and footer in parallel for better performance
    await Promise.all([
      this.loadNavbar(),
      this.loadFooter()
    ]);
    
    // Dispatch custom event to notify that all components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  ComponentLoader.loadAllComponents();
});