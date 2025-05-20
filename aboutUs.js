// Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navItems = document.querySelector('.nav-items');
    
    mobileMenuBtn.addEventListener('click', function() {
        navItems.classList.toggle('active');
    });
});
        // Close mobile menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-items a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navItems.classList.remove('active');
            });
        });
