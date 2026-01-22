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

// Contact form submission handler - REPLACED BY EMAILJS LOGIC BELOW
// const contactForm = document.getElementById('contact-form');
//
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     // Simple form validation could be added here
//
//     alert('Thank you for your message! I will get back to you soon.');
//
//     // Reset form
//     contactForm.reset();
// });

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

    // Define project images
    const projectImages = {
        'Smart Ticketing Website': [
            'images/Project1/1-B.jpg',
            'images/Project1/1-C.jpg',
            'images/Project1/1-D.jpg',
            'images/Project1/1-E.jpg',
            'images/Project1/1-F.jpg',
            'images/Project1/1-G.jpg',
            'images/Project1/1-I.jpg'
        ],
        'Resource Allocation and Tracking Engine': [
            'images/Project2/Screenshot (179).png',
            'images/Project2/Screenshot (180).png',
            'images/Project2/Screenshot (181).png',
            'images/Project2/Screenshot (182).png',
            'images/Project2/Screenshot (183).png',
            'images/Project2/Screenshot (184).png',
            'images/Project2/Screenshot (185).png',
            'images/Project2/Screenshot (186).png',
            'images/Project2/Screenshot (187).png',
            'images/Project2/Screenshot (188).png',
            'images/Project2/Screenshot (189).png',
            'images/Project2/Screenshot (190).png',
            'images/Project2/Screenshot (191).png',
            'images/Project2/Screenshot (192).png',
            'images/Project2/Screenshot (193).png',
            'images/Project2/Screenshot (194).png',
            'images/Project2/Screenshot (195).png',
            'images/Project2/Screenshot (196).png'
        ],
        'E-Bida CamNorte Website': [
            'images/Project4/Screenshot (147).png',
            'images/Project4/Screenshot (148).png',
            'images/Project4/Screenshot (149).png',
            'images/Project4/Screenshot (150).png'
        ],
        'Fish Monitoring Website': [
            'images/Project3/Screenshot (143).png',
            'images/Project3/Screenshot (144).png',
            'images/Project3/Screenshot (145).png',
            'images/Project3/Screenshot (146).png'
        ]
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling if card has listener
            const projectName = btn.getAttribute('data-project');
            const images = projectImages[projectName];

            if (images && images.length > 0) {
                // Clear previous content
                projectImageGallery.innerHTML = '';

                // Create Carousel Structure
                const carouselContainer = document.createElement('div');
                carouselContainer.className = 'carousel';
                
                const track = document.createElement('div');
                track.className = 'carousel-track';
                
                images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'carousel-img';
                    img.alt = `${projectName} Image ${index + 1}`;
                    track.appendChild(img);
                });

                carouselContainer.appendChild(track);

                // Add Navigation Buttons
                const prevBtn = document.createElement('button');
                prevBtn.className = 'carousel-btn prev';
                prevBtn.innerHTML = '&#10094;';
                
                const nextBtn = document.createElement('button');
                nextBtn.className = 'carousel-btn next';
                nextBtn.innerHTML = '&#10095;';
                
                carouselContainer.appendChild(prevBtn);
                carouselContainer.appendChild(nextBtn);

                // Add Indicators
                const indicatorsContainer = document.createElement('div');
                indicatorsContainer.className = 'carousel-indicators';
                images.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                    indicator.addEventListener('click', () => goToSlide(index));
                    indicatorsContainer.appendChild(indicator);
                });
                carouselContainer.appendChild(indicatorsContainer);

                projectImageGallery.appendChild(carouselContainer);
                projectModal.classList.add('show');

                // Carousel Logic
                let currentIndex = 0;
                
                function updateCarousel() {
                    track.style.transform = `translateX(-${currentIndex * 100}%)`;
                    // Update indicators
                    const indicators = indicatorsContainer.querySelectorAll('.indicator');
                    indicators.forEach((ind, idx) => {
                        ind.classList.toggle('active', idx === currentIndex);
                    });
                }

                function goToSlide(index) {
                    currentIndex = index;
                    updateCarousel();
                }

                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateCarousel();
                });

                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentIndex = (currentIndex + 1) % images.length;
                    updateCarousel();
                });

            } else {
                console.warn('No images found for project:', projectName);
            }
        });
    });

    // Remove the old card click listener if possible, or just ensure the button handles it.
    // The previous implementation added listeners to projectCards. We should remove that block or ensure it doesn't conflict.
    // Since I'm replacing the block that added listeners to projectCards, it's fine.


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

// Contact Form Logic (EmailJS)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        // Generate a random number for the contact number variable
        // This assumes your EmailJS template uses {{contact_number}}
        if (!contactForm.contact_number) {
             const hiddenInput = document.createElement('input');
             hiddenInput.type = 'hidden';
             hiddenInput.name = 'contact_number';
             contactForm.appendChild(hiddenInput);
        }
        contactForm.contact_number.value = Math.random() * 100000 | 0;

        // These IDs from the previous step are placeholders.
        // You MUST update them with your actual Service ID and Template ID.
        emailjs.sendForm('service_0qt2ash', 'template_33f829a', this)
            .then(function() {
                // Success!
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Thank you for reaching out. I will get back to you soon.',
                    icon: 'success',
                    confirmButtonColor: '#2196f3',
                    background: '#1f1f1f',
                    color: '#e0e0e0'
                });
                contactForm.reset();
            }, function(error) {
                // Failed...
                console.error('EmailJS Error:', error);
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong: ' + JSON.stringify(error),
                    icon: 'error',
                    confirmButtonColor: '#2196f3',
                    background: '#1f1f1f',
                    color: '#e0e0e0'
                });
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}
