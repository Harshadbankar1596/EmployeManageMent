import React, { useState } from 'react';
import { useAddusersMutation } from '../redux/apislice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Registerslice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [adduser] = useAddusersMutation();
    const [formData, setFormData] = useState({ username: '', email: '', password: ''});

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adduser(formData).unwrap();

            dispatch(setUser(formData));

            setFormData(
                {
                    username: '',
                    email: '',
                    password: ''
                }
            );

            navigate('/');

        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['username', 'email', 'password'].map((field) => (
                        <input
                            key={field}
                            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
