// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});

// Project carousel functionality
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    // Auto-advance carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 5000);

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.innerHTML = '<span class="spinner"></span> Loading...';
            
            // Simulate loading state (remove in production)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = this.getAttribute('data-original-text') || this.textContent;
            }, 1000);
        }
    });
});

// Save original button text
document.querySelectorAll('.btn').forEach(button => {
    button.setAttribute('data-original-text', button.textContent);
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('in-view');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event
window.addEventListener('scroll', debounce(animateOnScroll, 10));

// Contact form submission handler
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple form validation could be added here

    alert('Thank you for your message! I will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Add JavaScript here

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');

    // --- Carousel Autoplay Logic (Keeping for structure, but not actively using interval) ---
    const carousels = document.querySelectorAll('.carousel');
    // console.log('Found carousels:', carousels.length);

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const images = Array.from(track.children);
        // console.log('Found images in carousel:', images.length);

        if (images.length > 0) {
            const imageWidth = images[0].getBoundingClientRect().width;
            // console.log('Calculated imageWidth:', imageWidth);

            // Auto-play is not active now, removed setInterval
            // const autoPlayCarousel = () => { ... };
            // if (imageWidth > 0) { setInterval(autoPlayCarousel, 3000); }
            // else { console.warn('imageWidth is 0...'); }
        } else {
            console.warn('No images found in a carousel track.');
        }
    });

    // --- Scroll Animation Logic ---
    const animateCards = document.querySelectorAll('.animate-card');
    // console.log('Found animate cards:', animateCards.length);

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // console.log('Element is intersecting:', entry.target);
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateCards.forEach(card => {
        observer.observe(card);
    });

    // --- Project Modal Logic ---
    const projectModal = document.getElementById('projectModal');
    const projectImageGallery = document.getElementById('projectImageGallery');
    const closeButton = projectModal.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Define project images (replace with your actual image paths)
    const projectImages = {
        'Smart Ticketing Website': [
            '../images/1-B.jpg',
            '../images/1-C.jpg',
            '../images/1-D.jpg',
            '../images/1-E.jpg',
            '../images/1-F.jpg',
            '../images/1-G.jpg'
        ],
        'E-Bida CamNorte Website': [
            'https://placehold.co/800x600/43a047/fff?text=E-Bida+1',
            'https://placehold.co/800x600/388e3c/fff?text=E-Bida+2',
            'https://placehold.co/800x600/1b5e20/fff?text=E-Bida+3'
        ],
        'Aquarium Monitoring Website': [
            'https://placehold.co/800x600/00bcd4/fff?text=Aquarium+1',
            'https://placehold.co/800x600/0097a7/fff?text=Aquarium+2',
            'https://placehold.co/800x600/006064/fff?text=Aquarium+3'
        ]
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;
            const images = projectImages[projectTitle];

            if (images && images.length > 0) {
                // Clear previous images
                projectImageGallery.innerHTML = '';

                // Add images to the gallery
                images.forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = projectTitle + ' Screenshot'; // Add alt text for accessibility
                    projectImageGallery.appendChild(imgElement);
                });

                // Show the modal
                projectModal.classList.add('show');
            } else {
                console.warn('No images found for project:', projectTitle);
            }
        });
    });

    // Close the project modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        projectModal.classList.remove('show');
    });

    // Close the project modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('show');
        }
    });

    // --- Full Image Modal Logic ---
    const fullImageModal = document.getElementById('fullImageModal');
    const fullImage = document.getElementById('fullImage');
    const fullImageCloseButton = fullImageModal.querySelector('.full-image-close');

    // Add event listeners to images in the project modal gallery
    projectImageGallery.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            fullImage.src = event.target.src; // Set the source of the clicked image
            fullImageModal.classList.add('show'); // Show the full image modal
        }
    });

    // Close the full image modal when the close button is clicked
    fullImageCloseButton.addEventListener('click', () => {
        fullImageModal.classList.remove('show');
    });

    // Close the full image modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === fullImageModal) {
            fullImageModal.classList.remove('show');
        }
    });

    // Section visibility on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for profile image
    const profilePic = document.querySelector('.profile-pic');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        profilePic.style.transform = `translateY(${scrolled * 0.1}px)`;
    });

    // Enhanced project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Enhanced form input animations
    document.querySelectorAll('form input, form textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Add loading shimmer effect
    function addLoadingShimmer() {
        const cards = document.querySelectorAll('.project-card, .skills-card');
        cards.forEach(card => {
            card.classList.add('loading-shimmer');
        });
    }

    // Remove loading shimmer effect
    function removeLoadingShimmer() {
        const cards = document.querySelectorAll('.project-card, .skills-card');
        cards.forEach(card => {
            card.classList.remove('loading-shimmer');
        });
    }

    // Initial loading state
    addLoadingShimmer();
    window.addEventListener('load', () => {
        setTimeout(removeLoadingShimmer, 1000);
    });

});
