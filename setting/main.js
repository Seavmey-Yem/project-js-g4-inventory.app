window.onload = function () {
    const userData = userData();
  
    if (userData) {
      document.getElementById('fullName').value = userData.fullName;
      document.getElementById('email').value = userData.email;
      document.getElementById('phone').value = userData.phone;
      document.querySelector('input[type="date"]').value = userData.dob;
  
      // Display roles
      document.getElementById('roles').textContent = userData.roles.join(', ');
  
      // Set permissions
      const permissionsContainer = document.getElementById('permissions');
      permissionsContainer.innerHTML = Object.entries(userData.permissions)
        .map(([perm, allowed]) => `<span>${perm}: ${allowed ? 'Yes' : 'No'}</span>`)
        .join('<br>');
    } else {
      // Redirect if no user data is found
      window.location.href = '../pages/login.html';
    }
  };
  