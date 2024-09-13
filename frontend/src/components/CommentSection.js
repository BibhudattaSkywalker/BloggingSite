import React, { useEffect, useState } from 'react';
import { commentOnBlog, fetchBlog, deleteComment, likeOnComment, replyOnComment } from '../utils/api';
import { FaHeart, FaTrash, FaReply } from 'react-icons/fa'; // Icons for like, delete, and reply

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState({ id: '', text: '' });

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await fetchBlog(blogId);
        setComments(data.comments);
      } catch (error) {
        console.error('Error fetching blog comments:', error.message);
      }
    };
    getComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await commentOnBlog(blogId, { comment });
      if (newComment.data && newComment.data._id) {
        setComments([...comments, newComment.data]);
        setComment('');
      } else {
        console.error('New comment does not have an _id:', newComment);
      }
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      alert("You are not authorized to delete");
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const updatedComment = await likeOnComment(commentId);
      setComments(comments.map(comment =>
        comment._id === commentId ? updatedComment.data : comment
      ));
    } catch (error) {
      console.error('Error liking comment:', error.message);
    }
  };

  const handleReplyChange = (commentId, text) => {
    setReply({ id: commentId, text });
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    try {
      // const updatedComment = 
      await replyOnComment(commentId, { text: reply.text });
      const { data } = await fetchBlog(blogId);
      setComments(data.comments);
      setReply({ id: '', text: '' });
    } catch (error) {
      console.error('Error replying to comment:', error.message);
    }
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h3 className="text-3xl font-semibold mb-6 text-gray-800">Comments</h3>
      <ul className="space-y-8">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white mr-4">
              {comment.author?.image ? (
    <img
      src={comment.author.image}
      alt={comment.author.name}
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <span className="text-lg font-bold">{comment.author.name.charAt(0)}</span>
  )}              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-900">{comment.author?.name}</span>
                  <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mb-4">{comment.comment}</p>
                <div className="flex items-center space-x-6 text-gray-600">
                  <button
                    onClick={() => handleLikeComment(comment._id)}
                    className="flex items-center text-red-500 hover:text-red-600"
                  >
                    <FaHeart className="mr-2" /> {comment.like || 0}
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="flex items-center text-red-500 hover:text-red-600"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <button
                    onClick={() => setReply({ id: comment._id, text: '' })}
                    className="flex items-center text-blue-500 hover:text-blue-600"
                  >
                    <FaReply className="mr-2" /> Reply
                  </button>
                </div>
                {reply.id === comment._id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="mt-4">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={reply.text}
                      onChange={(e) => handleReplyChange(comment._id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Post Reply
                    </button>
                  </form>
                )}
                {comment.replies.length > 0 && (
                  <ul className="mt-6 ml-10 space-y-4">
                    {comment.replies.map(reply => (
                      <li key={reply._id} className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white mr-3">
                        {reply.author?.image ? (
    <img
      src={reply.author.image}
      alt={reply.author.name}
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <span className="text-sm font-bold">{reply.author.name}</span>
  )}                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900">{reply.author?.name}</span>
                            <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-700">{reply.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="mt-8">
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
