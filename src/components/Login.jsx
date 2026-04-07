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
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm opacity-70">Email</span>
          </label>
          <input
            value={emailId}
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text text-sm opacity-70">Password</span>
          </label>

          <div className="relative">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input input-bordered w-full p-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show Password Button */}
            <span
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-primary cursor-pointer hover:underline"
            >
              Show
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="btn w-full mt-6 rounded-xl text-lg outline-none transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 opacity-70">
          Don’t have an account?{" "}
          <span className="text-primary cursor-pointer hover:underline hover:opacity-90 transition">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
