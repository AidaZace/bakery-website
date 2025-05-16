document.addEventListener('DOMContentLoaded', function() {
            const deliveryRadio = document.getElementById('delivery');
            const pickupRadio = document.getElementById('pickup');
            const addressField = document.getElementById('address-field');
            const addressInput = addressField.querySelector('input');
            const modal = document.getElementById('thank-you-modal');
            const closeModalBtn = document.getElementById('close-modal');
            const form = document.getElementById('cake-order-form');
            const thankYouGif = document.getElementById('thank-you-gif');
            
            // Array of cute cake-related GIFs - replace these with actual cute GIF URLs
            const cakeGifs = [
                "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie_svg.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie_svg.min.js"
            ];
            
            // Function to toggle address field
            function toggleAddressField() {
                if (deliveryRadio.checked) {
                    addressField.classList.remove('hidden');
                    addressInput.required = true;
                } else {
                    addressField.classList.add('hidden');
                    addressInput.required = false;
                }
            }
            
            // Function to show the modal with a random GIF
            function showThankYouModal() {
                // Set the modal GIF (would be random in a real implementation)
                // For placeholder, we're keeping the placeholder image
                
                // Show the modal
                modal.style.display = "flex";
                
                // Create a confetti animation using Lottie if available
                if (window.lottie) {
                    // This would initialize a Lottie animation
                    // Code for Lottie would go here
                }
            }
            
            // Initial check for address field
            toggleAddressField();
            
            // Event listeners
            deliveryRadio.addEventListener('change', toggleAddressField);
            pickupRadio.addEventListener('change', toggleAddressField);
            
            // Close modal when clicking the close button
            closeModalBtn.addEventListener('click', function() {
                modal.style.display = "none";
                // Optionally reset the form
                form.reset();
            });
            
            // Close modal when clicking outside of it
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
            
            // Form submission handling
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Here you would typically send the form data to your server
                // For now, we'll just show the thank you modal
                showThankYouModal();
            });
            
            // Load Lottie animation library (for confetti effect)
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
            document.head.appendChild(script);
            
            script.onload = function() {
                // Lottie library loaded - could initialize animations here
                console.log("Lottie library loaded");
            };
        });

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