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
          background-color: transparent;
          color: white;
          transition: all 0.28s ease;
          padding: 1rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          height: 80px;
        }

        nav.scrolled {
          background-color: #ffffff;
          color: black;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .logo img {
          filter: brightness(0) invert(1);
          transition: filter 0.25s;
          height: 60px;
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
        }

        nav.scrolled .mobile-menu-button {
          color: black;
        }

        /* ensure svg icons inherit the color (feather icons use stroke="currentColor") */
        nav svg { color: inherit; }

        /* Mobile side drawer: slides in from the right and starts directly below the nav (nav height: 80px) */
        .mobile-menu {
          position: fixed;
          top: 112px; /* align top with navbar height */
          right: 0;
          width: 200px;
          max-width: 85vw;
          height: calc(100vh - 80px);
          transform: translateX(110%); /* hidden off-canvas */
          background-color: #ffffff;
            color: #000000;
            z-index: 1001; /* make sure drawer is above the nav so first link isn't covered */
          transition: transform 0.36s cubic-bezier(.2,.9,.2,1);
          box-shadow: 0 18px 40px rgba(0,0,0,0.12);
            overflow-y: auto;
            padding: 4.5rem 1.5rem 1.5rem; /* increased top padding so first link sits lower and is fully visible */
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
          background-color: transparent;
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <ul class="nav-links"></ul>
      </nav>

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

    this._onScroll = () => {
      if (!this._nav) return;
      // when at the very top (scrollY === 0) keep transparent; else scrolled state
      if (window.scrollY > 0) {
        this._nav.classList.add('scrolled');
        // ensure mobile menu button inherits scrolled color via currentColor
      } else {
        this._nav.classList.remove('scrolled');
      }
    };

  window.addEventListener('scroll', this._onScroll);
    // run once to set initial state
    this._onScroll();

    // setup mobile menu toggle inside shadow DOM
    if (this._mobileMenuButton && this._mobileMenu) {
      this._mobileMenuButton.addEventListener('click', () => {
        const open = this._mobileMenu.classList.toggle('open');
        this._mobileMenu.setAttribute('aria-hidden', !open);
        // NOTE: intentionally do NOT lock body/document scroll — keep native scrolling enabled
      });

      // close when any link inside mobile menu is clicked
      this._mobileMenu.querySelectorAll('[data-close]').forEach(link => {
        link.addEventListener('click', () => {
          this._mobileMenu.classList.remove('open');
          this._mobileMenu.setAttribute('aria-hidden', 'true');
        });
      });

      // close drawer automatically when resizing to desktop
      this._onResize = () => {
        if (window.innerWidth > 768 && this._mobileMenu.classList.contains('open')) {
          this._mobileMenu.classList.remove('open');
          this._mobileMenu.setAttribute('aria-hidden', 'true');
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
        if (window.pageYOffset >= (top - 160)) current = section.id;
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
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
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
        }
        if (target) {
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
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