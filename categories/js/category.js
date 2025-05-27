const addCategoryButton = document.getElementById('addCategoryButton');
const popupForm = document.getElementById('popupForm');
const overlay = document.getElementById('overlay');
const closePopup = document.getElementById('closePopup');
const form = document.getElementById('categoryForm');
const contains = document.getElementById('contains');
const toupdate = document.getElementById('to-update');

let editingCategory = null; // To keep track of the category being edited

// Open popup
addCategoryButton.addEventListener('click', () => {
    popupForm.classList.add('active');
    overlay.classList.add('active');
    editingCategory = null; // Reset editing category
});

// Close popup
closePopup.addEventListener('click', closePopupForm);
overlay.addEventListener('click', closePopupForm);

function closePopupForm() {
    popupForm.classList.remove('active');
    overlay.classList.remove('active');
    form.reset();
    editingCategory = null; // Reset editing category
}

function updateLastUpdateText() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    toupdate.textContent = `Last update/ ${formattedDate}, at ${formattedTime}`;
}

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const title = document.getElementById('categoryTitle').value;
    const items = document.getElementById('categoryItems').value;
    const fileInput = document.getElementById('inputFile').files[0];

    if (!title || !items) {
        alert("Title and items cannot be empty.");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Image = reader.result;

        if (editingCategory) {
            // Update existing category
            updateCategoryInStorage(editingCategory, title, items, base64Image);
            updateCategoryUI(editingCategory.card, title, items, base64Image);
        } else {
            // Create new category
            const newCategory = { title, items, image: base64Image };
            let categories = JSON.parse(localStorage.getItem('categories')) || [];
            categories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            displayCategory(newCategory);
        }

        updateLastUpdateText();
        closePopupForm();
    };

    if (fileInput) {
        reader.readAsDataURL(fileInput);
    } else {
        alert("Please select an image.");
    }
});

// Function to display a category
function createCardUI(category) {
    const card = document.createElement('div');
    card.classList.add('card', 'mt-5');
    card.style.width = '15rem';
    card.style.height = '21rem';

    // Add image
    const image = document.createElement('img');
    image.src = category.image;
    image.classList.add('card-img-top', 'mt-2');
    image.style.height = '12rem';
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

    card.appendChild(cardBody);

    return { card, cardBody };
}

function addCardEventListeners(card, cardBody, category) {
    const contains = document.querySelector(".contains");
    contains.classList.add("d-flex", "flex-wrap");


    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style.width = '5rem';
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '1rem';
    deleteButton.addEventListener('click', () => {
        const confirmDelete = confirm(`Are you sure you want to delete the category: ${category.title}?`);
        if (confirmDelete) {
            contains.removeChild(card);
            removeCategoryFromStorage(category);
        }
    });
    cardBody.appendChild(deleteButton);

    // Add edit button
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.style.width = '5rem';
    editButton.style.marginLeft = '1rem';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => handleEditCategory(card, category));
    cardBody.appendChild(editButton);

    contains.appendChild(card);
}

function handleEditCategory(card, category) {
    document.getElementById('categoryTitle').value = category.title;
    document.getElementById('categoryItems').value = category.items;

    popupForm.classList.add('active');
    overlay.classList.add('active');

    editingCategory = { card, ...category }; // Store the category being edited
}

function displayCategory(category) {
    const { card, cardBody } = createCardUI(category);
    addCardEventListeners(card, cardBody, category);
}

function updateCategoryUI(card, updatedTitle, updatedItems, updatedImage) {
    const titleElement = card.querySelector('.card-title');
    const itemsElement = card.querySelector('.card-text');
    const imageElement = card.querySelector('img');

    // Update the card's UI
    titleElement.textContent = updatedTitle;
    itemsElement.textContent = `${updatedItems} items`;
    imageElement.src = updatedImage;
}

// Function to update a category in localStorage
function updateCategoryInStorage(oldCategory, updatedTitle, updatedItems, updatedImage) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    // Find and update the specific category
    const categoryIndex = categories.findIndex(c => c.image === oldCategory.image);
    if (categoryIndex !== -1) {
        categories[categoryIndex] = {
            title: updatedTitle,
            items: updatedItems,
            image: updatedImage,
        };
        localStorage.setItem('categories', JSON.stringify(categories));
    } else {
        alert('Unable to edit: category not found.');
    }
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

    if (savedCategories.length > 0) {
        updateLastUpdateText();
    }
};

const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("collapsed");
});



