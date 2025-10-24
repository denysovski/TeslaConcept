class CtaBanner extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .cta-banner {
          background-color: var(--volvo-blue);
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .cta-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .cta-button {
          background-color: white;
          color: var(--volvo-blue);
          padding: 0.75rem 2rem;
          border: none;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          background-color: #f0f0f0;
        }
        @media (min-width: 768px) {
          .cta-content {
            flex-direction: row;
            justify-content: space-between;
          }
          .cta-title {
            margin-bottom: 0;
          }
        }
      </style>
      <div class="cta-banner">
        <div class="cta-content">
          <div class="cta-title">Ready to experience Volvo? Book a test drive today.</div>
          <button class="cta-button">Schedule Now</button>
        </div>
      </div>
    `;
    
    this.shadowRoot.querySelector('.cta-button').addEventListener('click', () => {
      window.location.href = '#contact';
    });
  }
}
customElements.define('cta-banner', CtaBanner);