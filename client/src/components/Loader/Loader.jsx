// components/Loader.jsx
import React from 'react';
import './Loader.css'; // Import the CSS file for styles

const Loader = ({ message = "Loading..." }) => (
  <div className="loader-container">
    <div className="loader"></div>
    <p>{message}</p>
  </div>
);

export default Loader;
