import React from "react";
import ReactDOM from "react-dom";
import BookingForm from "./BookingForm";

const Modal = ({ isOpen, onClose, accommodation, user }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-md p-4 relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
        >
          &times;
        </button>
        <BookingForm
          accommodation={accommodation}
          user={user}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
