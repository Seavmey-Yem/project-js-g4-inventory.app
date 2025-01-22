import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Initialize Firebase Services
const auth = getAuth();
const db = getFirestore();

// Handle Signup Form Submission
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstname = document.getElementById('firstname-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;

    if (password !== repeatPassword) {
        document.getElementById('error-message').textContent = 'Passwords do not match.';
        return;
    }

    try {
        // Create User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save User Data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstname: firstname,
            email: email,
        });

        // Redirect to Home Page
        window.location.href = '../pages/home.html';
    } catch (error) {
        console.error("Error signing up:", error.message);
        document.getElementById('error-message').textContent = error.message;
    }
});
const setError = (inputId, message) => {
    const input = document.getElementById(inputId);
    const errorElement = document.createElement('span');
    errorElement.className = 'error-text';
    errorElement.textContent = message;

    input.parentElement.appendChild(errorElement);
    input.classList.add('is-invalid');
};

const clearErrors = () => {
    document.querySelectorAll('.error-text').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
};

// In the try-catch block, clear errors before attempting submission:
try {
    clearErrors();
    // Proceed with signup logic
} catch (error) {
    console.error(error.message);
    setError('email-input', error.message);
}
