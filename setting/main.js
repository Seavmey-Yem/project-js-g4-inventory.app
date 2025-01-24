document.addEventListener("DOMContentLoaded", () => {
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("eMail");
    const phoneInput = document.getElementById("phone");
    const dobInput = document.querySelector('input[type="date"]');
    const rolesCheckboxes = document.querySelectorAll(".role-option input");
    const permissionsCheckboxes = document.querySelectorAll(".permission-option input");
    const saveButton = document.querySelector(".btn-primary");
  
    // Load saved data
    function loadFormData() {
      const savedData = JSON.parse(localStorage.getItem("formData"));
      if (savedData) {
        fullNameInput.value = savedData.fullName || "";
        emailInput.value = savedData.email || "";
        phoneInput.value = savedData.phone || "";
        dobInput.value = savedData.dob || "";
  
        rolesCheckboxes.forEach((checkbox) => {
          checkbox.checked = savedData.roles.includes(checkbox.id);
        });
  
        permissionsCheckboxes.forEach((checkbox, index) => {
          checkbox.checked = savedData.permissions[index];
        });
      }
    }
  
    // Save form data
    function saveFormData() {
      const formData = {
        fullName: fullNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        dob: dobInput.value,
        roles: Array.from(rolesCheckboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.id),
        permissions: Array.from(permissionsCheckboxes).map((checkbox) => checkbox.checked),
      };
  
      localStorage.setItem("formData", JSON.stringify(formData));
      Swal.fire("Saved!", "Your changes have been saved.", "success");
    }
  
    // Event listener for Save button
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveFormData();
    });
  
    // Load data on page load
    loadFormData();
  });
  
