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
      <div className="flex items-center justify-between gap-4 bg-white/5 backdrop-blur-xl rounded-2xl px-4 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          {/* IMAGE */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10">
            <img
              src={photoUrl}
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="min-w-0 text-gray-400">
            <h2 className="text-sm sm:text-base font-semibold truncate">
              {firstName} {lastName}
              <span className="text-gray-400 font-normal">, {age}</span>
            </h2>

            <p className="text-xs text-gray-400 mt-1 truncate max-w-[180px] sm:max-w-[260px]">
              {about}
            </p>
          </div>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-2 shrink-0">
          {/* IGNORE */}
          <button
            onClick={() => handleSendRequest("ignored", user._id)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-red-500/20 flex items-center justify-center"
          >
            ❌
          </button>

          {/* LIKE */}
          <button
            onClick={() => handleSendRequest("interested", user._id)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
