document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const header = document.getElementById('mainHeader');
  const featureCards = document.querySelectorAll('.feature-card');
  const faqCards = document.querySelectorAll('.faq-card');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname;
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.getElementById("menuIcon");
  const desktopSocials = document.querySelector(".social-icons-desktop");

  // Function to toggle the mobile menu
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("hidden"); // toggle visibility
    if (!isOpen) {
      // menu is now open
      menuIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12"></path>
      `;
      desktopSocials.classList.add("hidden");
    } else {
      // menu is now closed
      menuIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"></path>
      `;
      if (window.innerWidth >= 768) {
        desktopSocials.classList.remove("hidden");
      }
    }
  });

  // Show or hide desktop socials based on screen size
  function handleResize() {
    if (window.innerWidth < 768) {
      desktopSocials.classList.add("hidden");
      navMenu.classList.add("hidden"); // ensure menu starts closed
    } else {
      desktopSocials.classList.remove("hidden");
      navMenu.classList.remove("hidden");
    }
  }

  // Run once on load
  handleResize();

  // Listen for window resizing
  window.addEventListener("resize", handleResize);
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Check if current page matches the link href
    if (currentPage === linkHref || 
        (currentPage.endsWith('/') && linkHref === '/') ||
        (currentPage.includes('about') && linkHref.includes('about')) ||
        (currentPage.includes('plans') && linkHref.includes('plans'))) {
      
      // Remove default styles and add active styles
      link.classList.remove('text-[#000000e6]', 'text-[15px]');
      link.classList.add('text-orange-med', 'font-bold', 'text-small-description');
      
      // Optional: Add an underline or other indicator
      link.classList.add('border-b-2', 'border-orange-med');
    }
  });

  faqCards.forEach(card => {
    card.addEventListener('click', function() {
      const isExpanded = this.classList.contains('expanded');
      
      // Close all other FAQ cards first
      faqCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('expanded');
        }
      });
      
      // Toggle current card
      if (!isExpanded) {
        this.classList.add('expanded');
      } else {
        this.classList.remove('expanded');
      }
    });
  });

  featureCards.forEach(card => {
    card.addEventListener('click', function() {
      const isExpanded = this.classList.contains('expanded');
      
      // Close all other cards
      featureCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('expanded');
        }
      });
      
      // Toggle current card
      if (!isExpanded) {
        this.classList.add('expanded');
      } else {
        this.classList.remove('expanded');
      }
    });
  });

  window.addEventListener('scroll', function() {
    // Add shadow when scrolled more than 10px, remove when at top
    if (window.scrollY > 10) {
      header.classList.add('drop-shadow-md');
    } else {
      header.classList.remove('drop-shadow-md');
    }
  });
  
  let currentSlide = 0;
  const totalSlides = 3;
  const cardWidth = 560; // w-140 = 560px
  
  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    
    // Update arrow states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }
  
  // Event listeners for arrows
  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });
  
  // Auto-slide (optional)
  let autoSlide = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }, 5000);
  
  // Pause auto-slide on hover
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }
      updateSlider();
    }, 5000);
  });
  
  // Initialize
  updateSlider();
});