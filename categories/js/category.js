// addCategory================================

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
    const contains = document.querySelector(".contains");
    contains.classList.add("d-flex", "flex-wrap");
    // Create new card
    const card = document.createElement('div');
    card.classList.add('card', 'mt-5');
    card.style.width = '15rem';
    card.style.height = 'auto';

    // Add image
    const image = document.createElement('img');
    image.src = URL.createObjectURL(fileInput);
    image.classList.add('card-img-top');
    image.style.height = '9rem';
    image.onload = () => URL.revokeObjectURL(image.src); // Release object URL after loading
    card.appendChild(image);

    // Add card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body','d-flex');

    // Add title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;
    cardBody.appendChild(cardTitle);

    // Add items
    const itemsText = document.createElement('p');
    itemsText.classList.add('card-text','mt-5');
    itemsText.style.marginRight = 'auto';
    itemsText.textContent = `${items} items`;
    cardBody.appendChild(itemsText);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    // deleteButton.style.marginRight = 'auto';
    deleteButton.style.height = '2rem';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        contains.removeChild(card);
    });
    cardBody.appendChild(deleteButton);

    // Append card body to card
    card.appendChild(cardBody);

    // Add card to container
    contains.appendChild(card);

    // Close popup and reset form
    popupForm.classList.remove('active');
    overlay.classList.remove('active');
    form.reset();
});



