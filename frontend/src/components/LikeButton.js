import React, { useState } from 'react';
import { likeBlog, fetchBlog } from '../utils/api'; // Import the required API functions

const LikeButton = ({ blogId, initialLikesCount, likedByUser, initialLikes }) => {
  const [liked, setLiked] = useState(likedByUser);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likes, setLikes] = useState(initialLikes);
  const [showLikes, setShowLikes] = useState(false);

  const handleLike = async () => {
    try {
      await likeBlog(blogId);
      setLiked(true); // Mark as liked

      // Fetch the updated blog data to get the latest likes count and liked users
      const { data } = await fetchBlog(blogId);
      setLikesCount(data.likeCount);
      setLikes(data.likes); // Update the list of liked users
    } catch (error) {
      console.error('Error liking blog:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {liked ? '❤️' : '❤️'} ({likesCount}) {/* Display the updated like count */}
      </button>
      <button
        onClick={() => setShowLikes(!showLikes)}
        className="ml-2 p-2 rounded bg-gray-300 text-black"
      >
        {showLikes ? 'Hide Likes' : 'Show Likes'}
      </button>
      {showLikes && (
        <div className="mt-2 p-2 border border-gray-300 rounded">
          <h3 className="font-bold">Liked By:</h3>
          <ul>
            {likes.map(user => (
              <li key={user._id} className="py-1">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
