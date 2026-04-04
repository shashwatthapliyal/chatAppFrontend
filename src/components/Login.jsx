import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("shashwat021@gmail.com");
  const [password, setPassword] = useState("Shashwat@120904");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
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

      // console.log(res.data.user);
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.log("ERR: ", err.response.data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl rounded-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm">Email</span>
          </label>
          <input
            value={emailId}
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-sm">Password</span>
          </label>
          <input
            value={password}
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          className="btn  w-full rounded-xl text-lg outline-none"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Footer text */}
        <p className="text-red-600 text-center mt-4">{error}</p>
        <p className="text-center text-sm mt-4 opacity-70">
          Don’t have an account?{" "}
          <span className="text-primary cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
