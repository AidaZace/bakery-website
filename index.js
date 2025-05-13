// Mobile menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('nav-items');

hamburger.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// Gallery slider functionality
const gallery = document.getElementById('gallery');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let itemsToShow = getItemsToShow();
let totalItems = gallery.children.length;

function getItemsToShow() {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 768) return 2;
    return 3; // Show 3 by default
}

function updateGallery() {
    const itemWidth = gallery.children[0].offsetWidth;
    const gapWidth = 27; // match this to your CSS gap
    const scrollAmount = (itemWidth + gapWidth) * currentIndex;

    gallery.style.transform = `translateX(-${scrollAmount}px)`;

    // Disable buttons if at start or end
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex + itemsToShow >= totalItems;

    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
}

prevBtn.addEventListener('click', () => {
    currentIndex -= itemsToShow;
    if (currentIndex < 0) currentIndex = 0;
    updateGallery();
});

nextBtn.addEventListener('click', () => {
    currentIndex += itemsToShow;
    if (currentIndex > totalItems - itemsToShow) {
        currentIndex = totalItems - itemsToShow;
    }
    updateGallery();
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

gallery.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const minSwipeDistance = 50;
    if (touchEndX < touchStartX - minSwipeDistance) {
        // Swipe left
        currentIndex += itemsToShow;
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = totalItems - itemsToShow;
        }
        updateGallery();
    } else if (touchEndX > touchStartX + minSwipeDistance) {
        // Swipe right
        currentIndex -= itemsToShow;
        if (currentIndex < 0) currentIndex = 0;
        updateGallery();
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    const newItemsToShow = getItemsToShow();
    if (newItemsToShow !== itemsToShow) {
        itemsToShow = newItemsToShow;
        if (currentIndex > totalItems - itemsToShow) {
            currentIndex = Math.max(0, totalItems - itemsToShow);
        }
        updateGallery();
    }
});

// On page load
window.addEventListener('load', () => {
    itemsToShow = getItemsToShow();
    totalItems = gallery.children.length;
    updateGallery();
});
