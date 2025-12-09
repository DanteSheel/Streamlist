// src/pages/Subscriptions.jsx
import React, { useState } from 'react';
import products from "../data";
import './Subscriptions.css';

export default function Subscriptions({ onAddToCart }) {
  const [warning, setWarning] = useState('');

  function handleAdd(product) {
    const result = onAddToCart(product);

    if (result === 'subscription-exists') {
      setWarning(
        'You already have a subscription in your cart. Remove it before adding another.'
      );
    } else {
      
      setWarning('');
    }
  }

  return (
    <section className="subs">
      <h2>Subscriptions & Accessories</h2>
      <p className="subs-subtitle">
        Choose a subscription and any EZTech accessories you like. Only one subscription
        is allowed in the cart at a time, but accessories can be added multiple times.
      </p>

      {warning && <div className="subs-warning">{warning}</div>}

      <div className="subs-grid">
        {products.map((product) => (
          <article key={product.id} className="subs-card">
            <div className="subs-tag">
              {product.type === 'subscription' ? 'Subscription' : 'Accessory'}
            </div>
            <h3>{product.name}</h3>
            <p className="subs-price">${product.price.toFixed(2)}</p>
            <button
              className="subs-btn"
              onClick={() => handleAdd(product)}
            >
              <span className="material-icons">add_shopping_cart</span>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
