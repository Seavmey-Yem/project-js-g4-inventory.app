// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMPaBMwy5Xm-88wfvp3jl8naayDibcPiw",
    authDomain: "login-signup-74d64.firebaseapp.com",
    projectId: "login-signup-74d64",
    storageBucket: "login-signup-74d64.appspot.com",
    messagingSenderId: "852453926184",
    appId: "1:852453926184:web:c7f9b4dc1f1ff54783dc1d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Error Handling Utilities
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

// Signup Form Submission
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();

    const firstname = document.getElementById('firstname-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;

    if (password !== repeatPassword) {
        setError('repeat-password-input', 'Passwords do not match.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            firstname: firstname,
            email: email,
        });

        window.location.href = '../pages/home.html';
    } catch (error) {
        switch (error.code) {
            case 'auth/weak-password':
                setError('password-input', 'Password should be at least 6 characters long.');
                break;
            case 'auth/email-already-in-use':
                setError('email-input', 'This email is already in use.');
                break;
            default:
                document.getElementById('error-message').textContent = error.message;
        }
    }
});
