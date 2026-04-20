import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    // if feed already present
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
      // console.log(res);
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

return (
  <div className="min-h-screen bg-[#f0f2f5] pt-20 px-4 sm:px-6">
    {/* Heading */}
    <div className="max-w-4xl mx-auto mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
        Discover People
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Find and connect with amazing developers ✨
      </p>
    </div>

    {/* Feed */}
    <div className="max-w-4xl mx-auto space-y-3">
      {feed &&
        feed.map((user) => (
          <div
            key={user._id}
            className="  bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
          >
            <UserCard user={user} />
          </div>
        ))}
    </div>

    {/* End */}
    <p className="text-center text-gray-400 mt-8 text-xs">
      ✨ You've reached the end
    </p>
  </div>
);
};

export default Feed;
