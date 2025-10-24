class ModelCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .card-image {
          height: 220px;
          background-size: cover;
          background-position: center;
        }
        .card-content {
          padding: 1.5rem;
        }
        .model-name {
          font-family: 'Volvo Nova', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--volvo-blue);
          margin-bottom: 0.5rem;
        }
        .model-price {
          color: var(--volvo-blue);
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .model-cta {
          display: inline-block;
          background: var(--volvo-blue);
          color: white;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.3s;
        }
        .model-cta:hover {
          background: var(--volvo-darkblue);
        }
      </style>
      <div class="card">
        <div class="card-image"></div>
        <div class="card-content">
          <h3 class="model-name"></h3>
          <div class="model-price"></div>
          <a href="#" class="model-cta">Explore</a>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const image = this.getAttribute('image') || 'http://static.photos/automotive/640x360';
    const name = this.getAttribute('name') || 'Volvo Model';
    const price = this.getAttribute('price') || 'From $XX,XXX';
    
    this.shadowRoot.querySelector('.card-image').style.backgroundImage = `url(${image})`;
    this.shadowRoot.querySelector('.model-name').textContent = name;
    this.shadowRoot.querySelector('.model-price').textContent = price;
  }
}

customElements.define('model-card', ModelCard);