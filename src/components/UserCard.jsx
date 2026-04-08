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
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        {/* IMAGE */}
        <div className="w-full sm:w-32 h-40 sm:h-32 flex-shrink-0">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 text-white text-center sm:text-left">
          {/* Name */}
          <h2 className="text-xl sm:text-2xl font-semibold">
            {firstName} {lastName}, {age}
          </h2>

          {/* About */}
          <p className="text-gray-300 text-sm mt-3 leading-relaxed">{about}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex sm:flex-col gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => handleSendRequest("ignored", user._id)}
            className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center"
          >
            ❌
          </button>

          <button
            onClick={() => handleSendRequest("interested", user._id)}
            className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
