import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => (
  <article className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-6">
    {/* Blog Image */}
    <div className="relative overflow-hidden rounded-lg mb-4">
      <img
        src={blog.image}
        alt={blog.title}
        className="object-cover w-full h-48 rounded-lg"
      />
    </div>

    {/* Blog Title and Date */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-900">
        <Link to={`/blogs/${blog._id}`} className="hover:text-blue-600">
          {blog.title}
        </Link>
      </h3>
      <time dateTime={blog.createdAt} className="text-sm text-gray-500">
        {new Date(blog.createdAt).toLocaleDateString()}
      </time>
    </div>

    {/* Blog Description */}
    <p className="text-gray-700 mb-4 line-clamp-3">
      {blog.desc}
    </p>

    {/* Author Section */}
    <div className="flex items-center mt-4">
      <img
        alt={blog.author.name}
        src={blog.author.image || 'https://via.placeholder.com/40'}
        className="w-10 h-10 rounded-full border-2 border-gray-200"
      />
      <div className="ml-3">
        <p className="font-semibold text-gray-900">
          <Link to={`/authors/${blog.author._id}`} className="hover:text-blue-600">
            {blog.author.name}
          </Link>
        </p>
        <p className="text-gray-600 text-sm">{blog.author.email}</p>
      </div>
    </div>

    {/* Read More Button */}
    <div className="mt-4 flex justify-end">
      <Link
        to={`/blogs/${blog._id}`}
        className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
      >
        Read More
      </Link>
    </div>
  </article>
);

export default BlogItem;
