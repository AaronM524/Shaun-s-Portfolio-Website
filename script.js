// Mobile Menu Functionality
class MobileMenu {
    constructor() {
        this.toggleBtn = document.getElementById('mobileMenuToggle');
        this.closeBtn = document.getElementById('mobileMenuClose');
        this.overlay = document.getElementById('mobileMenuOverlay');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');
        this.backToTop = document.getElementById('backToTop');
        
        this.init();
    }
    
    init() {
        // Toggle menu
        this.toggleBtn.addEventListener('click', () => this.openMenu());
        this.closeBtn.addEventListener('click', () => this.closeMenu());
        
        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeMenu();
            }
        });
        
        // Close on nav link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.highlightActiveLink(link);
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        // Scroll behavior
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    openMenu() {
        this.overlay.classList.add('active');
        document.body.classList.add('menu-open');
        this.toggleBtn.style.opacity = '0.7';
    }
    
    closeMenu() {
        this.overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.toggleBtn.style.opacity = '1';
    }
    
    highlightActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    handleScroll() {
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Toggle Back-to-Top button visibility
        if (this.backToTop) {
            if (window.scrollY > 400) {
                this.backToTop.classList.add('active');
            } else {
                this.backToTop.classList.remove('active');
            }
        }
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Back-to-Top click behavior
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});

// Video handling with GitHub CDN support
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const heroSection = document.querySelector('.hero-section');
    
    if (video) {
        console.log('Attempting to load video from:', video.querySelector('source').src);
        
        // Ensure video properties are set
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.autoplay = true;
        
        let videoLoaded = false;
        
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            videoLoaded = true;
            // Try to play the video
            video.play().then(() => {
                console.log('Video is playing');
            }).catch(e => {
                console.log('Video autoplay blocked:', e);
            });
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can play');
            videoLoaded = true;
        });
        
        video.addEventListener('error', function(e) {
            console.log('Video error:', e);
            console.log('Error details:', video.error);
            applyFallback();
        });
        
        video.addEventListener('stalled', function() {
            console.log('Video loading stalled');
        });
        
        function applyFallback() {
            heroSection.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)';
            console.log('Applied fallback background');
        }
        
        // Force load the video
        video.load();
        
        // Increased timeout for CDN loading (15 seconds)
        setTimeout(() => {
            if (!videoLoaded) {
                console.log('Video timeout - applying fallback after 15 seconds');
                applyFallback();
            }
        }, 15000);
        
        // Also check if video is actually playing after some time
        setTimeout(() => {
            if (video.paused && !video.ended) {
                console.log('Video appears to be paused, attempting to play');
                video.play().catch(e => console.log('Play attempt failed:', e));
            }
        }, 3000);
    }
});

// Modern Text Animation with Smooth Transitions
class ModernTextAnimator {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentIndex = 0;
        this.isAnimating = false;
        this.options = {
            duration: options.duration || 3000,
            transitionDuration: options.transitionDuration || 800,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(20px)';
        this.element.style.transition = `all ${this.options.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        // Start animation after brief delay
        setTimeout(() => this.showNextPhrase(), 300);
    }
    
    showNextPhrase() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const currentPhrase = this.phrases[this.currentIndex];
        
        // Fade out current text
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            // Change text and animate in
            this.element.textContent = currentPhrase;
            this.element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                this.element.style.opacity = '1';
                this.element.style.transform = 'translateY(0)';
                
                // Schedule next phrase
                setTimeout(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
                    this.isAnimating = false;
                    this.showNextPhrase();
                }, this.options.duration);
            }, 50);
        }, this.options.transitionDuration / 2);
    }
}

// Advanced Gradient Text Animation
class GradientTextAnimator {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentIndex = 0;
        this.options = {
            cycleDuration: options.cycleDuration || 4000,
            ...options
        };
        
        this.setupStyles();
        this.startAnimation();
    }
    
    setupStyles() {
        this.element.style.background = 'linear-gradient(-45deg, #E3242B 0%, #dc2626 20%, #b91c1c 40%, #991b1b 60%, #dc2626 80%, #E3242B 100%)';
        this.element.style.backgroundSize = '400% 400%';
        this.element.style.webkitBackgroundClip = 'text';
        this.element.style.backgroundClip = 'text';
        this.element.style.webkitTextFillColor = 'transparent';
        this.element.style.animation = 'gradientShift 8s ease infinite';
        this.element.style.fontWeight = '700';
        this.element.style.letterSpacing = '0.5px';
    }
    
    startAnimation() {
        this.updateText();
        setInterval(() => this.updateText(), this.options.cycleDuration);
    }
    
    updateText() {
        const currentPhrase = this.phrases[this.currentIndex];
        
        // Create smooth text transition
        this.element.style.transform = 'scale(0.95)';
        this.element.style.opacity = '0.7';
        
        setTimeout(() => {
            this.element.textContent = currentPhrase;
            this.element.style.transform = 'scale(1)';
            this.element.style.opacity = '1';
            this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
        }, 200);
    }
}

// Initialize modern text animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedTextElement = document.getElementById('animatedText');
    
    if (animatedTextElement) {
        const phrases = [
            'Full Stack Developer',
            'AWS & Azure Certified Developer',
            'Backend-Focused Developer',
            'Problem Solver',
            'Sushi Enthusiast',
            'Soccer Fan'
        ];
        
        new GradientTextAnimator(animatedTextElement, phrases, {
            cycleDuration: 3500
        });
    }
});

const projectsData = {
  "filters": [
    { "label": "All", "value": "all", "description": "Show all projects" },
    { "label": "Full-Stack", "value": "front", "description": "Complete web applications with frontend and backend" },
    { "label": "Backend", "value": "back", "description": "Server-side systems, APIs, and data processing" },
  ],
  "projects": [
    {
      "id": 1,
      "category": "front",
      "title": "Fresh Finder",
      "description": "NBA stats explorer built with Flask and the NBA API. Search players/teams, view box scores, and explore stats with visuals and real-world API optimizations.",
      "tags": ["HTML", "Python", "CSS"],
      "codeLink": "https://github.com/ShaunM042/Fresh-Finder"
    },
    {
      "id": 2,
      "category": "front",
      "title": "Chatbot",
      "description": "This chatbot is designed to provide quick, helpful, and conversational responses to your questions or requests anytime you need.",
      "tags": ["HTML", "CSS", "Java"],
      "codeLink": "https://github.com/ShaunM042/Chatbot"
    },
    {
      "id": 3,
      "category": "back",
      "title": "Prerequisite", 
      "description": "This project creates a tool that checks course requirements by using lists and diagrams called directed graphs. It shows courses and their prerequisites as a flowchart (called a Directed Acyclic Graph or DAG) so students can easily see which classes they need to take first. The system helps students understand the order of courses, avoid taking classes out of sequence, and plan their schoolwork better by making sure they meet all requirements before signing up.",
      "tags": ["Java"],
      "codeLink": "https://github.com/ShaunM042/Prerequisite-Checker"
    },
    {
      "id": 4,
      "category": "back",
      "title": "Parent Bridge",
      "description": "This is a project we are working on which essentially creates a social media app tailored to schools for their specific needs.", // Fixed typo: "essentiall" -> "essentially"
      "tags": ["TypeScript"],
      "codeLink": "https://github.com/ShaunM042/ParentBridge"
    },
    {
      "id": 5,
      "category": "back",
      "title": "Weather Generator",
      "description": "A Java library that uses historical data to create and analyze simulated weather forecasts. This study uses predictive models of historical weather data to simulate patterns of precipitation in the future.",
   
      "tags": ["Java"],
      "codeLink": "https://github.com/ShaunM042/Weather-Generator"
    },
    {
      "id": 6,
      "category": "back",
      "title": "Heart-Transplant",
      "description": "This repository houses the creation of a heart transplant matching system that maximizes post-transplant survival rates by matching recipient hearts to donor hearts based on various factors",
      "tags": ["React", "API", "Geolocation"],
      "codeLink": "https://github.com/ShaunM042/Heart-Transplant"
    }
  ]
}; 

new Vue({
  el: '#app',
  data: {
    filters: projectsData.filters,
    projects: projectsData.projects,
    activeFilter: localStorage.getItem('activeProjectFilter') || 'all'
  },
  computed: {
    filteredProjects() {
      return this.activeFilter === 'all'
        ? this.projects
        : this.projects.filter(p => p.category === this.activeFilter);
    }
  },
  watch: {
    activeFilter(newVal) {
      localStorage.setItem('activeProjectFilter', newVal);
    }
  }
});

// Enhanced Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.statusDiv = document.getElementById('formStatus');
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous validation
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Minimum length validation
        if (field.hasAttribute('minlength') && value) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                errorMessage = `Must be at least ${minLength} characters long`;
            }
        }

        // Show validation result
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else if (value) {
            field.classList.add('is-valid');
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = '';
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showStatus('Please fix the errors above', 'error');
            return;
        }

        this.setLoading(true);
        this.showStatus('Sending your message...', 'info');

        try {
            const formData = new FormData(this.form);
            
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showStatus('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                this.form.reset();
                this.clearAllValidation();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            this.showStatus('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            this.submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        } else {
            this.submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    showStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = `form-status ${type}`;
        this.statusDiv.style.display = 'block';

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.statusDiv.style.display = 'none';
            }, 6000);
        }
    }

    clearAllValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => this.clearFieldError(input));
    }
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormHandler();
});

