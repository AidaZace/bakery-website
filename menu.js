// Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navItems = document.querySelector('.nav-items');
        
        mobileMenuBtn.addEventListener('click', () => {
            navItems.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-items a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navItems.classList.remove('active');
            });
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
        // Mobile behavior - center the book with spine in middle
        updateBookClassesMobile();
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
        updateBookClassesMobile();
    }
}

// Enhanced function to handle mobile positioning using classes
function updateBookClassesMobile() {
    if (isMobile()) {
        // Clear all positioning classes first
        book.classList.remove('first-page', 'last-page', 'in-middle');
        
        // Apply appropriate class based on current location
        if (currentLocation === 1) {
            book.classList.add('first-page');
        } else if (currentLocation === maxLocation) {
            book.classList.add('last-page');
        } else {
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
        updateBookClassesMobile(); // Updated function name
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
        updateBookClassesMobile(); // Updated function name
    }
}

// Enable/Disable Buttons at Edges
function updateButtonState() {
    prevBtn.disabled = currentLocation === 1;
    nextBtn.disabled = currentLocation === maxLocation;
}

// Initialize button state and book position on load
updateButtonState();
updateBookClassesMobile(); // Updated function name

// Add window resize listener to update positioning if screen size changes
window.addEventListener('resize', updateBookClassesMobile);