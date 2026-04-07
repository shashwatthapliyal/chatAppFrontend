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
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 tracking-tight">
          Sign Up
        </h2>

        {/* First Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm opacity-70">First Name</span>
          </label>
          <input
            value={firstName}
            type="text"
            placeholder="Enter your first name"
            className="input input-bordered w-full p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm opacity-70">Last Name</span>
          </label>
          <input
            value={lastName}
            type="text"
            placeholder="Enter your last name"
            className="input input-bordered w-full p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm opacity-70">Age</span>
          </label>
          <input
            value={age}
            type="number"
            placeholder="Enter your age"
            className="input input-bordered w-full p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

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
          <input
            value={password}
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:scale-[1.02]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          className="btn w-full mt-6 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 opacity-70">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
