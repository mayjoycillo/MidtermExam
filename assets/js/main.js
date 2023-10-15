/**
* Template Name: Kelly
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/// search bar js////////


// Array of keywords
const keywords = ['Gallery', 'About', 'Services', 'Team', 'Blog', 'Index', 'Portfolio'];

// Function to redirect to a page
function redirect(keyword) {
  let sanitizedKeyword = keyword.toLowerCase().replace(/\s+/g, '-');
  window.location.href = sanitizedKeyword + '.html';
}

const searchInput = document.getElementById("search-input");
const suggestionList = document.getElementById("suggestion-list");
const searchIcon = document.getElementById("search-icon");

searchIcon.addEventListener("click", function() {
    performSearch();
});

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();
    suggestionList.innerHTML = '';

    if (searchValue.length === 0) {
        suggestionList.style.display = 'none';
        return;
    }

    // Filter and display matching suggestions
    const filteredKeywords = keywords.filter(keyword =>
        keyword.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredKeywords.length > 0) {
        filteredKeywords.forEach(keyword => {
            // Create suggestion element
            const listItem = document.createElement("li");
            listItem.textContent = keyword;

            // Add click event to redirect
            listItem.addEventListener("click", () => redirect(keyword));

            // Append suggestion to suggestion list
            suggestionList.appendChild(listItem);
        });

        suggestionList.style.display = 'block';
    }
    else {
        suggestionList.style.display = 'none';
    }
});

document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionList.contains(e.target)) {
        suggestionList.style.display = 'none';
    }
});

function performSearch() {
    const searchValue = searchInput.value.trim();
    
    if (searchValue.length > 0) {
        // Redirect to the search results page with the search query as a parameter
        window.location.href = 'search-results.html?q=' + encodeURIComponent(searchValue);
    }
}

/// chatbot///

/// popupwindow///

document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");

  function openPopup() {
     overlay.style.display = "flex";
     popup.classList.remove("popup-inactive");
     popup.classList.add("active");
  }

  function closePopup() {
     popup.classList.remove("active");
     popup.classList.add("popup-inactive");
     overlay.style.display = "none"; // Hide the overlay immediately
  }

  // Open the popup on page load
  openPopup();

  // Close the popup when clicking outside of it
  overlay.addEventListener("click", function(e) {
     if (e.target === overlay) {
        closePopup();
     }
  });
});



// time and date //

function updateDateTime() {
  const dateTimeElement = document.getElementById('datetime');
  const now = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const dateString = now.toLocaleDateString(undefined, dateOptions);
  const timeString = now.toLocaleTimeString(undefined, timeOptions);
  dateTimeElement.textContent = `Current Date and Time: ${dateString}, ${timeString}`;
}

// Call the function to update date and time immediately
updateDateTime();

// Set up an interval to update date and time every second
setInterval(updateDateTime, 1000);

// chatbot js ///

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the chatbox toggle button and the slider content
  const chatbotToggle = document.querySelector(".chatbot-toggle");
  const sliderContent = document.querySelector(".testimonials-slider");

  // Function to show or hide the slider content
  function toggleSliderVisibility() {
    if (sliderContent.style.display === "none") {
      sliderContent.style.display = "block";
    } else {
      sliderContent.style.display = "none";
    }
  }

  // Attach a click event listener to the chatbot toggle button
  chatbotToggle.addEventListener("click", toggleSliderVisibility);
});



