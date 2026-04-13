import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("mansi");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("21");
  const [emailId, setEmailId] = useState("mansi@gmail.com");
  const [password, setPassword] = useState("mansi@2026");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          age,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      // console.log(res);
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      console.log(err.response?.data?.message);
      setError(err?.response?.data?.message || err.message);
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
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-1 mb-5">
          Join and start your journey
        </p>

        {/* Form */}
        <div className="space-y-3">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-300">First Name</label>
              <input
                value={firstName}
                type="text"
                placeholder="First name"
                className="mt-1 w-full px-3 py-2.5 rounded-lg 
            bg-white/[0.06] border border-white/10 
            text-sm text-white placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-blue-500 
            focus:bg-white/[0.08] transition"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-300">Last Name</label>
              <input
                value={lastName}
                type="text"
                placeholder="Last name"
                className="mt-1 w-full px-3 py-2.5 rounded-lg 
            bg-white/[0.06] border border-white/10 
            text-sm text-white placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-blue-500 
            focus:bg-white/[0.08] transition"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-xs text-gray-300">Age</label>
            <input
              value={age}
              type="number"
              placeholder="Enter age"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          bg-white/[0.06] border border-white/10 
          text-sm text-white placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          focus:bg-white/[0.08] transition"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

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
            <input
              value={password}
              type="password"
              placeholder="Create password"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          bg-white/[0.06] border border-white/10 
          text-sm text-white placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-blue-500 
          focus:bg-white/[0.08] transition"
              onChange={(e) => setPassword(e.target.value)}
            />
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
      text-white 
      shadow-md 
      hover:opacity-90 active:scale-95 transition"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
