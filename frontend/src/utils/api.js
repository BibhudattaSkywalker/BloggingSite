import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api/auth' });

// Interceptor to add the token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (newBlog) => API.post('/createBlog', newBlog);
export const commentOnBlog = (id, comment) => API.post(`/blogs/${id}/comment`, comment);
export const likeBlog = (id) => API.post(`/blogs/${id}/like`);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
export const likeOnComment = (id) => API.post(`/like/${id}`);
export const replyOnComment = (id,text) => API.post(`/reply/${id}`,text);
export const fetchProfile = () => API.get(`/getProfile`);

