import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res.data.updatedUser);
      dispatch(addUser(res.data.updatedUser));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
      // console.log(err?.response?.data);
    }
  };
return (
  <>
    {/* Toast */}
    {showToast && (
      <div className="fixed bottom-5 right-5 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-xl shadow-lg mt-20">
        Data Updated Successfully.
      </div>
    )}

    {/* MAIN LAYOUT */}
    <div className="min-h-screen border border-white/20 rounded-lg px-4 sm:px-6 lg:px-12 py-10">
      {/* 🔥 FIXED GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[85vh]">
        {/* LEFT → FORM */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            Edit Profile
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Gender</label>
            <input
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              type="text"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Age</label>
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              type="number"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">About</label>
            <input
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              type="text"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <button
            onClick={saveProfile}
            className="w-full mt-4 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Save Changes
          </button>
        </div>

        {/* RIGHT → LIVE PREVIEW */}
        <div className="flex justify-center items-center h-full">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </div>
  </>
);
};

export default EditProfile;
