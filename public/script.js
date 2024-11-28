// Define global variables
let SlotsLeft = 0;
let Initialslots = 0; // Define Initialslots here
const carouselContainer = document.getElementById('carousel-container');
const carouselSound = document.getElementById('carouselSound');
let imagePaths = [];
const carousel = document.querySelector('.carousel');

// Function to get a random integer between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fetch image paths from the server
function fetchImagePaths() {
  fetch('/api/imagePaths')
    .then(response => response.json())
    .then(data => {
      imagePaths = data;
      initializeCarousel();
    })
    .catch(error => console.error('Error fetching image paths:', error));
}

// Function to initialize the carousel with images
function initializeCarousel() {
  console.log('Initializing carousel with images:', imagePaths);

  imagePaths.forEach(imagePath => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = 'Slot Image';
    item.className = 'carousel-item';
    item.appendChild(img);
    carouselContainer.appendChild(item);
  });

  imagePaths.forEach(imagePath => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = 'Bildenr: ' + SlotsLeft;
    item.className = 'carousel-item';
    item.appendChild(img);
    carouselContainer.appendChild(item);
    SlotsLeft++;
  });

  Initialslots = SlotsLeft; // Set Initialslots here
  updateSlotsLeft();

  console.log('Carousel initialized with slots:', SlotsLeft);
}

function scrollCarousel() {
  console.log('scrollCarousel called');

  toggleCarousel()


  // Disable the button
  const scrollButton = document.getElementById('scrollButton');
  scrollButton.disabled = true;

  carouselSound.play();
  const randomIndex = getRandomInt(Initialslots, (Initialslots + SlotsLeft - 1));

  if (SlotsLeft > 0) {
    SlotsLeft--;

    const randomPosition = randomIndex * 1200;
    carousel.style.transition = 'transform 7.5s ease-in-out';
    carousel.style.transform = `translateX(-${randomPosition}px)`;

    scrollBet();

    // Move the current image to the history div after the transition ends
    setTimeout(() => {
      moveToHistory(randomIndex);
      removeCurrentDiv(randomIndex); // Remove the div from the carousel
      resetCarousel(); // Reset the carousel position

      // Re-enable the button after the function finishes
      scrollButton.disabled = false;
    }, 12000); // 10 seconds, matching the transition duration
  } else {
    console.log("No slots left.");
    // Re-enable the button in case of no slots
    scrollButton.disabled = false;
  }
}

function moveToHistory(index) {
  console.log("Moving slot " + index + " to history");
  const carouselItems = document.querySelectorAll('.carousel-item');
  const itemToMove = carouselItems[index];

  if (itemToMove) {
    const historyContainer = document.getElementById('history-container');
    const clonedItem = itemToMove.cloneNode(true); // Clone the image and its div
    clonedItem.classList.remove('carousel-item');  // Remove the carousel-specific class if needed
    historyContainer.prepend(clonedItem); // Use prepend instead of append to place the new image first
  }
}


// Function to update the bet displayed
function scrollBet() {
  const bet = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,25];
  const randomIndex = Math.floor(Math.random() * bet.length);
  const randomBet = bet[randomIndex];
  const slotsLeftElement = document.getElementById('Bet');
  slotsLeftElement.textContent = `Bet: ${randomBet}`;
}

// Function to remove the current carousel item
function removeCurrentDiv(index) {
  console.log("SLOTNR: " + (index));
  const divToRemove = document.querySelectorAll('.carousel-item')[index];
  if (divToRemove) {
    divToRemove.remove();
  }
}
// Function to reset the carousel to the start position
function resetCarousel() {
  carousel.style.transition = 'transform 2s ease-out';
  carousel.style.transform = 'translateX(0)';
  updateSlotsLeft();
  toggleCarousel()
  toggleButton()
}

// Function to update the number of slots left
function updateSlotsLeft() {
  const slotsLeftElement = document.getElementById('slotsLeft');
  slotsLeftElement.textContent = `Slots Left: ${SlotsLeft}`;
}

// Initialize the carousel by fetching image paths
fetchImagePaths();

function toggleCarousel() {
  const carousel = document.querySelector('.carousel-container');
  carousel.classList.toggle('hidden');
}

function toggleButton() {
  const button = document.getElementById('scrollButton')
  button.classList.toggle('hidden')
}
