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


