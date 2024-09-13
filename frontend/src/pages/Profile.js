import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../utils/api'; // Adjust the import path as needed
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons
import { Loader } from '../components/Common/Loader';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to handle editing mode

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (loading) return <Loader/>
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button 
          onClick={handleEditClick} 
          className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
        >
          <FaEdit className="inline-block mr-2" /> Edit
        </button>
      </div>
      {profile ? (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0">
            <img 
              src={profile.image || 'https://via.placeholder.com/150'} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
            <p className="text-lg mb-2">Email: {profile.email}</p>
            <p className="text-lg mb-2">Phone: {profile.phoneNumber}</p>
            {/* Add more profile details as needed */}
          </div>
        </div>
      ) : (
        <p className="text-center mt-4">No profile information available</p>
      )}
      {isEditing && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
          <form className="bg-white p-6 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            {/* Add other input fields as needed */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
