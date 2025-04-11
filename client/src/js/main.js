import { initWaitlistForm } from './modules/waitlist.js';

/**
 * Initialize all components when the DOM is fully loaded
 */
function initApp() {
  console.log('WorkUnplugged app initialized');
  
  // Initialize waitlist form
  initWaitlistForm();
  
  // Add animation to features on scroll
  const featureItems = document.querySelectorAll('.feature-item');
  if (featureItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });
    
    featureItems.forEach(item => {
      item.style.opacity = 0;
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(item);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp); 