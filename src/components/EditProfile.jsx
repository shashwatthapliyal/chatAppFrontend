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
      <div className="fixed bottom-6 right-6 z-50 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg shadow-md">
        Data Updated Successfully.
      </div>
    )}

    {/* MAIN */}
    <div className="h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-12 flex items-center">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* LEFT → FORM */}
        <div className="w-full max-w-md mx-auto lg:mx-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-white">
            Edit Profile
          </h2>

          <div className="space-y-3">
            {/* Names */}
            <div className="grid grid-cols-2 gap-3">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Age */}
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Age"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* About */}
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              placeholder="About"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={saveProfile}
              className="w-full mt-2 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* RIGHT → PREVIEW */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-3 text-center">
              Live Preview
            </p>

            {/* ❌ REMOVED EXTRA BORDER HERE */}
            <UserCard
              user={{ firstName, lastName, age, gender, about, photoUrl }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default EditProfile;
