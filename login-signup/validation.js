// Utility to save user data to localStorage
function saveUserData(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

// Utility to get user data from localStorage
function getUserData() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

// Utility to clear user data
function clearUserData() {
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
}
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('login-error-message');

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email-input').value.trim();
  const password = document.getElementById('login-password-input').value.trim();

  // Simulated login validation
  if (email === 'user@example.com' && password === 'password123') {
    const userData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      dob: '1990-01-01',
      roles: ['Manager', 'Editor'],
      permissions: { view: true, edit: false, create: true },
    };

    saveUserData(userData); // Save to localStorage
    sessionStorage.setItem('authToken', 'dummyToken'); // Simulate auth token

    window.location.href = '../pages/home.html'; // Redirect to home
  } else {
    loginErrorMessage.textContent = 'Invalid email or password.';
  }
});
const signupForm = document.getElementById('signup-form');
const signupErrorMessage = document.getElementById('signup-error-message');

signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstname = document.getElementById('firstname-input').value.trim();
  const email = document.getElementById('signup-email-input').value.trim();
  const password = document.getElementById('signup-password-input').value.trim();
  const repeatPassword = document.getElementById('repeat-password-input').value.trim();

  signupErrorMessage.textContent = '';

  if (!firstname || !email || !password || !repeatPassword) {
    signupErrorMessage.textContent = 'All fields are required.';
    return;
  }

  if (password !== repeatPassword) {
    signupErrorMessage.textContent = 'Passwords do not match.';
    return;
  }

  const userData = {
    fullName: firstname,
    email,
    phone: 'Not Provided',
    dob: 'Not Provided',
    roles: ['User'],
    permissions: { view: true, edit: false, create: false },
  };

  saveUserData(userData); // Save to localStorage

  alert('Signup successful! Redirecting to login.');
  window.location.href = 'login.html';
});
