import { apiRequest } from './api.js';

/**
 * Validates an email address using regex
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Handles the waitlist form submission
 * @param {HTMLFormElement} form - The waitlist form element
 * @param {HTMLElement} messageEl - The element to display messages
 */
async function handleSubmit(form, messageEl) {
  const emailInput = form.querySelector('#email');
  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    messageEl.textContent = 'Please provide a valid email address.';
    messageEl.className = 'error';
    return;
  }

  try {
    const data = await apiRequest('/api/waitlist/signup', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    
    messageEl.textContent = data.message;
    messageEl.className = 'success';
    emailInput.value = '';
  } catch (error) {
    console.error('Waitlist submission error:', error);
    messageEl.textContent = error.message || 'Failed to join waitlist. Please try again.';
    messageEl.className = 'error';
  }
}

/**
 * Initializes the waitlist form
 */
export function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const messageEl = document.getElementById('form-message');
  
  if (!form || !messageEl) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(form, messageEl);
  });
} 