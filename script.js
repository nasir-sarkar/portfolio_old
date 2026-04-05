document.addEventListener('DOMContentLoaded', () => {

  
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    });






    /* HEADER SCROLL */
    const header = document.getElementById('header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();


   



    

    /* MOBILE NAV */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    let mobileNavOpen = false;

    hamburger.addEventListener('click', () => {
        mobileNavOpen = !mobileNavOpen;
        mobileNav.classList.toggle('open', mobileNavOpen);
       
        const spans = hamburger.querySelectorAll('span');
        if (mobileNavOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOpen = false;
            mobileNav.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });









    /* SIDEBAR */
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    window.openSidebar = openSidebar;








    /* ACTIVE NAV LINK ON SCROLL */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header-nav a, .mobile-nav a');

    const setActiveLink = () => {
        let scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();








    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });







    /* COUNTER ANIMATION */
    const counters = document.querySelectorAll('.counter');
    const counterDecimal = document.querySelector('.counter-decimal');
    let countersStarted = false;

    function animateCounter(el, target, isDecimal = false) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }, 16);
    }

    function startCounters() {
        if (countersStarted) return;
        const hero = document.querySelector('.hero-stats');
        const rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            if (counterDecimal) {
                animateCounter(counterDecimal, 3.82, true);
            }
        }
    }

    window.addEventListener('scroll', startCounters, { passive: true });
    startCounters();









    /* SCROLL ANIMATIONS (Intersection Observer) */
    const animateEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animateEls.forEach(el => observer.observe(el));
    } else {
        animateEls.forEach(el => el.classList.add('visible'));
    }









    /* TESTIMONIAL SLIDER */
    const slides = document.querySelectorAll('.testimonial-slide');
    const authors = document.querySelectorAll('.t-author');
    let currentSlide = 0;
    let autoSlideTimer;

    function goToSlide(idx) {
        slides[currentSlide].classList.remove('active');
        authors[currentSlide].classList.remove('active');
        currentSlide = idx;
        slides[currentSlide].classList.add('active');
        authors[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, 4500);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    authors.forEach(author => {
        author.addEventListener('click', () => {
            goToSlide(parseInt(author.dataset.index));
            resetAutoSlide();
        });
    });

    startAutoSlide();









    /* NEWSLETTER FORM */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thanks for subscribing! 🎉');
            newsletterForm.reset();
        });
    }








    /* BACK TO TOP */
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
    
      const totalScrollable = docHeight - winHeight;
      const scrollPercent = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;

      backToTopBtn.style.setProperty('--scroll-percentage', `${scrollPercent}%`);

      if (scrollTop > 200) {
          backToTopBtn.classList.add('show');
      } else {
          backToTopBtn.classList.remove('show');
      }
    });








    /* TOAST NOTIFICATION */
    const toast = document.getElementById('toast');

    function showToast(message, duration = 3500) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }








    /* ADD ANIMATION CLASSES TO ELEMENTS */
    function addAnimationClasses() {
       
        document.querySelector('.hero-text')?.classList.add('fade-left');
        document.querySelector('.hero-image')?.classList.add('fade-right');

        document.querySelector('.about-img-col')?.classList.add('fade-left');
        document.querySelector('.about-info-col')?.classList.add('fade-right');

        document.querySelectorAll('.section-header').forEach(el => el.classList.add('fade-up'));

        document.querySelectorAll('.service-card').forEach((card, i) => {
            card.classList.add('fade-up');
            card.dataset.delay = i * 80;
        });

        document.querySelectorAll('.portfolio-item').forEach((item, i) => {
            item.classList.add('fade-up');
            item.dataset.delay = i * 100;
        });

        document.querySelectorAll('.edu-card').forEach((card, i) => {
            card.classList.add('fade-up');
            card.dataset.delay = i * 100;
        });

        document.querySelector('.contact-left')?.classList.add('fade-left');
        document.querySelector('.contact-right')?.classList.add('fade-right');

        document.querySelector('.skills-left')?.classList.add('fade-left');
    }

    addAnimationClasses();

    // Re-observe newly classed elements
    const newAnimEls = document.querySelectorAll('.fade-up:not(.visible), .fade-left:not(.visible), .fade-right:not(.visible)');
    if ('IntersectionObserver' in window) {
        const obs2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                    obs2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        newAnimEls.forEach(el => obs2.observe(el));
    }









    /* PORTFOLIO HOVER TILT (subtle) */
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            item.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });








    /* SKILL MARQUEE PAUSE ON HOVER */
    document.querySelectorAll('.skills-marquee').forEach(marquee => {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    });







    /* SERVICE CARD ICON INTERACTION */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = '';
        });
    });


    console.log('🚀 Nasir Sarkar Portfolio Loaded Successfully!');
    });





    


    /*  EMAILJS CONTACT FORM SUBMISSION */
    document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_h4ica9b', 'template_56cp15m', this)
        .then(function() {
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('Send failed:', error);
            alert('Failed to send message. Please try again.');
        });
   });

