import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');

  .empty-orders-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 420px;
    padding: 2rem;
    font-family: 'DM Sans', sans-serif;
  }

  .empty-orders-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 340px;
    width: 100%;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  .empty-orders-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cart-icon-wrap {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #f5f3ee;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
  }

  .cart-icon-wrap:hover {
    transform: rotate(-6deg) scale(1.06);
  }

  .empty-orders-title {
    font-family: 'Lora', serif;
    font-size: 20px;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 0.5rem;
    letter-spacing: -0.01em;
  }

  .empty-orders-divider {
    width: 28px;
    height: 1px;
    background: #ddd;
    margin: 0.75rem auto 1rem;
  }

  .empty-orders-message {
    font-family: 'Lora', serif;
    font-size: 14.5px;
    font-style: italic;
    color: #888;
    line-height: 1.75;
    margin: 0 0 2rem;
  }

  .empty-orders-message span {
    display: block;
  }

  .empty-orders-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
    background: transparent;
    border: 1px solid #d0cec9;
    border-radius: 999px;
    padding: 9px 22px;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  }

  .empty-orders-btn:hover {
    background: #f5f3ee;
    border-color: #b0aea9;
  }

  .empty-orders-btn:active {
    transform: scale(0.97);
  }

  .btn-arrow {
    font-style: normal;
    transition: transform 0.2s ease;
  }

  .empty-orders-btn:hover .btn-arrow {
    transform: translateX(2px);
  }
`;

export default function EmptyOrders({ onBrowse }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="empty-orders-wrapper">
        <div className={`empty-orders-card ${visible ? "visible" : ""}`}>

          <div className="cart-icon-wrap">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7h3.2l4.5 18h14l3.5-12H13" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17" cy="29" r="1.8" fill="#aaa"/>
              <circle cx="26" cy="29" r="1.8" fill="#aaa"/>
              <path d="M20 15v5M17.5 17.5h5" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="empty-orders-title">No orders yet</h2>
          <div className="empty-orders-divider" />

          <p className="empty-orders-message">
            <span>Hey! It's your cart —</span>
            <span>and I've been feeling terribly lonely.</span>
            <span>You haven't placed a single order.</span>
            <span>I'm starting to think it's personal.</span>
          </p>

          <button
            className="empty-orders-btn"
            onClick={onBrowse}
          >
            Start browsing
            <span className="btn-arrow">→</span>
          </button>

        </div>
      </div>
    </>
  );
}