import React, { useState } from 'react';
import './Wave.css';
import BlogForm from './BlogForm'; // Import the form component
import Modal from './Modal'; // Import the modal component

const WaveBackground = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative overflow-hidden bg-wave-pattern bg-no-repeat bg-cover bg-fixed py-12">
      {/* Wave Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-wave-pattern bg-no-repeat bg-cover bg-fixed opacity-50 clip-wave animate-wave"></div>

      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-black">Welcome to My Blog</h1>
        <p className="text-xl text-black mt-4">
          Explore a collection of our latest articles and updates.
        </p>
        
        {/* Create Icon Button */}
        <button
          onClick={openModal}
          className="absolute bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 4a1 1 0 011 1v6h6a1 1 0 010 2h-6v6a1 1 0 01-2 0v-6H5a1 1 0 010-2h7V5a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BlogForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default WaveBackground;
