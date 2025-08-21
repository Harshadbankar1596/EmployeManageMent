

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userslice/userslice";
import { useLoginUserMutation } from "../../redux/apislice";
import { useMatchFaceMutation } from "../../redux/apislice";
import { FaSpinner } from "react-icons/fa";


const Login = () => {
  const [matchFace, { isLoading }] = useMatchFaceMutation();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoadingLogin, isError }] = useLoginUserMutation();
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) return;
    const handleBodyClick = () => setSuccess(false);
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [success]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {


    e.preventDefault();
    setErrors({});
    setSubmitError("");
    try {


      const res = await loginUser(form).unwrap();
      console.log("res", res)

      dispatch(setUser({ user: res.user, token: res.token }));
      setSuccess(true);
      setForm({ email: "", password: "", remember: false });

      if (res.user.isadmin === "superadmin") {
        setTimeout(() => {
          setSuccess(false);
          navigate("/superadmin/employees");
        }, 1000);
      }
     else if (res.user.isadmin === "admin") {
        setTimeout(() => {
          setSuccess(false);
          navigate("/admin/employees");
        }, 1000);
      }
      else {
        setTimeout(() => {
          setSuccess(false)
          navigate("/");
        }, 1000);
      }

      if (isError) {
        alert("Login failed" + " " + res.message);
      }

    } catch (err) {

      let errorMsg = "Invalid credentials";
      if (err && err.data && err.data.message) {
        errorMsg = err.data.message;
      }
      setErrors({
        email: errorMsg,
        password: errorMsg,
      });
      setSubmitError(errorMsg);
    }
  };


  // capture

  useEffect(() => {
    const video = document.getElementById("video");
    const constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      var stream = video.srcObject = stream;
      video.play();
    });
  }, []);


  async function capture() {

    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    if (isLoading) console.log("isLoading");
    const res = await matchFace(image).unwrap();
    console.log("res", res);

    if (res.success) {
      setSuccess(true);
      video.srcObject = null;
    } else {
      setSubmitError(res.message);
      alert("No match found");
    }

  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {success && (
        <div className="fixed z-40 top-10 w-full h-full flex justify-center items-start pt-4">
          <div className="z-50 max-w-sm sm:max-w-md w-full mx-4 bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-5 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5 rounded-full">
                <svg
                  viewBox="0 0 48 48"
                  height="80"
                  width="80"
                  y="0px"
                  x="0px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:h-24 sm:w-24"
                >
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    y2="37.081"
                    y1="10.918"
                    x2="10.918"
                    x1="37.081"
                    id="SVGID_1__8tZkVc2cOjdg_gr1"
                  >
                    <stop stopColor="#60fea4" offset="0"></stop>
                    <stop stopColor="#6afeaa" offset=".033"></stop>
                    <stop stopColor="#97fec4" offset=".197"></stop>
                    <stop stopColor="#bdffd9" offset=".362"></stop>
                    <stop stopColor="#daffea" offset=".525"></stop>
                    <stop stopColor="#eefff5" offset=".687"></stop>
                    <stop stopColor="#fbfffd" offset=".846"></stop>
                    <stop stopColor="#fff" offset="1"></stop>
                  </linearGradient>
                  <circle
                    fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"
                    r="18.5"
                    cy="24"
                    cx="24"
                  ></circle>
                  <path
                    d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#10e36c"
                    fill="none"
                  ></path>
                  <path
                    d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#10e36c"
                    fill="none"
                  ></path>
                  <polyline
                    points="16.5,23.5 21.5,28.5 32,18"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#10e36c"
                    fill="none"
                  ></polyline>
                </svg>
              </div>
              <h4 className="text-lg sm:text-xl text-gray-100 font-semibold mb-4 sm:mb-5">
                Login was successful.
              </h4>
              <p className="text-gray-300 font-medium text-sm sm:text-base">
                Your account is activated!
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="lg:w-1/2 w-full bg-blue-900 relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden min-h-[300px] lg:min-h-screen">
        <img
          src="/loginpage.svg"
          alt="HR Operations"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6 mt-8 mb-8">
          <div className="flex flex-row gap-6">
            <div className="border-4 border-blue-400 shadow-lg h-32 w-32  rounded-full overflow-hidden z-10 bg-blue-800 flex items-center justify-center">
              <video
                className="w-full h-full object-cover z-10"
                src=""
                id="video"
                autoPlay
                muted
                playsInline
                style={{ background: "#0e1e3a" }}
              ></video>
            </div>
            <div className="border-4 border-green-400 shadow-lg h-32 w-32 rounded-full overflow-hidden z-10 bg-blue-800 flex items-center justify-center">
              <canvas width={128} height={128}
                className="w-full h-full object-cover z-10"
                id="canvas"
                style={{ background: "#0e1e3a" }}
              ></canvas>
            </div>
          </div>
          <button
            id="btn"
            onClick={capture}
            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold shadow-md hover:from-blue-600 hover:to-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Capture
          </button>
        </div>
        <div className="relative z-10 p-4 sm:p-8 lg:p-12 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 max-w-md mx-auto lg:mx-0">
            Manage all <span className="text-yellow-400">HR Operations</span>
            <br />
            from the comfort of your home.
          </h2>
          <div className="flex space-x-2 mt-6 sm:mt-8 justify-center lg:justify-start">
            <span className="w-6 h-2 sm:w-8 sm:h-2 rounded-full bg-yellow-400"></span>
            <span className="w-6 h-2 sm:w-8 sm:h-2 rounded-full bg-white opacity-50"></span>
            <span className="w-6 h-2 sm:w-8 sm:h-2 rounded-full bg-white opacity-50"></span>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
        <div className="max-w-sm sm:max-w-md w-full mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">Login</h2>
          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Login to your account.</p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1" htmlFor="email">
                E-mail Address
              </label>
              <input
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-blue-900 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="mr-3 accent-blue-900"
                  style={{ opacity: 1, backgroundColor: "#1e40af" }}
                />
                Remember me
              </label>
              <a href="#" className="text-blue-700 text-sm hover:underline">
                Reset Password?
              </a>
            </div>
            {submitError && (
              <div className="text-red-500 text-sm text-center">{submitError}</div>
            )}
            <button
              type="submit"
              className={`w-full py-2 sm:py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition text-sm sm:text-base flex items-center justify-center ${isLoadingLogin ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoadingLogin}
            >{
                isLoadingLogin ? <FaSpinner className="animate-spin h-5 w-5" /> : "Sign In"
              }</button>
          </form>
          <div className="text-center mt-4 sm:mt-6 text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

