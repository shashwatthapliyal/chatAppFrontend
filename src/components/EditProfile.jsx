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
      {showToast && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Data Updated Successfully.</span>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-10">
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
          <div className="card w-full max-w-md bg-base-200 shadow-2xl rounded-2xl p-8">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-6">
              Edit Profile
            </h2>

            {/* FirstName */}
            <div className="form-control mb-4">
              <label htmlFor="firstName" className="label">
                <span className="label-text text-sm">First Name</span>
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstName"
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
              />
            </div>

            {/* LastName */}
            <div className="form-control mb-4">
              <label htmlFor="lastName" className="label">
                <span className="label-text text-sm">Last Name</span>
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                id="lastName"
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
              />
            </div>

            {/* gender */}
            <div className="form-control mb-4">
              <label htmlFor="gender" className="label">
                <span className="label-text text-sm">Gender</span>
              </label>
              <input
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                id="gender"
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
              />
            </div>

            {/* age */}
            <div className="form-control mb-4">
              <label htmlFor="age" className="label">
                <span className="label-text text-sm">Age</span>
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                value={age}
                id="age"
                type="number"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
              />
            </div>

            {/* about */}
            <div className="form-control mb-4">
              <label htmlFor="about" className="label">
                <span className="label-text text-sm">About</span>
              </label>
              <input
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                id="about"
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary p-4"
              />
            </div>

            <div>
              <p className="text-red-500">{error}</p>
            </div>

            {/* Button */}
            <button
              onClick={saveProfile}
              className="btn  w-full rounded-xl text-lg outline-none"
            >
              Submit
            </button>

            {/* Footer text */}
            <p className="text-red-600 text-center mt-4"></p>
          </div>
        </div>

        {/* User can see how there card looks while editing profile */}
        <div>
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
