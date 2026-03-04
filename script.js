/* ========================================
   JOYEP Entrepreneurial Institute
   Premium JavaScript Functionality
   Features: Smooth scroll, animations, 
   forms, carousel, mobile nav
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== MOBILE NAVIGATION TOGGLE =====
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  };
  
  animateOnScroll();
  
  // ===== 3D CAROUSEL FOR HAIRDRESSING PAGE =====
  const initCarousel = () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || items.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = items.length;
    const angleStep = 360 / totalItems;
    
    const updateCarousel = (index) => {
      items.forEach((item, i) => {
        const angle = (i - index) * angleStep;
        const rad = angle * (Math.PI / 180);
        const z = Math.cos(rad) * 400;
        const x = Math.sin(rad) * 400;
        
        item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${z > 0 ? 1 : 0.7})`;
        item.style.opacity = z > 0 ? 1 : 0.6;
        item.classList.toggle('active', i === index);
        item.style.zIndex = Math.floor(z);
      });
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };
    
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel(currentIndex);
    };
    
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel(currentIndex);
    };
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
      });
    });
    
    // Initialize
    updateCarousel(currentIndex);
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-3d');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        // Could add pause logic here if needed
      });
    }
  };
  
  // Only init carousel if on hairdressing page
  if (document.querySelector('.carousel-3d')) {
    initCarousel();
  }
  
  // ===== WHATSAPP FORM SUBMISSION =====
  const setupWhatsAppForm = (formId, phoneNumber, courseFieldId = null) => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Build message based on form type
      let message = '';
      
      if (formId === 'booking-form') {
        message = `🎓 *COURSE BOOKING REQUEST*\n\n` +
                  `*Name:* ${data.name}\n` +
                  `*Phone:* ${data.phone}\n` +
                  `*Email:* ${data.email}\n` +
                  `*Course:* ${data.course}\n` +
                  `*Message:* ${data.message || 'N/A'}\n\n` +
                  `Sent from JOYEP Website`;
      } 
      else if (formId === 'application-form') {
        message = `🤝 *GROUP MEMBERSHIP APPLICATION*\n\n` +
                  `*Name:* ${data.fullname}\n` +
                  `*ID Number:* ${data.idnumber}\n` +
                  `*Phone:* ${data.phone}\n` +
                  `*Occupation:* ${data.occupation}\n` +
                  `*Location:* ${data.location}\n` +
                  `*Why Join:* ${data.whyjoin}\n\n` +
                  `Sent from JOYEP Website`;
      }
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Optional: Show success message
      alert('✅ Redirecting to WhatsApp...\n\nPlease send the pre-filled message to complete your request.');
      
      // Reset form
      form.reset();
    });
  };
  
  // Initialize forms (UPDATE PHONE NUMBER BELOW)
  // Replace '254700000000' with actual JOYEP WhatsApp number
  setupWhatsAppForm('booking-form', '254104081145', 'course');
  setupWhatsAppForm('application-form', '254104081145');
  
  // ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
  const initParallax = () => {
    const parallaxBgs = document.querySelectorAll('.hero-bg, .parallax-bg');
    
    if (parallaxBgs.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxBgs.forEach(bg => {
        const speed = 0.3;
        bg.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  };
  
  initParallax();
  
  // ===== FORM INPUT ANIMATIONS =====
  const formControls = document.querySelectorAll('.form-control');
  
  formControls.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement?.classList.remove('focused');
      }
    });
  });
  
  // ===== LAZY LOAD IMAGES (Performance) =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // ===== BACK TO TOP BUTTON (Optional Enhancement) =====
  const createBackToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-purple);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 998;
      box-shadow: 0 5px 20px rgba(90, 45, 130, 0.3);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  
  createBackToTop();
  
  // ===== CONSOLE WELCOME MESSAGE =====
  console.log(`
    ╔════════════════════════════════════╗
    ║  JOYEP Entrepreneurial Institute   ║
    ║  Premium Website Loaded ✨         ║
    ║  Turning Passion into Profession   ║
    ╚════════════════════════════════════╝
  `);
  
});

// ===== UTILITY: Debounce Function =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== UTILITY: Format Phone for WhatsApp =====
function formatWhatsAppNumber(number) {
  // Remove all non-digit characters
  let cleaned = number.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.slice(1);
  } else if (cleaned.startsWith('254')) {
    // Already correct format
  } else if (cleaned.length === 9) {
    cleaned = '254' + cleaned;
  }
  
  return cleaned;
}