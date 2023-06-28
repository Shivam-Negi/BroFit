import React from 'react';
import PropTypes from 'prop-types';
import '../css/CapsuleButton.css';

const CapsuleButton = ({ text, onClick, color }) => {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button
      className="md:flex flex-row justify-end md:ml-8 text-xl capsule-button"
      style={buttonStyle}
      onClick={onClick}>
      {text}
    </button>
  );
};

CapsuleButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default CapsuleButton;
