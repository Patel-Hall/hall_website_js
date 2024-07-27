import React from "react";
import { HiX } from "react-icons/hi";
import Modal from "react-modal";

interface ModalPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalPopUp = ({ isOpen, onClose, children }: ModalPopUpProps) => {
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-primary border-4 rounded-lg shadow-lg relative flex flex-col p-2"
          >
            <button
              className="w-full flex flex-row justify-end text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <HiX />
            </button>

            <div className="m-2 p-2">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalPopUp;
