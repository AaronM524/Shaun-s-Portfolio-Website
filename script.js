  window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 1000) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
  
// Project filtering functionality
/*document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and project cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Add click event listeners to all filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and add to clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.getAttribute('data-filter');
      
      // Show or hide projects based on selected category
      projectCards.forEach(card => {
        // If "All" is selected or card matches the selected category
        if (category === 'all' || card.getAttribute('data-category').includes(category)) {
          card.style.display = 'block';
          // Optional animation for smoother appearance
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide cards that don't match
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Match this to your CSS transition time
        }
      });
    });
  });
  
  // Initialize by activating "All" category
  document.querySelector('.filter-btn[data-filter="all"]').click();
});*/

// projects.js
// JSON representation of projects and filters
// projects.js
// Ensure you have Vue included in your index.html

    const projectsData = {
      "filters": [
        { "label": "All", "value": "all" },
        { "label": "Web Applications", "value": "web" },
        { "label": "Mobile Apps", "value": "mobile" },
        { "label": "UI/UX Design", "value": "design" }
      ],
      "projects": [
        {
          "id": 1,
          "category": "web",
          "title": "E-commerce Platform",
          "description": "A full-featured online store with product listings, cart functionality, and secure checkout.",
          "image": "https://via.placeholder.com/400/0000FF/FFFFFF?text=E-commerce",
          "tags": ["React", "Node.js", "MongoDB"],
          "liveLink": "#",
          "codeLink": "#"
        },
        {
          "id": 2,
          "category": "mobile",
          "title": "Task Management App",
          "description": "A productivity application for organizing tasks with drag-and-drop functionality and team collaboration.",
          "image": "https://via.placeholder.com/400/FF0000/FFFFFF?text=Task+App",
          "tags": ["React Native", "Firebase", "Redux"],
          "liveLink": "#",
          "codeLink": "#"
        },
        {
          "id": 3,
          "category": "design",
          "title": "Portfolio Website",
          "description": "A responsive portfolio website showcasing creative work with smooth animations and transitions.",
          "image": "https://via.placeholder.com/400/00FF00/FFFFFF?text=Portfolio",
          "tags": ["HTML5", "CSS3", "JavaScript"],
          "liveLink": "#",
          "codeLink": "#"
        },
        {
          "id": 4,
          "category": "web",
          "title": "Social Media Dashboard",
          "description": "Analytics dashboard for tracking social media metrics across multiple platforms in real-time.",
          "image": "https://via.placeholder.com/400/FFFF00/000000?text=Dashboard",
          "tags": ["Vue.js", "Express", "PostgreSQL"],
          "liveLink": "#",
          "codeLink": "#"
        },
        {
          "id": 5,
          "category": "mobile",
          "title": "Fitness Tracker",
          "description": "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
          "image": "https://via.placeholder.com/400/FF00FF/FFFFFF?text=Fitness",
          "tags": ["Flutter", "Firebase", "Dart"],
          "liveLink": "#",
          "codeLink": "#"
        },
        {
          "id": 6,
          "category": "web",
          "title": "Weather Application",
          "description": "Real-time weather forecasting app with location detection and 5-day forecasts using API integration.",
          "image": "https://via.placeholder.com/400/00FFFF/000000?text=Weather",
          "tags": ["React", "API", "Geolocation"],
          "liveLink": "#",
          "codeLink": "#"
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