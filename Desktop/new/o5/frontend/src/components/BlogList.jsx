import React from 'react';
import { useGetPostsQuery } from '../redux/apislice';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const BlogList = () => {

    const usermail = useSelector(state => state.user.email);
    const { data: BlogList, error, isLoading, refetch } = useGetPostsQuery();

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (BlogList && usermail) {
            const filtered = BlogList.filter(blog => blog.email === usermail);
            setBlogs(filtered);
        }
    }, [BlogList, usermail]);

    return (
        <div className="max-w-3xl mx-auto my-8 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Latest Blogs</h2>
            {blogs?.length === 0 ? (
                <p className="text-center text-gray-600">No blogs yet. Be the first to post!</p>
            ) : (
                <div className="grid gap-6">
                    {blogs?.map((blog) => (
                        <div
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            key={blog.id}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.body.title}</h3>
                            <p className="text-gray-700">{blog.body.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
