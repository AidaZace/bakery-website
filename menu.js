// Mobile menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('nav-items');

hamburger.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Page state
let currentLocation = 1;
const numOfPapers = 3;
const maxLocation = numOfPapers + 1;

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Add this function to check if we're on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Book open/close logic with mobile spine centering
function openBook() {
    if (!isMobile()) {
        // Desktop behavior - remains the same
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-300px)";
        nextBtn.style.transform = "translateX(300px)";
    } else {
        // Mobile behavior - update class for center-spine positioning
        updateBookPositionMobile();
        // No need to move buttons on mobile as they're positioned below
    }
}

function closeBook(isAtBeginning) {
    if (!isMobile()) {
        // Desktop behavior - remains the same
        if (isAtBeginning) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }
        prevBtn.style.transform = "translateX(0px)";
        nextBtn.style.transform = "translateX(0px)";
    } else {
        // Mobile behavior - update class for center positioning
        updateBookPositionMobile();
        // No need to move buttons on mobile as they're positioned below
    }
}

// New function to handle mobile spine centering
function updateBookPositionMobile() {
    if (isMobile()) {
        // If on first or last page, center the entire book
        if (currentLocation === 1 || currentLocation === maxLocation) {
            book.classList.remove('in-middle');
        } else {
            // Otherwise center the spine for middle pages
            book.classList.add('in-middle');
        }
    }
}

// Go to next page
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
                throw new Error("Unknown page state");
        }
        currentLocation++;
        updateButtonState();
        updateBookPositionMobile(); // Add this line
    }
}

// Go to previous page
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
                throw new Error("Unknown page state");
        }
        currentLocation--;
        updateButtonState();
        updateBookPositionMobile(); // Add this line
    }
}

// Enable/Disable Buttons at Edges
function updateButtonState() {
    prevBtn.disabled = currentLocation === 1;
    nextBtn.disabled = currentLocation === maxLocation;
}

// Initialize button state and book position on load
updateButtonState();
updateBookPositionMobile(); // Add this line

// Add window resize listener to update positioning if screen size changes
window.addEventListener('resize', updateBookPositionMobile);