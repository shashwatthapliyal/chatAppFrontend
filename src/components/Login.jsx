import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("shashwat021@gmail.com");
  const [password, setPassword] = useState("Shashwat@120904");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(true);

    setTimeout(() => setShowPassword(false), 1000);
  };

  const handleLogin = async () => {
    try {
      // console.log(emailId, password);
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err.response.data);
      // console.log("ERR: ", err.response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 tracking-tight text-white">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            value={emailId}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:scale-[1.02]"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm text-gray-300 mb-1">Password</label>

          <div className="relative">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 sm:p-4 pr-14 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 focus:scale-[1.02]"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show Password Button */}
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-400 cursor-pointer hover:text-blue-300 transition"
            >
              Show
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mt-2 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="w-full mt-6 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Don’t have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline hover:text-blue-300 transition">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;