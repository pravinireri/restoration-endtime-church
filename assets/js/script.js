// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Navbar scroll effect
  const header = document.getElementById('header');
  const logo = document.querySelector('.logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  });
  
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu a');
  
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close mobile menu when clicking on links
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Image loading
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('image-fade-in');
    });
    
    // For images that might be cached
    if (img.complete) {
      img.classList.add('image-fade-in');
    }
  });
  
  // Scroll animations
  const animatedSections = document.querySelectorAll('.animate-section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const delay = section.dataset.delay || 0;
        const animation = section.dataset.animation || 'fade-in';
        
        setTimeout(() => {
          section.classList.add('visible');
          section.style.animationName = animation;
        }, delay);
        
        observer.unobserve(section);
      }
    });
  }, observerOptions);
  
  animatedSections.forEach(section => {
    observer.observe(section);
  });
  
  // Form submission with toast notification
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMessage = document.querySelector('.toast-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      toastMessage.textContent = 'Message sent! Thank you for reaching out.';
      toast.classList.add('show');
      
      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
      
      // Reset form
      this.reset();
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      toastMessage.textContent = 'Thank you for subscribing to our newsletter!';
      toast.classList.add('show');
      
      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
      
      // Reset form
      this.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
