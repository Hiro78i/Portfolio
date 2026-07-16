document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const assetBase = window.location.pathname.includes('/portfolio/') ? '../images' : 'images';

    const closeMenu = () => {
        if (!menuToggle || !navLinks) return;
        menuToggle.classList.remove('active');
        navLinks.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('show');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            body.classList.toggle('menu-open', isOpen);
        });

        document.addEventListener('click', (event) => {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const selector = anchor.getAttribute('href');
            if (!selector || selector === '#') return;
            const target = document.querySelector(selector);
            if (!target) return;
            event.preventDefault();
            const headerOffset = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
            closeMenu();
        });
    });

    const sections = [...document.querySelectorAll('main section[id]')];
    const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navAnchors.forEach((link) => {
                    const active = link.getAttribute('href') === '#' + entry.target.id;
                    link.classList.toggle('active', active);
                    if (active) link.setAttribute('aria-current', 'page');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    const animatedItems = document.querySelectorAll('.animate-card');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        animatedItems.forEach((item) => revealObserver.observe(item));
    } else {
        animatedItems.forEach((item) => item.classList.add('in-view'));
    }

    const projectImages = {
        'Smart Ticketing Website': [
            'Project1/1-B.jpg',
            'Project1/1-C.jpg',
            'Project1/1-D.jpg',
            'Project1/1-E.jpg',
            'Project1/1-F.jpg',
            'Project1/1-G.jpg',
            'Project1/1-I.jpg'
        ],
        'Resource Allocation and Tracking Engine': [
            'Project2/Screenshot (179).png',
            'Project2/Screenshot (180).png',
            'Project2/Screenshot (181).png',
            'Project2/Screenshot (182).png',
            'Project2/Screenshot (183).png',
            'Project2/Screenshot (184).png',
            'Project2/Screenshot (185).png',
            'Project2/Screenshot (186).png',
            'Project2/Screenshot (187).png',
            'Project2/Screenshot (188).png',
            'Project2/Screenshot (189).png',
            'Project2/Screenshot (190).png',
            'Project2/Screenshot (191).png',
            'Project2/Screenshot (192).png',
            'Project2/Screenshot (193).png',
            'Project2/Screenshot (194).png',
            'Project2/Screenshot (195).png',
            'Project2/Screenshot (196).png'
        ],
        'E-Bida CamNorte Website': [
            'Project4/Screenshot (147).png',
            'Project4/Screenshot (148).png',
            'Project4/Screenshot (149).png',
            'Project4/Screenshot (150).png'
        ],
        'Fish Monitoring Website': [
            'Project3/Screenshot (143).png',
            'Project3/Screenshot (144).png',
            'Project3/Screenshot (145).png',
            'Project3/Screenshot (146).png'
        ]
    };

    const projectModal = document.getElementById('projectModal');
    const gallery = document.getElementById('projectImageGallery');
    const fullImageModal = document.getElementById('fullImageModal');
    const fullImage = document.getElementById('fullImage');
    let lastFocusedElement = null;

    const setModalState = (modal, isOpen) => {
        if (!modal) return;
        modal.classList.toggle('show', isOpen);
        body.classList.toggle('modal-open', isOpen);
        if (isOpen) {
            lastFocusedElement = document.activeElement;
            modal.querySelector('.close-button')?.focus();
        } else if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    const buildCarousel = (projectName, images) => {
        if (!gallery) return;
        gallery.replaceChildren();
        let currentIndex = 0;

        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        const track = document.createElement('div');
        track.className = 'carousel-track';

        images.forEach((relativePath, index) => {
            const image = document.createElement('img');
            image.src = assetBase + '/' + relativePath;
            image.className = 'carousel-img';
            image.alt = projectName + ' preview ' + (index + 1);
            image.loading = index === 0 ? 'eager' : 'lazy';
            track.appendChild(image);
        });

        const previous = document.createElement('button');
        previous.type = 'button';
        previous.className = 'carousel-btn prev';
        previous.setAttribute('aria-label', 'Previous image');
        previous.innerHTML = '&#10094;';

        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'carousel-btn next';
        next.setAttribute('aria-label', 'Next image');
        next.innerHTML = '&#10095;';

        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';

        const update = () => {
            track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
            indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
                indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
        };

        images.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.className = 'indicator' + (index === 0 ? ' active' : '');
            indicator.setAttribute('aria-label', 'Go to image ' + (index + 1));
            indicator.addEventListener('click', () => {
                currentIndex = index;
                update();
            });
            indicators.appendChild(indicator);
        });

        previous.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            update();
        });
        next.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            update();
        });

        carousel.append(track, previous, next, indicators);
        gallery.appendChild(carousel);
    };

    document.querySelectorAll('.view-project-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const projectName = button.dataset.project;
            const images = projectImages[projectName];
            if (!images?.length) return;
            buildCarousel(projectName, images);
            setModalState(projectModal, true);
        });
    });

    projectModal?.querySelector('.close-button')?.addEventListener('click', () => {
        setModalState(projectModal, false);
    });

    gallery?.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLImageElement) || !fullImage || !fullImageModal) return;
        fullImage.src = event.target.src;
        fullImage.alt = event.target.alt;
        projectModal?.classList.remove('show');
        fullImageModal.classList.add('show');
        fullImageModal.querySelector('.close-button')?.focus();
    });

    fullImageModal?.querySelector('.full-image-close')?.addEventListener('click', () => {
        fullImageModal.classList.remove('show');
        projectModal?.classList.add('show');
        projectModal?.querySelector('.close-button')?.focus();
    });

    [projectModal, fullImageModal].forEach((modal) => {
        modal?.addEventListener('click', (event) => {
            if (event.target !== modal) return;
            setModalState(modal, false);
            projectModal?.classList.remove('show');
            fullImageModal?.classList.remove('show');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (fullImageModal?.classList.contains('show')) {
            fullImageModal.classList.remove('show');
            projectModal?.classList.add('show');
            projectModal.querySelector('.close-button')?.focus();
            return;
        }
        if (projectModal?.classList.contains('show')) {
            setModalState(projectModal, false);
        }
        closeMenu();
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitButton.innerHTML;
            submitButton.textContent = 'Sending…';
            submitButton.disabled = true;

            let contactNumber = contactForm.querySelector('[name="contact_number"]');
            if (!contactNumber) {
                contactNumber = document.createElement('input');
                contactNumber.type = 'hidden';
                contactNumber.name = 'contact_number';
                contactForm.appendChild(contactNumber);
            }
            contactNumber.value = String(Math.floor(Math.random() * 100000));

            try {
                if (!window.emailjs) throw new Error('Email service is unavailable.');
                await window.emailjs.sendForm('service_0qt2ash', 'template_33f829a', contactForm);
                if (window.Swal) {
                    await window.Swal.fire({
                        title: 'Message sent',
                        text: 'Thank you for reaching out. I will get back to you soon.',
                        icon: 'success',
                        confirmButtonColor: '#b69a60',
                        background: '#06111f',
                        color: '#ffffff'
                    });
                }
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS error:', error);
                if (window.Swal) {
                    await window.Swal.fire({
                        title: 'Message not sent',
                        text: 'Please email me directly at villagracialander@gmail.com.',
                        icon: 'error',
                        confirmButtonColor: '#b69a60',
                        background: '#06111f',
                        color: '#ffffff'
                    });
                }
            } finally {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
            }
        });
    }
});
