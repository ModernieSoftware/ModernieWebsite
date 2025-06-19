'use client';

import React from 'react';
import './GlitterCard.css'; // Keep for custom animations

const GlitterCard = () => {
  return (
    <section className="glitter-section -mt-48 min-h-screen w-full flex justify-center items-center overflow-hidden relative">
      <div className="glitter-container relative flex justify-center items-center">
        <aside className="card-front">
          <label className="number ">MODERNIE</label>
          <label className="name text-center mt-5">Smarter Solutions for a Digital World</label>

          {/* <img
            className="cardLogo"
            src="https://simey-credit-card.netlify.app/img/logos/master.svg"
            alt="Mastercard Logo"
          /> */}

          {/* <svg className="contactless" viewBox="0 0 24 24" aria-label="Contactless">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
          </svg> */}
        </aside>
      </div>
    </section>
  );
};

export default GlitterCard;
