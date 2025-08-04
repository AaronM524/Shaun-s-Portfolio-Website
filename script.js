// Navbar scroll behavior and active navigation
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
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
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
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

// Video handling with improved loading
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const heroSection = document.querySelector('.hero-section');
    
    if (video) {
        // Ensure video properties are set
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        
        // Force load the video
        video.load();
        
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            // Try to play the video
            video.play().catch(e => {
                console.log('Video autoplay blocked:', e);
            });
        });
        
        video.addEventListener('error', function(e) {
            console.log('Video error:', e);
            heroSection.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)';
        });
        
        // Set a reasonable timeout for video loading
        setTimeout(() => {
            if (video.readyState < 2) { // HAVE_CURRENT_DATA
                console.log('Video taking too long to load, using fallback');
                heroSection.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)';
            }
        }, 5000);
    }
});

// Simple Typewriter Animation
class SimpleTypewriter {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseDelay = options.pauseDelay || 2000;
        
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
                setTimeout(() => this.type(), 500);
                return;
            }
            
            setTimeout(() => this.type(), this.deleteSpeed);
        } else {
            // Typing characters
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentPhrase.length) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseDelay);
                return;
            }
            
            setTimeout(() => this.type(), this.typeSpeed);
        }
    }
}

// Initialize the simple typewriter animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedTextElement = document.getElementById('animatedText');
    
    if (animatedTextElement) {
        const phrases = [
            'Full Stack Developer',
            'Problem Solver',
            'Sushi Enthusiast',
            'Lifelong Learner',
            'Soccer Fan',
            'AWS & Azure Certified Developer'
        ];
        
        // Create the simple typewriter
        new SimpleTypewriter(animatedTextElement, phrases, {
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseDelay: 2500
        });
    }
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
    activeFilter: 'all'
  },
  computed: {
    filteredProjects() {
      return this.activeFilter === 'all'
        ? this.projects
        : this.projects.filter(p => p.category === this.activeFilter);
    }
  }
});


