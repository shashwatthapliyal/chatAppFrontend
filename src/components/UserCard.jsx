import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${toUserId}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(updateFeed(toUserId));
      // console.log(res);
    } catch (err) {
      console.log("hello");
      console.log(err.response);
    }
  };

  const { photoUrl, firstName, lastName, age, about } = user;
  // console.log(user)
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-80 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">
        {/* Image */}
        <div className="h-96 w-full relative">
          <img
            src={photoUrl}
            alt="user"
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}, {age}
            </h2>
          </div>
        </div>

        {/* Bio */}
        <div className="px-5 py-3 text-center">
          <p className="text-gray-700 text-sm">{about}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 pb-6 pt-2">
          <button
            onClick={() => handleSendRequest("ignored", user._id)}
            className="bg-red-100 p-4 rounded-full shadow-lg text-red-500 text-xl hover:bg-red-500 hover:text-white hover:scale-110 transition duration-200"
          >
            ❌
          </button>

          <button
            onClick={() => handleSendRequest("interested", user._id)}
            className="bg-green-100 p-4 rounded-full shadow-lg text-green-500 text-xl hover:bg-green-500 hover:text-white hover:scale-110 transition duration-200"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
