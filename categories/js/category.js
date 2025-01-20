const addCategoryButton = document.getElementById('addCategoryButton');
const popupForm = document.getElementById('popupForm');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('closePopup');
const form = document.getElementById('categoryForm');
const contains = document.getElementById('contains');

// Open popup
addCategoryButton.addEventListener('click', () => {
    popupForm.classList.add('active');
    overlay.classList.add('active');
});

// Close popup
closePopup.addEventListener('click', () => {
    popupForm.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    popupForm.classList.remove('active');
    overlay.classList.remove('active');
});

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const title = document.getElementById('categoryTitle').value;
    const items = document.getElementById('categoryItems').value;
    const fileInput = document.getElementById('inputFile').files[0];

    if (!fileInput) {
        alert("Please select an image.");
        return;
    }

    // Convert the image to a base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Image = reader.result;

        // Save category to localStorage
        const newCategory = { title, items, image: base64Image };
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));

        // Display category as card
        displayCategory(newCategory);

        // Close popup and reset form
        popupForm.classList.remove('active');
        overlay.classList.remove('active');
        form.reset();
    };
    // This converts the image file to a base64 string
    reader.readAsDataURL(fileInput); 
});

// Function to display a category
function displayCategory(category) {
    const card = document.createElement('div');
    card.classList.add('card', 'mt-5');
    card.style.width = '15rem';
    card.style.height = '23rem';

    const contains = document.querySelector(".contains");
    contains.classList.add("d-flex", "flex-wrap",);

    // Add image
    const image = document.createElement('img');
    image.src = category.image; 
    image.classList.add('card-img-top','mt-2');
    image.style.height = '13rem';
    image.style.width = '13.8rem';
    image.style.marginLeft = '0.5rem';
    card.appendChild(image);

    // Add card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Add title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = category.title;
    cardBody.appendChild(cardTitle);

    // Add items
    const itemsText = document.createElement('p');
    itemsText.classList.add('card-text');
    itemsText.style.marginRight = 'auto';
    itemsText.textContent = `${category.items} items`;
    cardBody.appendChild(itemsText);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style.height = '3rem';
    deleteButton
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        contains.removeChild(card);
        removeCategoryFromStorage(category);
    });
    cardBody.appendChild(deleteButton);
    card.appendChild(cardBody);
    contains.appendChild(card);
    // Add edit button
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.style.height = '3rem';
    editButton.style.width = '5rem';
    editButton.style.marginLeft = '1.5rem';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        // TODO: Implement edit functionality
    });
    cardBody.appendChild(editButton);
}

// Function to remove category from localStorage
function removeCategoryFromStorage(category) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories = categories.filter(c => c.image !== category.image); 
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Load saved categories on page load
window.onload = () => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    savedCategories.forEach(displayCategory);
};
