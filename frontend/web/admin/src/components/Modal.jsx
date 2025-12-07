import React from "react";

const Modal = ({ children, onClose, className = "" }) => {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        {children}
        <button className="cancel-btn" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
