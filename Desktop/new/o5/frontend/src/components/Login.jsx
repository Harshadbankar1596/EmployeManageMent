import React, { useState } from 'react';
import { useGetusersQuery } from '../redux/apislice';
import { setUser } from '../redux/Registerslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: users, isFetching, isLoading, error: fetchError } = useGetusersQuery();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState(''); 

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setLoginError(''); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!users) {
      setLoginError('Users data not loaded. Please try again later.');
      return;
    }

    const foundUser = users.find(u =>
      u.email === credentials.email &&
      u.password === credentials.password
    );

    if (foundUser) {
      console.log('Login success:', foundUser);
      dispatch(setUser(foundUser));
       navigate('/');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  if (isLoading || isFetching) {
    return <p className="text-center mt-8">Loading...</p>;
  }
  if (fetchError) {
    return <p className="text-center mt-8 text-red-500">Error fetching users.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loginError && (
            <p className="text-red-500 text-sm mt-1">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
