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

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.style.width = '5rem';
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '1rem';
    deleteButton.addEventListener('click', () => {
        contains.removeChild(card);
        removeCategoryFromStorage(category);
    });
    cardBody.appendChild(deleteButton);
    card.appendChild(cardBody);
    contains.appendChild(card);
    // Add edit button
    // Add edit button
const editButton = document.createElement('button');
editButton.classList.add('btn', 'btn-primary');
editButton.style.width = '5rem';
editButton.style.marginLeft = '1rem';
editButton.textContent = 'Edit';

editButton.addEventListener('click', () => {
    // Populate the form with the current card's data
    document.getElementById('categoryTitle').value = category.title;
    document.getElementById('categoryItems').value = category.items;

    // Temporary storage of current image
    const currentImage = category.image;

    // Open the popup form
    popupForm.classList.add('active');
    overlay.classList.add('active');

    // Handle form submission for editing
    form.onsubmit = (event) => {
        event.preventDefault();

        const updatedTitle = document.getElementById('categoryTitle').value.trim();
        const updatedItems = document.getElementById('categoryItems').value.trim();
        const updatedFileInput = document.getElementById('inputFile').files[0];

        if (updatedTitle && updatedItems) { // Ensure title and items are not empty
            // If a new image is selected, convert it to a base64 string
            if (updatedFileInput) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const updatedImage = reader.result;

                    // Update the card and localStorage
                    updateCategory(category, updatedTitle, updatedItems, updatedImage);
                };
                reader.readAsDataURL(updatedFileInput);
            } else {
                // If no new image is selected, retain the current image
                updateCategory(category, updatedTitle, updatedItems, currentImage);
            }
        } else {
            alert('Title and items cannot be empty.'); // Notify user if inputs are invalid
        }

        // Close popup and reset form
        popupForm.classList.remove('active');
        overlay.classList.remove('active');
        form.reset();
        form.onsubmit = null; // Reset the form submission handler
    };
});
cardBody.appendChild(editButton);

// Function to update a category in localStorage and UI
function updateCategory(oldCategory, updatedTitle, updatedItems, updatedImage) {
    // Update localStorage
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    const updated = categories.some((c) => c.image === oldCategory.image); // Check if category exists

    if (updated) {
        categories = categories.map((c) =>
            c.image === oldCategory.image
                ? { title: updatedTitle, items: updatedItems, image: updatedImage }
                : c
        );
        localStorage.setItem('categories', JSON.stringify(categories));

        // Refresh UI
        contains.innerHTML = ''; // Clear existing cards
        categories.forEach(displayCategory); // Re-display updated cards
    } else {
        alert('Unable to edit: category not found.');
    }
}

}
// Function to update a category in localStorage and UI
function updateCategory(oldCategory, updatedTitle, updatedItems, updatedImage) {
    // Retrieve existing categories from localStorage
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    
    // Find the index of the card being edited
    const categoryIndex = categories.findIndex((c) => c.image === oldCategory.image);

    if (categoryIndex !== -1) {
        // Update the specific category
        categories[categoryIndex] = {
            title: updatedTitle,
            items: updatedItems,
            image: updatedImage,
        };
        localStorage.setItem('categories', JSON.stringify(categories)); // Save updated categories to localStorage

        // Refresh the UI
        contains.innerHTML = ''; // Clear existing cards
        categories.forEach(displayCategory); // Re-render all cards
    } else {
        alert('Unable to edit: category not found.'); // Handle error if the category wasn't found
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
};


