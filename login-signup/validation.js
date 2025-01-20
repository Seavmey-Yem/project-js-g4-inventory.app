// LOGIN FUNCTIONALITY
const form = document.getElementById('form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// Login form submission
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Simulated login check
  if (email === 'user@example.com' && password === 'password123') {
    sessionStorage.setItem('authToken', 'dummyToken'); // Store a fake token
    window.location.href = '../pages/home.html'; // Redirect to the homepage/dashboard
  } else {
    showError('Invalid email or password. Please try again.');
  }
});

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  emailInput.parentElement.classList.add('incorrect');
  passwordInput.parentElement.classList.add('incorrect');
}

// Remove error styles on input
const inputs = [emailInput, passwordInput];
inputs.forEach((input) => {
  input?.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      errorMessage.textContent = '';
    }
  });
});

// SIGNUP FUNCTIONALITY
const signupForm = document.getElementById('signup-form');

signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstname = document.getElementById('firstname-input').value.trim();
  const email = document.getElementById('email-input').value.trim();
  const password = document.getElementById('password-input').value.trim();
  const repeatPassword = document.getElementById('repeat-password-input').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Clear previous error messages
  errorMessage.textContent = '';

  // Validate fields
  if (!firstname || !email || !password || !repeatPassword) {
    errorMessage.textContent = 'All fields are required.';
    return;
  }

  if (password !== repeatPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  // Simulate signup success
  alert('Signup successful! Redirecting to login.');
  window.location.href = 'login.html';
});
