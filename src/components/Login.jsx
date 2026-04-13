import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
      // console.log(res);
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err.response.data);
      // console.log("ERR: ", err.response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 sm:px-6 py-12">
      {/* Glow */}
      <div className="absolute w-[280px] h-[280px] bg-blue-500/20 blur-[120px] rounded-full top-0 left-0"></div>
      <div className="absolute w-[280px] h-[280px] bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0"></div>

      <div
        className="relative w-full max-w-sm sm:max-w-md 
    bg-white/[0.08] backdrop-blur-2xl 
    border border-white/10 
    shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
    rounded-2xl 
    px-5 py-6 sm:px-7 sm:py-7"
      >
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-white">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-1 mb-5">
          Login to continue
        </p>

        {/* Form */}
        <div className="space-y-3">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-300">Email</label>
            <input
              value={emailId}
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          bg-white/[0.06] border border-white/10 
          text-sm text-white placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          focus:bg-white/[0.08] transition"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-300">Password</label>

            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="mt-1 w-full px-3 py-2.5 pr-14 rounded-lg 
            bg-white/[0.06] border border-white/10 
            text-sm text-white placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-blue-500 
            focus:bg-white/[0.08] transition"
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Toggle */}
              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-400 cursor-pointer hover:text-blue-300"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs mt-3 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          className="w-full mt-5 py-2.5 rounded-lg text-sm font-semibold 
      bg-gradient-to-r from-blue-500 to-purple-600 
      text-white shadow-md 
      hover:opacity-90 active:scale-95 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="text-gray-400 text-[10px]">OR</span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-400">
          Don’t have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
