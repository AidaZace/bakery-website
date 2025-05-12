// Enhanced JavaScript for better mobile experience
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelector(".nav-items");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Add hamburger menu functionality
if (hamburger) {
    hamburger.addEventListener("click", function() {
        navItems.classList.toggle("active");
    });
}

// Close mobile menu when clicking a nav item
const navLinks = document.querySelectorAll('.nav-item');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navItems.classList.remove('active');
    });
});

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;
let isMobile = window.innerWidth <= 768;

// Check for screen size changes
window.addEventListener('resize', function() {
    isMobile = window.innerWidth <= 768;
    updateBookTransform();
});

// Update book transform based on screen size
function updateBookTransform() {
    if (currentLocation === 1) {
        closeBook(true);
    } else if (currentLocation === maxLocation) {
        closeBook(false);
    } else {
        openBook();
    }
}

// Adjustments for book size based on screen width
function openBook() {
    if (isMobile) {
        book.style.transform = "translateX(0)";
        prevBtn.style.transform = "translateX(0)";
        nextBtn.style.transform = "translateX(0)";
    } else {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-300px)";
        nextBtn.style.transform = "translateX(300px)";
    }
}

function closeBook(isAtBeginning) {
    if (isMobile) {
        book.style.transform = "translateX(0)";
    } else {
        if (isAtBeginning) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        switch (currentLocation) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;
                closeBook(false);
                break;
            default:
                throw new Error("unknown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        switch (currentLocation) {
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;
            case 4:
                openBook();
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                break;
            default:
                throw new Error("unknown state");
        }

        currentLocation--;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateBookTransform();
});