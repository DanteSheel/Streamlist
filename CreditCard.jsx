import React, { useEffect, useState } from "react";
import "./CreditCard.css";

export default function CreditCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("streamlist_card");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCardNumber(parsed.cardNumber || "");
        setCardName(parsed.cardName || "");
        setExpiry(parsed.expiry || "");
        setCvv(parsed.cvv || "");
      } catch (e) {
        console.error("Failed to parse saved card", e);
      }
    }
  }, []);

  function formatCardNumber(value) {
    
    const digits = value.replace(/\D/g, "").slice(0, 16);
    
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  }

  function handleCardNumberChange(e) {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Fake Numbers
    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length !== 16) {
      setMessage("Card number must be 16 digits in the format 1234 5678 9012 3456.");
      return;
    }

    const payload = {
      cardNumber,
      cardName,
      expiry,
      cvv
    };

    localStorage.setItem("streamlist_card", JSON.stringify(payload));
    setMessage("Card details saved securely in local storage (for school purposes only).");
  }

  return (
    <section className="cc-page">
      <div className="cc-card">
        <h2>Credit Card Details</h2>
        <p className="cc-note">
          This is a fake credit card management screen for StreamList. Do not use real card data.
        </p>

        <form onSubmit={handleSubmit} className="cc-form">
          <label>
            Cardholder Name
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </label>

          <label>
            Card Number
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </label>

          <div className="cc-row">
            <label>
              Expiry (MM/YY)
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="12/29"
                required
              />
            </label>

            <label>
              CVV
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
              />
            </label>
          </div>

          <button type="submit" className="cc-save-btn">
            Save Card
          </button>
        </form>

        {message && <p className="cc-message">{message}</p>}
      </div>
    </section>
  );
}
