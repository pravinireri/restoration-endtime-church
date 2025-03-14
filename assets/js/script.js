
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Navigation functionality
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll event for header styling
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      document.body.classList.add('scrolled-down');
    } else {
      header.classList.remove('scrolled');
      document.body.classList.remove('scrolled-down');
    }
  });
  
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll('[data-animation]');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute('data-animation');
        const delay = element.getAttribute('data-animation-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animated', animation);
        }, delay);
        
        animationObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
  
  // Locations section functionality
  const locations = [
    {
      id: 1,
      name: "Embu Cathedral",
      address: "123 Faith Avenue",
      city: "Embu, Kenya",
      serviceTime: "Sundays at 9:00 AM & 11:30 AM",
      phone: "+254 704 445 890",
      image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Mwea Church",
      address: "45 Prayer Street",
      city: "Mwea, Kenya",
      serviceTime: "Sundays at 10:00 AM",
      phone: "+254 799 543 503",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Kerugoya Church",
      address: "78 Spritual Road",
      city: "Kerugoya, Kenya",
      serviceTime: "Sundays at 9:30 AM",
      phone: "+254 743 921 595",
      image: "https://images.unsplash.com/photo-1657774681168-519d9c1a4a03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Kimunye Church",
      address: "567 Grace Boulevard",
      city: "Kimunye, Kenya",
      serviceTime: "Sundays at 10:30 AM",
      phone: "+254 758 621 110",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];
  
  const locationsList = document.getElementById('locationsList');
  const locationsDropdownBtn = document.getElementById('locationsDropdownBtn');
  const locationsDropdownContent = document.getElementById('locationsDropdownContent');
  const locationDetails = document.getElementById('locationDetails');
  const selectedLocationMobile = document.getElementById('selectedLocationMobile');
  
  // Populate locations list
  if (locationsList) {
    locations.forEach((location, index) => {
      const locationButton = document.createElement('button');
      locationButton.className = `location-button ${index === 0 ? 'active' : ''}`;
      locationButton.setAttribute('data-location-id', location.id);
      locationButton.innerHTML = `
        <div class="location-button-icon">
          <i class="icon-location"></i>
        </div>
        <span>${location.name}</span>
      `;
      locationsList.appendChild(locationButton);
      
      // Add to dropdown for mobile
      const dropdownOption = document.createElement('div');
      dropdownOption.className = 'location-option';
      dropdownOption.setAttribute('data-location-id', location.id);
      dropdownOption.textContent = location.name;
      locationsDropdownContent.appendChild(dropdownOption);
      
      // Handle location selection
      locationButton.addEventListener('click', () => {
        selectLocation(location);
        
        // Update active state
        document.querySelectorAll('.location-button').forEach(btn => {
          btn.classList.remove('active');
        });
        locationButton.classList.add('active');
      });
      
      dropdownOption.addEventListener('click', () => {
        selectLocation(location);
        selectedLocationMobile.textContent = location.name;
        locationsDropdownContent.classList.remove('active');
        locationsDropdownBtn.classList.remove('active');
      });
    });
    
    // Display first location by default
    if (locations.length > 0) {
      selectLocation(locations[0]);
    }
    
    // Handle dropdown toggle
    locationsDropdownBtn.addEventListener('click', () => {
      locationsDropdownBtn.classList.toggle('active');
      locationsDropdownContent.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.locations-dropdown')) {
        locationsDropdownContent.classList.remove('active');
        locationsDropdownBtn.classList.remove('active');
      }
    });
  }
  
  function selectLocation(location) {
    if (locationDetails) {
      locationDetails.innerHTML = `
        <div class="location-image">
          <img src="${location.image}" alt="${location.name}">
        </div>
        <div class="location-info">
          <h3>${location.name}</h3>
          
          <div class="location-detail">
            <div class="location-detail-icon">
              <i class="icon-location"></i>
            </div>
            <div class="location-detail-content">
              <h4>Address</h4>
              <p>${location.address}</p>
              <p>${location.city}</p>
            </div>
          </div>
          
          <div class="location-detail">
            <div class="location-detail-icon">
              <i class="icon-clock"></i>
            </div>
            <div class="location-detail-content">
              <h4>Service Times</h4>
              <p>${location.serviceTime}</p>
            </div>
          </div>
          
          <div class="location-detail">
            <div class="location-detail-icon">
              <i class="icon-phone"></i>
            </div>
            <div class="location-detail-content">
              <h4>Phone</h4>
              <p>${location.phone}</p>
            </div>
          </div>
          
          <div class="location-actions">
            <a href="https://maps.google.com/?q=${encodeURIComponent(location.address + ', ' + location.city)}" 
               class="get-directions-btn" target="_blank" rel="noopener noreferrer">
              Get Directions
              <span class="arrow-icon">→</span>
            </a>
          </div>
        </div>
      `;
    }
  }
  
  // Handle form submissions
  const contactForm = document.getElementById('contactForm');
  const subscribeForm = document.getElementById('subscribeForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you'd send the form data to a server
      // For now, just show a success message
      showToast('Message Sent!', 'Thank you for reaching out. We\'ll get back to you shortly.');
      contactForm.reset();
    });
  }
  
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, you'd send the subscription to a server
      showToast('Subscription Successful!', 'You\'ve been added to our newsletter list.');
      subscribeForm.reset();
    });
  }
  
  // Toast notification system
  function showToast(title, message, duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3746C6.51168 20.6274 4.78465 19.2461 3.61096 17.4369C2.43727 15.6276 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986" stroke="#b69c54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="#b69c54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('hide');
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    });
    
    // Auto close after duration
    setTimeout(() => {
      if (toast.parentNode === toastContainer) {
        toast.classList.add('hide');
        setTimeout(() => {
          if (toast.parentNode === toastContainer) {
            toastContainer.removeChild(toast);
          }
        }, 300);
      }
    }, duration);
  }
  
  // Add CSS classes for animations
  const animationStyles = document.createElement('style');
  animationStyles.textContent = `
    [data-animation] {
      opacity: 0;
    }
    
    .animated.fade-in {
      animation: fadeIn 1s ease-out forwards;
    }
    
    .animated.fade-right {
      animation: fadeInRight 1s ease-out forwards;
    }
    
    .animated.fade-left {
      animation: fadeInLeft 1s ease-out forwards;
    }
    
    .animated.fade-up {
      animation: fadeInUp 1s ease-out forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(animationStyles);
});