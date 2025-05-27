// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navItems = document.querySelector('.nav-items');
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(event) {
        navItems.classList.toggle('active');
        // Prevent this click from triggering the document click handler
        event.stopPropagation();
    });
    
    // Close the menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-items a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navItems.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside nav
    document.addEventListener('click', function(event) {
        // Check if the click was inside the navigation or on the button
        const isNavClick = event.target.closest('.nav-items');
        const isButtonClick = event.target.closest('.mobile-menu-btn');
        
        // If click was outside nav and menu is open, close it
        if (!isNavClick && !isButtonClick && navItems.classList.contains('active')) {
            navItems.classList.remove('active');
        }
    });
});