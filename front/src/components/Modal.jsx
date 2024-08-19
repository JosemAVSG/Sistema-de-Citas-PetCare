/* eslint-disable react/prop-types */
import{createPortal}from "react-dom";
import "../styles/modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, children }) => {

 
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content p-6 ">
        <button className="modal-close " onClick={onClose}>
          <FontAwesomeIcon className="text-2xl rounded-s-full p-2 text-white bg-red-700 hover:bg-red-500" icon={faXmark} />
        </button>
        {children}
        
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
