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
          "title": "Fresh Finder",
          "description": "NBA stats explorer built with Flask and the NBA API. Search players/teams, view box scores, and explore stats with visuals and real-world API optimizations.",
          "image": "https://via.placeholder.com/400/0000FF/FFFFFF?text=E-commerce",
          "tags": ["HTML", "Python", "CSS"],
          "liveLink": "#",
          "codeLink": "https://github.com/ShaunM042/Fresh-Finder"
        },
        {
          "id": 2,
          "category": "web",
          "title": "Chatbot",
          "description": "This chatbot is designed to provide quick, helpful, and conversational responses to your questions or requests anytime you need.",
          "image": "https://via.placeholder.com/400/FF0000/FFFFFF?text=Task+App",
          "tags": ["HTML", "CSS", "Java"],
          "liveLink": "#",
          "codeLink": "https://github.com/ShaunM042/Chatbot"
        },
        {
          "id": 3,
          "category": "web",
          "title": "Prequisite",
          "description": "This repository has a requirement checker system for courses and this is done by using adjacency lists and directed graphs. The project's goal is to make course prerequisites simpler for students to understand by presenting them as a Directed Acyclic Graph (DAG).",
          "image": "https://via.placeholder.com/400/00FF00/FFFFFF?text=Portfolio",
          "tags": ["Java"],
          "liveLink": "#",
          "codeLink": "https://github.com/ShaunM042/Prerequisite-Checker"
        },
        {
          "id": 4,
          "category": "web",
          "title": "Parent Bridge",
          "description": "This is a project we are working on which essentiall creates a social media app tailored to schools for their specific needs.",
          "image": "https://via.placeholder.com/400/FFFF00/000000?text=Dashboard",
          "tags": ["TypeScript"],
          "liveLink": "#",
          "codeLink": "https://github.com/ShaunM042/ParentBridge"
        },
        {
          "id": 5,
          "category": "mobile",
          "title": "Weather Generator",
          "description": "A Java library that uses historical data to create and analyze simulated weather forecasts. This study uses predictive models of historical weather data to simulate patterns of precipitation in the future.",
          "image": "https://via.placeholder.com/400/FF00FF/FFFFFF?text=Fitness",
          "tags": ["Java"],
          "liveLink": "#",
          "codeLink": "https://github.com/ShaunM042/Weather-Generator"
        },
        {
          "id": 6,
          "category": "web",
          "title": "Heart-Transplant",
          "description": "This repository houses the creation of a heart transplant matching system that maximizes post-transplant survival rates by matching recipient hearts to donor hearts based on various factors",
          "image": "https://via.placeholder.com/400/00FFFF/000000?text=Weather",
          "tags": ["React", "API", "Geolocation"],
          "liveLink": "#",
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