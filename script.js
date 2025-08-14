// Navbar scroll behavior and active navigation
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Toggle Back-to-Top button visibility
    if (backToTop) {
        if (window.scrollY > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
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

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
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
        this.element.style.background = 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)';
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
            'Problem Solver',
            'Creative Tech Explorer',
            'Lifelong Learner',
            'Soccer Fan',
            'AWS & Azure Certified'
        ];
        
        // Use gradient animation for big tech feel
        new GradientTextAnimator(animatedTextElement, phrases, {
            cycleDuration: 3500
        });
    }
});

// Professional Scroll Reveal Animation System
class ScrollRevealAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.observeElements());
        } else {
            this.observeElements();
        }
    }
    
    observeElements() {
        const revealElements = document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale'
        );
        
        revealElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Enhanced Theme Switcher with localStorage
class ThemeSwitcher {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.icon = this.themeToggle?.querySelector('i');
        
        this.init();
    }
    
    init() {
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        // Update icon
        if (this.icon) {
            this.icon.classList.remove('fa-moon', 'fa-sun');
            this.icon.classList.add(theme === 'dark' ? 'fa-sun' : 'fa-moon');
        }
    }
    
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Initialize professional UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    new ScrollRevealAnimator();
    
    // Initialize enhanced theme switcher
    new ThemeSwitcher();
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

const projectsData = {
  "filters": [
    { "label": "All", "value": "all" },
    { "label": "Frontend", "value": "front" },
    { "label": "Backend", "value": "back" },
  ],
  "projects": [
    {
      "id": 1,
      "category": "front",
      "title": "Fresh Finder",
      "description": "NBA stats explorer built with Flask and the NBA API. Search players/teams, view box scores, and explore stats with visuals and real-world API optimizations.",
      "image": "PNG image.png", 
      "tags": ["HTML", "Python", "CSS"],
      "codeLink": "https://github.com/ShaunM042/Fresh-Finder"
    },
    {
      "id": 2,
      "category": "front",
      "title": "Chatbot",
      "description": "This chatbot is designed to provide quick, helpful, and conversational responses to your questions or requests anytime you need.",
      "image": "Screenshot 2025-06-04 at 8.33.52 PM.png",
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

// Professional Project Modal System
class ProjectModalManager {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.currentProject = null;
        this.init();
    }
    
    init() {
        this.createModal();
        this.attachEventListeners();
    }
    
    createModal() {
        // Create modal overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'project-modal-overlay';
        this.overlay.innerHTML = `
            <div class="project-modal">
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="project-image-container">
                        <img class="project-modal-image" src="" alt="">
                    </div>
                    <div class="project-details">
                        <p class="project-description"></p>
                        <div class="tech-stack">
                            <h4>Tech Stack</h4>
                            <div class="tech-badges"></div>
                        </div>
                        <div class="project-features">
                            <h4>Key Features</h4>
                            <ul class="features-list"></ul>
                        </div>
                        <div class="project-links">
                            <a href="#" class="btn btn-primary code-link" target="_blank">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="#" class="btn btn-outline-primary demo-link" target="_blank" style="display: none;">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.overlay);
        this.modal = this.overlay.querySelector('.project-modal');
    }
    
    attachEventListeners() {
        // Close modal events
        this.overlay.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.closeModal();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Attach to project cards
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectId = parseInt(projectCard.dataset.projectId);
                if (projectId) {
                    this.showProject(projectId);
                }
            }
        });
    }
    
    showProject(projectId) {
        const project = projectsData.projects.find(p => p.id === projectId);
        if (!project) return;
        
        this.currentProject = project;
        this.populateModal(project);
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    populateModal(project) {
        // Set title and description
        this.modal.querySelector('.modal-title').textContent = project.title;
        this.modal.querySelector('.project-description').textContent = project.description;
        
        // Set image
        const img = this.modal.querySelector('.project-modal-image');
        img.src = project.image ? `images/${project.image}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        img.alt = project.title;
        
        // Populate tech stack
        const techBadges = this.modal.querySelector('.tech-badges');
        techBadges.innerHTML = project.tags.map(tag => 
            `<span class="tech-badge" data-tooltip="${tag}">${tag}</span>`
        ).join('');
        
        // Populate features
        const featuresList = this.modal.querySelector('.features-list');
        const features = project.features || ['Advanced functionality', 'Clean code architecture', 'Responsive design'];
        featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
        
        // Set links
        this.modal.querySelector('.code-link').href = project.codeLink;
        const demoLink = this.modal.querySelector('.demo-link');
        if (project.liveDemo) {
            demoLink.href = project.liveDemo;
            demoLink.style.display = 'inline-block';
        } else {
            demoLink.style.display = 'none';
        }
    }
    
    closeModal() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tooltip System for Tech Badges
class TooltipManager {
    constructor() {
        this.tooltip = null;
        this.init();
    }
    
    init() {
        this.createTooltip();
        this.attachEventListeners();
    }
    
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'custom-tooltip';
        document.body.appendChild(this.tooltip);
    }
    
    attachEventListeners() {
        document.addEventListener('mouseenter', (e) => {
            if (e.target.hasAttribute('data-tooltip')) {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.hasAttribute('data-tooltip')) {
                this.hideTooltip();
            }
        }, true);
        
        document.addEventListener('mousemove', (e) => {
            if (this.tooltip.classList.contains('visible')) {
                this.positionTooltip(e);
            }
        });
    }
    
    showTooltip(element, text) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('visible');
    }
    
    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }
    
    positionTooltip(e) {
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const x = e.clientX + 10;
        const y = e.clientY - tooltipRect.height - 10;
        
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }
}

// Professional Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.submitButton = null;
        this.statusMessage = null;
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.enhanceForm();
        this.attachEventListeners();
        this.createStatusMessage();
    }
    
    enhanceForm() {
        // Add IDs and enhanced attributes to form elements
        const nameInput = this.form.querySelector('input[placeholder*="Name"], input[placeholder*="name"]');
        const emailInput = this.form.querySelector('input[type="email"], input[placeholder*="Email"], input[placeholder*="email"]');
        const subjectInput = this.form.querySelector('input[placeholder*="Subject"], input[placeholder*="subject"]');
        const messageInput = this.form.querySelector('textarea');
        
        if (nameInput) {
            nameInput.id = 'contact-name';
            nameInput.required = true;
            nameInput.setAttribute('aria-label', 'Full Name');
        }
        
        if (emailInput) {
            emailInput.id = 'contact-email';
            emailInput.type = 'email';
            emailInput.required = true;
            emailInput.setAttribute('aria-label', 'Email Address');
        }
        
        if (subjectInput) {
            subjectInput.id = 'contact-subject';
            subjectInput.required = true;
            subjectInput.setAttribute('aria-label', 'Subject');
        }
        
        if (messageInput) {
            messageInput.id = 'contact-message';
            messageInput.required = true;
            messageInput.setAttribute('aria-label', 'Message');
            messageInput.setAttribute('minlength', '10');
        }
        
        // Find or create submit button
        this.submitButton = this.form.querySelector('button[type="submit"], input[type="submit"]');
        if (!this.submitButton) {
            this.submitButton = document.createElement('button');
            this.submitButton.type = 'submit';
            this.submitButton.className = 'btn btn-primary btn-lg';
            this.submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            this.form.appendChild(this.submitButton);
        }
    }
    
    createStatusMessage() {
        this.statusMessage = document.createElement('div');
        this.statusMessage.className = 'form-status-message';
        this.statusMessage.style.display = 'none';
        this.form.appendChild(this.statusMessage);
    }
    
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Required field validation
        if (field.required && !value) {
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
        
        // Message length validation
        if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        // Name validation
        if (field.id === 'contact-name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
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
        
        // Show loading state
        this.setLoading(true);
        this.showStatus('Sending message...', 'loading');
        
        // Simulate form submission (replace with actual endpoint)
        try {
            await this.submitForm();
            this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showStatus('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    async submitForm() {
        // Simulate API call - replace with actual form submission
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // For demo purposes, randomly succeed or fail
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }
    
    setLoading(loading) {
        const originalText = this.submitButton.innerHTML;
        
        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = originalText;
        }
    }
    
    showStatus(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `form-status-message ${type}`;
        this.statusMessage.style.display = 'block';
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.statusMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// GitHub Activity Feed
class GitHubActivityFeed {
    constructor() {
        this.username = 'ShaunM042'; // Your GitHub username
        this.container = null;
        this.maxCommits = 5;
        this.init();
    }
    
    init() {
        this.createContainer();
        this.fetchActivity();
    }
    
    createContainer() {
        // Find a good spot to inject the feed (after hero section)
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Create the activity section
        const activitySection = document.createElement('section');
        activitySection.className = 'activity-section py-5';
        activitySection.innerHTML = `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="activity-feed reveal">
                            <h3><i class="fab fa-github"></i> Recent Activity</h3>
                            <div class="activity-content">
                                <div class="loading-state">
                                    <span class="loading-spinner"></span> Loading recent commits...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after hero section
        heroSection.insertAdjacentElement('afterend', activitySection);
        this.container = activitySection.querySelector('.activity-content');
    }
    
    async fetchActivity() {
        try {
            // Fetch recent commits from public repos
            const response = await fetch(`https://api.github.com/users/${this.username}/events/public?per_page=30`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const events = await response.json();
            const pushEvents = events
                .filter(event => event.type === 'PushEvent')
                .slice(0, this.maxCommits);
            
            this.renderActivity(pushEvents);
        } catch (error) {
            console.error('Failed to fetch GitHub activity:', error);
            this.renderError();
        }
    }
    
    renderActivity(events) {
        if (events.length === 0) {
            this.container.innerHTML = `
                <div class="no-activity">
                    <i class="fas fa-code"></i>
                    <p>No recent commits found. Check back soon!</p>
                </div>
            `;
            return;
        }
        
        const activitiesHTML = events.map(event => {
            const commit = event.payload.commits[0];
            const repoName = event.repo.name.split('/')[1];
            const timeAgo = this.getTimeAgo(new Date(event.created_at));
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-code-branch"></i>
                    </div>
                    <div class="activity-details">
                        <div class="activity-header">
                            <a href="https://github.com/${event.repo.name}" target="_blank" class="repo-link">
                                ${repoName}
                            </a>
                            <span class="activity-time">${timeAgo}</span>
                        </div>
                        <div class="commit-message">
                            ${this.truncateMessage(commit.message)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.container.innerHTML = `
            <div class="activity-list">
                ${activitiesHTML}
            </div>
            <div class="activity-footer">
                <a href="https://github.com/${this.username}" target="_blank" class="btn btn-outline-primary">
                    <i class="fab fa-github"></i> View All Activity
                </a>
            </div>
        `;
    }
    
    renderError() {
        this.container.innerHTML = `
            <div class="activity-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Unable to load recent activity</p>
                <a href="https://github.com/${this.username}" target="_blank" class="btn btn-outline-primary">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `;
    }
    
    truncateMessage(message) {
        const maxLength = 80;
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    }
    
    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    }
}

// Initialize essential features only
document.addEventListener('DOMContentLoaded', function() {
    new ScrollRevealAnimator();
    new ThemeSwitcher();
    new ContactFormManager();
    new GitHubActivityFeed();
});


