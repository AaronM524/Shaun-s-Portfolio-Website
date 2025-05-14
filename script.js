// Project data in JSON format
const projectsData = [
    {
      id: 1,
      title: "App Store Platform",
      image: "images/project1.png",
      categories: ["fullstack", "featured"],
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Job Finding Platform",
      image: "images/project2.png",
      categories: ["frontend", "featured"],
      tags: ["Vue.js", "Tailwind CSS"]
    },
    {
      id: 3,
      title: "Crypto Transfer Platform",
      image: "images/project3.png",
      categories: ["web3"],
      tags: ["Solidity", "React", "Web3.js"]
    },
    {
      id: 4,
      title: "NFT Marketplace",
      image: "images/project4.png",
      categories: ["web3", "featured"],
      tags: ["Ethereum", "Next.js"]
    }
  ];
  
  // Function to create project cards from JSON data
  function createProjectCards() {
    const projectGallery = document.getElementById('project-gallery');
    projectGallery.innerHTML = ''; // Clear any existing content
    
    projectsData.forEach(project => {
      // Create category classes string
      const categoryClasses = project.categories.join(' ');
      
      // Create HTML for tags
      const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
      
      // Create project card HTML with responsive column classes
      const projectCard = `
        <div class="col-12 col-sm-6 col-lg-4 filter-item ${categoryClasses}">
          <div class="project-card">
            <div class="project-img">
              <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
              <h5>${project.title}</h5>
              <div class="project-tags">
                ${tagsHTML}
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Add the project card to the gallery
      projectGallery.innerHTML += projectCard;
    });
  }
  
  // Project Filtering Logic
  document.addEventListener('DOMContentLoaded', function() {
    // Create project cards from JSON data
    createProjectCards();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.filter-item');
    
    // Show all projects initially (featured first)
    filterProjects('all');
    
    // Add click events to filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        filterProjects(filterValue);
      });
    });
    
    function filterProjects(filter) {
      projectItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });

   window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 1000) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
  