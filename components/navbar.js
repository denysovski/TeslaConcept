class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          color: white;
          transition: all 0.28s ease;
          padding: 1rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 900 !important;
          height: 60px;
          opacity: 0;
          animation: fadeInNav 0.8s ease forwards;
        }

        @keyframes fadeInNav {
          to {
            opacity: 1;
          }
        }

        nav.scrolled {
          background-color: #ffffff;
          color: black;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .logo img {
          filter: brightness(0) invert(1);
          transition: filter 0.25s;
          height: 45px;
          width: auto;
        }

        nav.scrolled .logo img {
          filter: none;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
          z-index: 955;
        }

        .nav-links a {
          color: inherit;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.18s;
        }

        /* use currentColor for hover underline so it follows dark/light state */
        .nav-links a:hover { color: currentColor; }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.28s;
        }
        .nav-links a:hover::after { width: 100%; }

        .nav-links a.active { color: currentColor !important; }
        .nav-links a.active::after { width: 100% !important; }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: white;
          position: relative;
        }

        nav.scrolled .mobile-menu-button {
          color: black;
        }

        /* Hamburger menu animation to X */
        .mobile-menu-button svg {
          transition: opacity 0.2s ease;
        }

        .mobile-menu-button.active .hamburger-icon {
          opacity: 0;
        }

        .mobile-menu-button.active .close-icon {
          opacity: 1;
        }

        .close-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        /* ensure svg icons inherit the color (feather icons use stroke="currentColor") */
        nav svg { color: inherit; }

        /* Scroll progress bar (appears only when scrolled) */
        .scroll-progress {
          position: fixed;
          top: 90px; /* nav height (60px) + 24px offset */
          left: 0;
          height: 3px;
          width: 0%;
          background: #b8081cff; /* black line matches scrolled state */
          opacity: 0;
          transition: width 0.08s linear, opacity 0.2s ease;
          z-index: 950; /* above page content, below mobile drawer */
          pointer-events: none;
        }

        /* Mobile side drawer: slides in from the right and starts directly below the nav (nav height: 80px) */
        .mobile-menu {
          position: fixed;
          top: 92px; /* align with navbar height */
          right: 0;
          width: 200px;
          max-width: 85vw;
          height: calc(100vh - 60px);
          transform: translateX(110%); /* hidden off-canvas */
          background-color: #ffffffff !important;
          color: #000000;
          z-index: 900 !important; /* above navbar to prevent overlay */
          transition: transform 0.36s cubic-bezier(.2,.9,.2,1);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
          overflow-y: auto;
          padding: 2rem 1.5rem 1.5rem; /* normal top padding */
          border-top-left-radius: 45px;
          border-bottom-left-radius: 45px;
        }

        /* open state brings drawer into view */
        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu ul { 
          list-style: none; 
          margin: 2rem 0 0; 
          padding: 0; 
          display: flex; 
          flex-direction: column; 
          gap: 2rem; 
          background-color: #ffffff !important;
          margin-top: 170px;
        }
        
        .mobile-menu a { 
          text-decoration: none; 
          color: #000000; 
          font-size: 1.5rem; 
          padding: 0.75rem 0; 
          display: block; 
          font-weight: 500;
          transition: transform 0.2s ease, color 0.18s ease;
          position: relative;
          padding-bottom: 0.6rem;
        }

        /* Default underline for mobile links (visible) */
        .mobile-menu a::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: currentColor;
          opacity: 0.12;
          transition: opacity 0.18s ease, transform 0.18s ease;
          transform-origin: left center;
        }

        .mobile-menu a:hover {
          transform: translateX(8px);
          color: #111;
        }

        .mobile-menu a:hover::after {
          opacity: 0.22;
        }

        /* Ensure the drawer content scrolls smoothly on iOS */
        .mobile-menu {
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-menu-button { display: block; }
        }
      </style>

      <nav>
        <a href="/" class="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" alt="Tesla Logo">
        </a>
        <button class="mobile-menu-button" id="mobile-menu-button" aria-label="Open menu">
          <svg class="hamburger-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg class="close-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <ul class="nav-links"></ul>
      </nav>

      <div id="scroll-progress" class="scroll-progress" aria-hidden="true"></div>

      <div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-hidden="true">
        <nav aria-label="Mobile navigation">
          <ul></ul>
        </nav>
      </div>
    `;

    // cache nav element and attach scroll listener from the element lifecycle so it always runs
  this._nav = this.shadowRoot.querySelector('nav');
    this._mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
    this._mobileMenu = this.shadowRoot.getElementById('mobile-menu');
  this._progressBar = this.shadowRoot.getElementById('scroll-progress');

    // render nav items from a single source so desktop and mobile stay in sync
    const navItems = [
      { href: '#experience', label: 'Experience' },
      { href: '#security', label: 'Security' },
      { href: '#models', label: 'Models' }
    ];

    const desktopUl = this.shadowRoot.querySelector('.nav-links');
    const mobileUl = this.shadowRoot.querySelector('#mobile-menu nav ul');

    if (desktopUl && mobileUl) {
      desktopUl.innerHTML = navItems.map(i => `<li><a href="${i.href}">${i.label}</a></li>`).join('');
      mobileUl.innerHTML = navItems.map(i => `<li><a href="${i.href}" data-close>${i.label}</a></li>`).join('');
    }

    // Update progress bar width based on document scroll position
    const updateProgress = () => {
      if (!this._progressBar) return;
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop || 0;
      const max = (doc.scrollHeight || body.scrollHeight) - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      this._progressBar.style.width = pct + '%';
      this._progressBar.style.opacity = scrollTop > 0 ? '1' : '0';
    };

    this._onScroll = () => {
      if (!this._nav) return;
      // when at the very top (scrollY === 0) keep transparent; else scrolled state
      if (window.scrollY > 0) {
        this._nav.classList.add('scrolled');
        // ensure mobile menu button inherits scrolled color via currentColor
      } else {
        this._nav.classList.remove('scrolled');
      }
      updateProgress();
    };

  window.addEventListener('scroll', this._onScroll);
    window.addEventListener('resize', updateProgress);
    // run once to set initial state
    this._onScroll();
    updateProgress();

    // setup mobile menu toggle inside shadow DOM
    if (this._mobileMenuButton && this._mobileMenu) {
      this._mobileMenuButton.addEventListener('click', () => {
        const open = this._mobileMenu.classList.toggle('open');
        this._mobileMenu.setAttribute('aria-hidden', !open);
        this._mobileMenuButton.classList.toggle('active', open);
        // NOTE: intentionally do NOT lock body/document scroll — keep native scrolling enabled
      });

      // close when any link inside mobile menu is clicked
      this._mobileMenu.querySelectorAll('[data-close]').forEach(link => {
        link.addEventListener('click', () => {
          this._mobileMenu.classList.remove('open');
          this._mobileMenu.setAttribute('aria-hidden', 'true');
          this._mobileMenuButton.classList.remove('active');
        });
      });

      // close drawer automatically when resizing to desktop
      this._onResize = () => {
        if (window.innerWidth > 768 && this._mobileMenu.classList.contains('open')) {
          this._mobileMenu.classList.remove('open');
          this._mobileMenu.setAttribute('aria-hidden', 'true');
          this._mobileMenuButton.classList.remove('active');
        }
      };
      window.addEventListener('resize', this._onResize);
    }

    // Active section highlighting for links inside shadow DOM
  const navLinks = this.shadowRoot.querySelectorAll('.nav-links a');
  const mobileLinks = this.shadowRoot.querySelectorAll('#mobile-menu a');
    const sections = Array.from(document.querySelectorAll('section')).filter(s => s.id);

    const setActiveFromScroll = () => {
      let current = '';
      sections.forEach(section => {
        const top = section.offsetTop;
        if (window.pageYOffset >= (top - 140)) current = section.id;
      });

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
      mobileLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    };

    window.addEventListener('scroll', setActiveFromScroll);
    // run once
    setActiveFromScroll();

    // smooth scrolling for links inside the shadow DOM (so offsets work with fixed nav)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
        }
      });
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        // close menu first
        if (this._mobileMenu) {
          this._mobileMenu.classList.remove('open');
          this._mobileMenu.setAttribute('aria-hidden', 'true');
          this._mobileMenuButton.classList.remove('active');
        }
        if (target) {
          window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
        }
      });
    });
  }

  disconnectedCallback() {
    // cleanup listener when element is removed
    if (this._onScroll) window.removeEventListener('scroll', this._onScroll);
  }
}
customElements.define('custom-navbar', CustomNavbar);