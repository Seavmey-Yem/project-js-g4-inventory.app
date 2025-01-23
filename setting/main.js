// // Select elements for editing and saving
// const editIcons = document.querySelectorAll('.edit-icon');
// const inputs = document.querySelectorAll('input');
// const saveButton = document.querySelector('button[type="submit"]');

// // Initially disable all inputs
// inputs.forEach(input => input.disabled = true);

// // Toggle edit mode when the edit icon is clicked
// editIcons.forEach(icon => {
//   icon.addEventListener('click', () => {
//     const parentSection = icon.closest('.row, .container'); // Ensure the correct parent is selected
//     const sectionInputs = parentSection.querySelectorAll('input');
    
//     sectionInputs.forEach(input => {
//       input.disabled = !input.disabled; // Toggle the disabled state
//       if (!input.disabled) input.focus(); // Focus on the first input when enabling
//     });
//   });
// });

// // Save changes and store in localStorage when the Save button is clicked
// saveButton.addEventListener('click', (e) => {
//   e.preventDefault(); // Prevent form submission

//   const formData = {}; // Object to store form data

//   inputs.forEach(input => {
//     input.disabled = true; // Disable all inputs
//     if (input.id) {
//       formData[input.id] = input.value; // Store input values by their ID
//     }
//   });

//   // Save form data to localStorage
//   localStorage.setItem('formData', JSON.stringify(formData));

//   // Show SweetAlert confirmation
//   Swal.fire({
//     title: 'Success!',
//     text: 'Changes have been saved and stored!',
//     icon: 'success',
//     confirmButtonText: 'OK'
//   });
// });

// // Populate form with stored data on page load
// window.addEventListener('DOMContentLoaded', () => {
//   const savedData = JSON.parse(localStorage.getItem('formData'));

//   if (savedData) {
//     inputs.forEach(input => {
//       if (savedData[input.id]) {
//         input.value = savedData[input.id]; // Populate inputs with saved values
//       }
//     });
//   }
// });
