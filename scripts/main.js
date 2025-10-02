document.addEventListener('DOMContentLoaded', function () {
const toggle = document.getElementById('darkModeToggle');
const icon = document.getElementById('darkModeIcon');
const text = document.getElementById('darkModeText');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');

function setDarkMode(isDark) {
  const navbar = document.querySelector('nav');
  const footer = document.querySelector('footer');
  const main = document.querySelector('main');
  if (isDark) {
    document.body.classList.add('bg-dark', 'text-light');
    document.body.classList.remove('bg-light', 'text-dark');
    if (main) {
      main.classList.add('bg-dark', 'text-light');
      main.classList.remove('bg-light', 'text-dark');
    }
    if (navbar) {
      navbar.classList.add('bg-dark', 'navbar-dark', 'text-light');
      navbar.classList.remove('bg-light', 'navbar-light', 'text-dark');
    }
    if (footer) {
      footer.classList.add('bg-dark', 'text-light');
      footer.classList.remove('bg-light', 'text-dark');
    }
    toggle.classList.add('active');
    icon.classList.remove('bi-moon-stars-fill');
    icon.classList.add('bi-sun-fill');
    text.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('bg-dark', 'text-light');
    document.body.classList.add('bg-light', 'text-dark');
    if (main) {
      main.classList.remove('bg-dark', 'text-light');
      main.classList.add('bg-light', 'text-dark');
    }
    if (navbar) {
      navbar.classList.remove('bg-dark', 'navbar-dark', 'text-light');
      navbar.classList.add('bg-light', 'navbar-light', 'text-dark');
    }
    if (footer) {
      footer.classList.remove('bg-dark', 'text-light');
      footer.classList.add('bg-light', 'text-dark');
    }
    toggle.classList.remove('active');
    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-stars-fill');
    text.textContent = 'Dark Mode';
  }
}

// On page load, apply saved mode
const savedMode = localStorage.getItem('darkMode');
setDarkMode(savedMode === 'dark');

toggle.addEventListener('click', function () {
  const isDark = !toggle.classList.contains('active');
  setDarkMode(isDark);
  localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
});

// Minimize/collapse navbar when clicking outside
document.addEventListener('click', function (e) {
  if (
    navbarToggler &&
    navbarCollapse &&
    navbarCollapse.classList.contains('show') &&
    !navbarToggler.contains(e.target) &&
    !navbarCollapse.contains(e.target)
  ) {
    navbarToggler.click();
  }
});
});
