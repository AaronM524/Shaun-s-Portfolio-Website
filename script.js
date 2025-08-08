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

// Video error handling and fallback
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const heroSection = document.querySelector('.hero-section');
    
    if (video) {
        let videoLoaded = false;
        let fallbackApplied = false;
        
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            videoLoaded = true;
        });
        
        video.addEventListener('error', function() {
            console.log('Video failed to load, using fallback background');
            if (!fallbackApplied) {
                heroSection.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)';
                fallbackApplied = true;
            }
        });
        
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Video can start playing');
            videoLoaded = true;
        });
        
        // Give video more time to load before applying autoplay
        setTimeout(() => {
            if (!videoLoaded) {
                video.play().catch(e => {
                    console.log('Autoplay failed, but video might still load:', e);
                    // Don't immediately apply fallback, give it more time
                });
            }
        }, 2000);
        
        // Only apply fallback after significant delay if video truly failed
        setTimeout(() => {
            if (!videoLoaded && !fallbackApplied) {
                console.log('Video taking too long, applying fallback');
                heroSection.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)';
                fallbackApplied = true;
            }
        }, 8000);
    }
});

// Rotating headline animation
document.addEventListener('DOMContentLoaded', function() {
    const rotatingTextElement = document.getElementById('rotatingText');
    
    if (rotatingTextElement) {
        const headlines = [
            'Full Stack Developer',
            'Real-World Problem Solver',
            'Creative Tech Explorer',
            'AWS Certified Developer'
        ];
        
        let currentIndex = 0;
        
        function rotateText() {
            // Add fade out animation
            rotatingTextElement.classList.add('fade-out');
            
            setTimeout(() => {
                // Change text after fade out completes
                currentIndex = (currentIndex + 1) % headlines.length;
                rotatingTextElement.textContent = headlines[currentIndex];
                
                // Remove fade out and trigger fade in
                rotatingTextElement.classList.remove('fade-out');
                
                // Force reflow to restart animation
                rotatingTextElement.offsetHeight;
            }, 500); // Half second for fade out
        }
        
        // Start rotation after initial load
        setTimeout(() => {
            setInterval(rotateText, 3000); // Change every 3 seconds
        }, 2000); // Wait 2 seconds before starting rotation
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


