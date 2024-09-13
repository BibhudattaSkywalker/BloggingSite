import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createBlog } from '../utils/api'; // Make sure createBlog is updated to handle image URLs

const BlogForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      if (image) formData.append('image', image);

      // Send form data to the server
      await createBlog(formData);

      // Redirect to home page
      navigate('/');

      // Close the dialog
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error creating blog:', error.message);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a New Blog</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="desc">Description</label>
          <textarea
            id="desc"
            placeholder="Blog Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
