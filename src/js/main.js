document.addEventListener('DOMContentLoaded', function () {
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const featureCards = document.querySelectorAll('.feature-card');
  const faqCards = document.querySelectorAll('.faq-card');

  // FAQ card toggle
  faqCards.forEach(card => {
    card.addEventListener('click', function () {
      const isExpanded = this.classList.contains('expanded');

      faqCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('expanded');
        }
      });

      if (!isExpanded) {
        this.classList.add('expanded');
      } else {
        this.classList.remove('expanded');
      }
    });
  });

  // Feature card toggle
  featureCards.forEach(card => {
    card.addEventListener('click', function () {
      const isExpanded = this.classList.contains('expanded');

      featureCards.forEach(otherCard => {
        if (otherCard !== this) {
          otherCard.classList.remove('expanded');
        }
      });

      if (!isExpanded) {
        this.classList.add('expanded');
      } else {
        this.classList.remove('expanded');
      }
    });
  });

  // -----------------------------
  // RESPONSIVE SLIDER FUNCTIONALITY
  // -----------------------------
  if (sliderTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const totalSlides = sliderTrack.children.length;
    const sliderContainer = document.querySelector('.slider-container');

    function getCardWidth() {
      return sliderContainer.clientWidth;
    }

    function updateSlider() {
      const cardWidth = getCardWidth();
      sliderTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    // Button navigation
    nextBtn.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });

    // Auto slide
    let autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 5000);

    sliderContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
    sliderContainer.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      }, 5000);
    });

    // Recalculate on resize
    window.addEventListener("resize", updateSlider);

    // Touch swipe support
    let startX = 0;
    let endX = 0;

    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener("touchend", () => {
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff < 0 && currentSlide < totalSlides - 1) {
          currentSlide++;
        } else if (diff > 0 && currentSlide > 0) {
          currentSlide--;
        }
        updateSlider();
      }

      startX = 0;
      endX = 0;
    });

    updateSlider();
  } else {
    if (!sliderTrack) console.warn('sliderTrack not found — slider setup skipped.');
    if (!prevBtn) console.warn('prevBtn not found — slider setup skipped.');
    if (!nextBtn) console.warn('nextBtn not found — slider setup skipped.');
  }

  // -----------------------------
  // Header interaction (unchanged)
  // -----------------------------
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.getElementById("menuIcon");
  const desktopSocials = document.querySelector(".social-icons-desktop");
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname;

  // Mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("hidden");
      if (!isOpen) {
        menuIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
        `;
        desktopSocials.classList.add("hidden");
      } else {
        menuIcon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        `;
        if (window.innerWidth >= 768) {
          desktopSocials.classList.remove("hidden");
        }
      }
    });
  }

  // Show/hide socials for responsive layout
  function handleResize() {
    if (!desktopSocials || !navMenu) return;
    if (window.innerWidth < 768) {
      desktopSocials.classList.add("hidden");
      navMenu.classList.add("hidden");
    } else {
      desktopSocials.classList.remove("hidden");
      navMenu.classList.remove("hidden");
    }
  }

  if (desktopSocials && navMenu) {
    handleResize();
    window.addEventListener("resize", handleResize);
  }

  // Highlight current page
  if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      if (currentPage === href ||
        (currentPage.endsWith('/') && href === '/') ||
        (currentPage.includes('about') && href.includes('about')) ||
        (currentPage.includes('plans') && href.includes('plans'))) {

        link.classList.remove('text-[#000000e6]', 'text-[15px]');
        link.classList.add('text-orange-med', 'font-bold', 'text-small-description');
        link.classList.add('border-b-2', 'border-orange-med');
      }
    });
  }

  // Header shadow on scroll
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('drop-shadow-md');
      } else {
        header.classList.remove('drop-shadow-md');
      }
    });
  }
});
