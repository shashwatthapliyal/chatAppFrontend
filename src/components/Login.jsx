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
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 text-sm mt-1 mb-5">
          Login to continue
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              value={emailId}
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          border border-gray-300 
          text-sm text-gray-800 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-600">Password</label>

            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="mt-1 w-full px-3 py-2.5 pr-14 rounded-lg 
            border border-gray-300 
            text-sm text-gray-800 placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#25D366] cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          className="w-full mt-5 py-2.5 rounded-lg text-sm font-semibold 
      bg-[#25D366] text-white 
      hover:opacity-90 active:scale-95 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-[#25D366] cursor-pointer hover:underline">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
