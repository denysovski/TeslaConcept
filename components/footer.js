class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background-color: #1a1a1a;
          color: white;
          padding: 3rem 2rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        .footer-logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .footer-links h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer-links ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        .footer-links a {
          color: #b3b3b3;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: white;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-links a {
          color: white;
          background-color: #333;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        .social-links a:hover {
          background-color: #444;
        }
        .copyright {
          text-align: center;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid #333;
          color: #b3b3b3;
          font-size: 0.875rem;
        }
        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <footer>
        <div class="footer-container">
          <div class="footer-about">
            <div class="footer-logo">TESLA</div>
<p class="text-gray-400">Accelerating the world's transition to sustainable energy.</p>
            <div class="social-links">
              <a href="#" aria-label="Twitter">
                <!-- Twitter -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-4.12 2.02-6.6 2.9A4.48 4.48 0 0 0 12 6.88c0 .35.04.7.12 1.03C7.72 7.8 4.1 5.6 1.67 2.15a4.48 4.48 0 0 0-.61 2.26 4.48 4.48 0 0 0 1.99 3.74 4.52 4.52 0 0 1-2.03-.56v.06a4.49 4.49 0 0 0 3.59 4.4c-.44.12-.9.18-1.38.18-.34 0-.67-.03-.99-.09.67 2.1 2.6 3.63 4.9 3.67A9 9 0 0 1 1 19.54 12.7 12.7 0 0 0 7.29 21c8.75 0 13.55-7.24 13.55-13.54v-.62A9.66 9.66 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <!-- Instagram (simple camera glyph) -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <!-- Facebook (f) -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h2z"></path></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <!-- YouTube (play) -->
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 28.68 28.68 0 0 0 1 12a28.68 28.68 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A28.68 28.68 0 0 0 23 12a28.68 28.68 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          <div class="footer-links">
            <h3>Models</h3>
            <ul>
              <li><a href="#">Model S</a></li>
              <li><a href="#">Model 3</a></li>
              <li><a href="#">Model X</a></li>
              <li><a href="#">Model Y</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Find Us</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Legal</a></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          &copy; ${new Date().getFullYear()} @denysovski on IG. All rights reserved.
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);