import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/Registerslice';
import { persistor } from '../redux/store';

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    dispatch(clearUser());
    await persistor.purge();
    navigate("/")
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-yellow-300 transition duration-300">
          MyBlog
        </Link>
      </div>
      <Link
        to="/allblogs"
        className="hover:text-yellow-300 transition bg-green-400 p-2 rounded px-4 duration-300"
      >
        All Blogs
      </Link>
      <div className="flex items-center gap-4">
        {user.username ? (
          <>
            <p className="bg-black px-4 py-2 rounded-full">🟢 {user.username}</p>

            <button
              className="bg-red-500 rounded px-4 py-2"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="hover:text-yellow-300 transition duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="hover:text-yellow-300 transition duration-300"
            >
              Login
            </Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
