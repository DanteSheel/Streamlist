import React from 'react';
import { useNavigate } from "react-router-dom";
import './Cart.css';

export default function CartPage({ cartItems, total, onRemoveItem, onUpdateQuantity }) {
  const hasItems = cartItems.length > 0;

  const navigate = useNavigate();
 return (
    <section className="cart">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Price</th>
                <th style={{ width: '120px' }}>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

           <div className="cart-summary">
            <span>Cart Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
            disabled={!hasItems}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </section>
  )}
