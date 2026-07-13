// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// 1. Select the button from your HTML
const getImagesBtn = document.getElementById('get-images-btn');
const galleryContainer = document.getElementById('gallery');

// Define the render function to display fetched images
const renderGallery = (dataArray) => {
  // Clear the gallery container before rendering new images
  galleryContainer.innerHTML = '';
  // Loop through the data
  dataArray.forEach(item => {
    // Only display items where media_type is 'image' (or handle videos differently)
    if (item.media_type === 'image') {
      const card = document.createElement('div');
      card.className = 'gallery-item';

      // Create and set image, title, and date elements
      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;

      // Add click listener to open the modal when the card is clicked
      card.addEventListener('click', () => openModal(item));

      // Add the card to the gallery
      galleryContainer.appendChild(card);
    }
  });
};

// 2. Define the fetch function to get NASA APOD data
const fetchSpaceImages = async (startDate, endDate) => {
  const apiKey = 'Y6tfGHNPtb2bl4gAeDUfabspceluYjMEPA0RzKj6';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Log the data to the console so you can see it
    console.log(data);
    
    // 3. Call renderGallery to display the fetched images
    renderGallery(data);
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    galleryContainer.innerHTML = '<p>Failed to load images. Please try again.</p>';
  }
};

// 4. Listen for button clicks and fetch/display images
getImagesBtn.addEventListener('click', async () => {
  const startDate = startInput.value;
  const endDate = endInput.value;

  console.log(`Fetching images from ${startDate} to ${endDate}`);
  
  // Show loading message
  galleryContainer.innerHTML = '<p>Loading space images...</p>';

  // Call the fetchSpaceImages function with the selected dates
  await fetchSpaceImages(startDate, endDate);
});

// 1. Get references to the modal elements
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalExplanation = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');

// 2. Function to open the modal with specific data
const openModal = (itemData) => {
  modalImg.src = itemData.url;
  modalTitle.innerText = itemData.title;
  modalDate.innerText = itemData.date;
  modalExplanation.innerText = itemData.explanation;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

// 3. Function to close the modal
closeBtn.onclick = () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore background scrolling
};

// 1. Create an array of facts
const spaceFacts = [
  "Venus is the hottest planet in our solar system, with surface temperatures hot enough to melt lead.",
  "One day on Venus is longer than one year on Venus.",
  "There is no sound in space because there is no atmosphere.",
  "Neutron stars can spin 600 times per second.",
  "The footprint left on the moon by Apollo astronauts will likely stay there for 100 million years because there is no wind to blow it away."
];

// 2. Function to pick and display a random fact
function displayRandomFact() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  const factElement = document.getElementById('fact-display'); // Make sure you have this ID in your HTML
  
  if (factElement) {
    factElement.textContent = `Orbiting Fact ${spaceFacts[randomIndex]}`;
  }
}

// 3. Call this function when the page loads
window.onload = displayRandomFact;