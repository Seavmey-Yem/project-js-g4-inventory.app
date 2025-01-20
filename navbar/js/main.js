// Toggle Sidebar Visibility
document.getElementById('toggleSidebar').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('d-none');
});

// Highlight Active Link
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.sidebar .nav-link.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

// Logout Functionality
document.getElementById("logoutBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
  
    // Clear session or local storage data
    sessionStorage.clear(); // Clear session data
    localStorage.clear();   // Optional: Clear local storage data
  
    // Clear authentication token cookie
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    // Notify the server about logout (optional, depending on backend implementation)
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(() => {
        // After successful logout on the server, redirect to the login page
        window.location.href = "../pages/log-sign/login.html";
    })
    .catch((error) => {
        console.error("Logout failed:", error);
        // Optionally redirect to login even if the logout request fails
        window.location.href = "../pages/log-sign/login.html";
    });
});
document.querySelector('.navlogout a').addEventListener('click', function (event) {
    event.preventDefault();

    // Clear session or authentication data
    sessionStorage.clear(); // Clear session storage
    localStorage.clear();   // Optional: clear local storage
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    window.location.href = '../log-sign/login.html';
});
