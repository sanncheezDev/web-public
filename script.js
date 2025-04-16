const { createApp } = Vue;

createApp({
    data() {
        return {
            siteInfo: {
                fullName: "Pablo Sanchez",
                title: "Desarrollador Web Fullstack",
                description: "Apasionado del desarrollo web y la creación de experiencias digitales interactivas. Especializado en React, Vue, y Node.js.",
                profileImage: "images/logo.png"
            },
            navLinks: [
                { text: "Inicio", url: "#home", isActive: true },
                { text: "Habilidades", url: "#skills", isActive: false },
                { text: "Contacto", url: "#contact", isActive: false }
            ],
            socialLinks: [
                { name: "GitHub", url: "https://github.com/sanncheezdev", icon: "fab fa-github" },
                { name: "Twitter", url: "https://twitter.com/sanncheezdev", icon: "fab fa-twitter" },
                { name: "LinkedIn", url: "https://linkedin.com/in/pablosanchezdev", icon: "fab fa-discord" },
            ],
            skills: [
                { name: "HTML5", icon: "fab fa-html5" },
                { name: "CSS3", icon: "fab fa-css3-alt" },
                { name: "JavaScript", icon: "fab fa-js" },
                { name: "Vue.js", icon: "fab fa-vuejs" },
                { name: "PHP", icon: "fab fa-php" },
                { name: "Lua", icon: "fas fa-moon" },
            ],
            mobileMenuOpen: false,
            scrollTicking: false
        };
    },
    mounted() {
        this.applyInitialAnimations();
        
        // Usar un evento de scroll con throttling
        window.addEventListener('scroll', this.handleScrollThrottled);
        
        // Configurar IntersectionObserver una vez
        this.setupScrollAnimations();
        
        // Aplicar estado activo inicial
        this.updateActiveNavLink();
    },
    beforeUnmount() {
        // Limpiar eventos para evitar memory leaks
        window.removeEventListener('scroll', this.handleScrollThrottled);
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            document.querySelector('.menu-button').classList.toggle('active');
        },
        handleScrollThrottled() {
            // Throttling para evitar demasiadas llamadas durante el scroll
            if (!this.scrollTicking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.scrollTicking = false;
                });
                this.scrollTicking = true;
            }
        },
        handleScroll() {
            const header = document.querySelector('header');
            const backToTop = document.querySelector('.back-to-top');
            
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                if (backToTop) backToTop.classList.add('visible');
            } else {
                header.classList.remove('scrolled');
                if (backToTop) backToTop.classList.remove('visible');
            }
            
            this.updateActiveNavLink();
        },
        updateActiveNavLink() {
            const scrollPosition = window.scrollY + 200;
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.isActive = link.url === `#${sectionId}`;
                    });
                }
            });
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        setupScrollAnimations() {
            // Configurar IntersectionObserver con un threshold bajo
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animar los elementos de la sección cuando se vuelva visible
                        const elements = entry.target.querySelectorAll('.project-card, .skill-card');
                        elements.forEach(el => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    }
                });
            }, { 
                threshold: 0.05, 
                rootMargin: '0px 0px -50px 0px' 
            });
            
            // Observar todas las secciones
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
        },
        applyInitialAnimations() {
            // Hacer visible inmediatamente la sección hero para evitar animaciones innecesarias al cargar
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.classList.add('visible');
            }
            
            // Mostrar las tarjetas visibles inmediatamente
            document.querySelectorAll('.project-card, .skill-card').forEach(el => {
                if (el.closest('section.visible')) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }
    }
}).mount('#app');