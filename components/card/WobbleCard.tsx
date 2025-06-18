'use client';

import React from 'react';
import './WobbleCard.css';

const WobbleCard = () => {
  return (
    <div className="wobble-wrapper">
      <div className="card">
        {/* <img src="https://assets.codepen.io/3421562/figma_graphic.png" alt="Figma Graphic" /> */}
        <div className="card-content">
          <h2>Design Smarter, Not Harder</h2>
          <p>Unlock powerful tools to create pixel-perfect designs in record time.</p>

        </div>
      </div>

      <div className="accents">
        <div className="acc-card"></div>
        <div className="acc-card"></div>
        <div className="acc-card"></div>
        <div className="light"></div>
        <div className="light sm"></div>
        <div className="top-light"></div>
      </div>
    </div>
  );
};

export default WobbleCard;
