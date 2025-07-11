import { React, useState, useEffect } from 'react';
import { useGetPostsQuery } from '../redux/apislice';
import Loader from './loader';

const Allblogs = () => {
    const { data: posts, isLoading, isError } = useGetPostsQuery();
    const [form, setform] = useState({ search: '' });
    const [filterpost, setfilterpost] = useState([]);
    const [load, setload] = useState(false);


    useEffect(() => {
        if (posts) setfilterpost(posts);
    }, [posts]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setform(prev => ({
            ...prev,
            [name]: value
        }));

        if (posts && value) {
            const filtered = posts.filter(blog =>
                blog.body.title?.toLowerCase().includes(value.toLowerCase())
            );

            setfilterpost(filtered);

            if (filtered.length === 0) {
                setload(true);
            } else {
                setload(false);
            }
        } else {
            setfilterpost(posts);
        }
    };

    return (
        <div className='flex flex-col justify-center'>
            <form className='border flex items-center justify-center p-2'>
                <input
                    type="text"
                    name='search'
                    onChange={handleChange}
                    placeholder='Search our blogs...'
                    value={form.search}
                    className='p-2 w-2/4 bg-gray-300 rounded'
                />
            </form>

            {/* {load &&} */}

            {load && <div className='m-4 p-4 bg-red-500 flex flex-col items-center justify-center rounded'>
                <h1 className='text-4xl font-bold'>Not Found</h1>
                <Loader/>
            </div>}

            {filterpost?.map((post) => (
                <div className='border m-4 p-4 rounded-2xl bg-green-400 justify-end flex flex-col' key={post.id}>
                    <p className='flex justify-end text-blue-700'>{post.email}</p>
                    <p className='font-bold text-4xl'>{post.body.title}</p>
                    <p className='text-gray-500 px-5 my-4'>{post.body.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Allblogs;
