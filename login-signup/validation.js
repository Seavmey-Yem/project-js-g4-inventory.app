const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = email_input.value;
    const password = password_input.value;

    // Simulated login check
    if (email === 'user@example.com' && password === 'password123') {
        sessionStorage.setItem('authToken', 'dummyToken'); // Store a fake token
        window.location.href = '../pages/home.html'; // Redirect to the homepage/dashboard
    } else {
        showError('Invalid email or password. Please try again.');
    }
});

function showError(message) {
    error_message.textContent = message;
    email_input.parentElement.classList.add('incorrect');
    password_input.parentElement.classList.add('incorrect');
}

const inputs = [email_input, password_input];
inputs.forEach((input) => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.textContent = '';
        }
    });
});
