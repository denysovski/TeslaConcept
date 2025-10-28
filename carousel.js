// Tesla Models Carousel
let currentIndex = 0;
const cards = document.querySelectorAll('.carousel-card');
const indicators = document.querySelectorAll('.indicator');
const totalCards = cards.length;

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + totalCards) % totalCards) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % totalCards) {
            card.classList.add('next');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function nextModel() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
}

function prevModel() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
}

function goToModel(index) {
    currentIndex = index;
    updateCarousel();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevModel();
    } else if (e.key === 'ArrowRight') {
        nextModel();
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.carousel-container');

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left
            nextModel();
        } else {
            // Swiped right
            prevModel();
        }
    }
}

// Initialize carousel
updateCarousel();

// Optional: Auto-play (uncomment to enable)
// setInterval(nextModel, 5000);
