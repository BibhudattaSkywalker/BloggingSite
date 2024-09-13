import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../utils/api';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const { data } = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <div className="relative overflow-hidden ">
      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 px-8">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="relative flex flex-col text-gray-900 rounded-lg  hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[300px] rounded-t-lg bg-slate-50 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
              width="1216"
              height="640"
            />
            <div className="p-4">
              <h3 className="text-slate-900 font-semibold text-lg">
                <span className="block text-sm text-indigo-500">{blog.category}</span>
                {blog.title}
              </h3>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <img
                    alt={blog.author.name}
                    src={blog.author.image || 'https://via.placeholder.com/40'}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
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

                <time dateTime={blog.createdAt} className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </time>
              </div>

              <div className="text-slate-600 mt-4">
                <p>{blog.desc}</p>
              </div>

              <a
                className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
                href={`/blogs/${blog._id}`}
              >
                Learn more
                <span className="sr-only">{blog.title}</span>
                <svg
                  className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0L3 3L0 6"></path>
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
