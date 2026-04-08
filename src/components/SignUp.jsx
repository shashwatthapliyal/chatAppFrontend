import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("Rahul");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("21");
  const [emailId, setEmailId] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("Rahul@2026");
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
      console.log(res);
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 px-4 ">
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 sm:p-8">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
        Sign Up
      </h2>

      {/* First Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">First Name</label>
        <input
          value={firstName}
          type="text"
          placeholder="Enter your first name"
          className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Last Name</label>
        <input
          value={lastName}
          type="text"
          placeholder="Enter your last name"
          className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Age */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Age</label>
        <input
          value={age}
          type="number"
          placeholder="Enter your age"
          className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          value={emailId}
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmailId(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label className="block text-sm text-gray-300 mb-1">Password</label>
        <input
          value={password}
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 sm:p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}

      {/* Button */}
      <button
        className="w-full mt-6 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        onClick={handleSignup}
      >
        Sign Up
      </button>

      {/* Footer */}
      <p className="text-center text-sm mt-6 text-gray-400">
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
