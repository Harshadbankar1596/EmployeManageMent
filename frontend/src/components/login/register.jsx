import React, { useState } from "react";
import { useCreateUserMutation } from "../../redux/apislice";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userslice/userslice";
import { Link } from "react-router-dom";
import { RegisterSuccess, RegisterExist, RegisterFail, UploadJobFail } from "../modals/modal";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
const Register = () => {

  const dispatch = useDispatch();
  const [createUser, { isLoading: loadingadduser }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [existuser, setExistuser] = useState(false);
  const [fail, setFail] = useState(false);
  const [uploadfail, setUploadFail] = useState(false);
  const [ermessage, setermessage] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Full Stack Developer",
    terms: false,
  });

  document.body.addEventListener("click", () => {
    setSuccess(false);
    setExistuser(false);
    setFail(false);
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
    };

    try {
      const result = await createUser(userData).unwrap().then((res) => {
        setTimeout(() => {
          navigate("/login");
        }, 1000)
        dispatch(setUser(res.user));
      })

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // console.log(result);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Full Stack Developer",
        terms: false,
      })
    } catch (err) {
      console.error("Registration error:", err);
      if (err?.data?.message === "User already exists.") {
        setExistuser(true);
        setTimeout(() => {
          setExistuser(false);
        }, 3000);
      } else {
        setermessage(err?.data?.message);
        setUploadFail(true);
        setTimeout(() => {
          setUploadFail(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-screen md:flex justify-center">
      {success && <RegisterSuccess />}
      {existuser && <RegisterExist />}
      {fail && <RegisterFail />}
      {uploadfail && <UploadJobFail errorMessage={ermessage} />}
      <div className="lg:w-1/2 w-full bg-blue-900 flex items-center justify-center text-white p-4 sm:p-6 lg:p-10 relative overflow-hidden min-h-[300px] lg:min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/loginpage.svg"
            alt="bg"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative z-10 text-center lg:text-left">
          <img src="/techsuryalogo.svg" alt="" className="mx-auto lg:mx-0 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">HR Management Platform</h2>
          <p className="text-base sm:text-lg">
            Manage employees, payrolls, and all HR operations in one place.
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 w-full p-4 sm:p-6 lg:p-10 bg-white">
        <div className="max-w-sm sm:max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 sm:mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cyber Security Engineer">Cyber Security Engineer</option>
                <option value="Blockchain Developer">Blockchain Developer</option>
                <option value="Flutter Developer">Flutter Developer</option>
                <option value="React Native Developer">React Native Developer</option>
                <option value="Database Administrator">Database Administrator</option>
                <option value="HR">HR</option>
                <option value="Admin">Admin</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                minLength={6}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            {/* <div className="flex items-start mb-4 sm:mb-6">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="mr-2 mt-1"
              />
              <label className="text-sm text-gray-600">
                I agree to the terms and privacy policy
              </label>
            </div> */}

            <button
              type="submit"
              className={`w-full flex items-center justify-center bg-blue-900 text-white py-2 sm:py-3 rounded-md hover:bg-blue-800 transition-colors text-sm sm:text-base ${loadingadduser ? "opacity-50 cursor-not-allowed " : ""}`}
              disabled={loadingadduser}
            >
              {loadingadduser ? <FaSpinner className="animate-spin" /> : "Register"}
            </button>
          </form>
          <div className="text-center mt-4 sm:mt-6 text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;