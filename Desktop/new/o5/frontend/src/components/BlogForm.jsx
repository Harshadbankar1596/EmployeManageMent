
import { useAddPostMutation } from '../redux/apislice';
import BlogList from './BlogList.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const BlogForm = () => {

  const navigate = useNavigate();

  const usermail = useSelector((state) => state.user.email);

  const [addBlog] = useAddPostMutation();

  const [blogData, setBlogData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usermail) {
      addBlog({
        email : usermail,
        body: blogData
      })
        .then(() => {
          console.log("addblog Successfully", blogData);

          setBlogData({
            title: '',
            content: ''
          })

        })
        .catch((err) => {
          console.error("Update Error:");
        });
    }

    else{
      navigate('/register');
      alert("not registred")
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            value={blogData.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Blog
          </button>
        </form>
      </div>
      <BlogList />
    </>
  );
};

export default BlogForm;
