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
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 text-sm mt-1 mb-5">
          Join and start your journey
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">First Name</label>
              <input
                value={firstName}
                type="text"
                placeholder="First name"
                className="mt-1 w-full px-3 py-2.5 rounded-lg 
            border border-gray-300 
            text-sm text-gray-800 placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Last Name</label>
              <input
                value={lastName}
                type="text"
                placeholder="Last name"
                className="mt-1 w-full px-3 py-2.5 rounded-lg 
            border border-gray-300 
            text-sm text-gray-800 placeholder-gray-400 
            focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-xs text-gray-600">Age</label>
            <input
              value={age}
              type="number"
              placeholder="Enter age"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          border border-gray-300 
          text-sm text-gray-800 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

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
            <input
              value={password}
              type="password"
              placeholder="Create password"
              className="mt-1 w-full px-3 py-2.5 rounded-lg 
          border border-gray-300 
          text-sm text-gray-800 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              onChange={(e) => setPassword(e.target.value)}
            />
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
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#25D366] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
