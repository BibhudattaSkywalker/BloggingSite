import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlog } from '../utils/api';
import CommentSection from '../components/CommentSection';
import LikeButton from '../components/LikeButton';
import './Wave.css'
import { Loader } from '../components/Common/Loader';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const { data } = await fetchBlog(blogId);
        setBlog(data);
      } catch (err) {
        setError('Failed to load blog. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [blogId]);

  if (loading) return <Loader/>
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white  rounded-lg ">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{blog.desc}</p>
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-auto rounded-lg mb-6 shadow-md"
        />
      )}
      <LikeButton 
        blogId={blog._id} 
        initialLikesCount={blog.likeCount} 
        likedByUser={blog.likedByUser} 
        initialLikes={blog.likes} 
      />
      <CommentSection blogId={blog._id} />
    </div>
  );
};

export default BlogDetail;
