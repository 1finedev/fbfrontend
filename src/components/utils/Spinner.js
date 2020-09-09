import React from 'react';
import './Spin.css';
const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <center>
          <div className="loader" id="loader"></div>
          <div className="loader" id="loader2"></div>
          <div className="loader" id="loader3"></div>
          <div className="loader" id="loader4"></div>
          <span id="text">Forte Bridge GL...</span>
        </center>
      </div>
    </>
  );
};

export default Spinner;
