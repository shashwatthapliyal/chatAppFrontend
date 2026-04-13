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
  <div className="min-h-screen bg-slate-900 pt-24 px-4 sm:px-6 lg:px-12">
    {/* Heading */}
    <div className="max-w-4xl mx-auto mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white">
        Discover People
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Find and connect with amazing developers ✨
      </p>
    </div>

    {/* Feed */}
    <div className="max-w-4xl mx-auto space-y-3">
      { feed && feed.map((user) => (
        <div
          key={user._id}
          className="bg-slate-800 rounded-xl px-4 py-3 
        border border-white/5 
        hover:bg-slate-700 transition"
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>

    {/* End */}
    <p className="text-center text-gray-500 mt-8 text-xs">
      ✨ You've reached the end
    </p>
  </div>
);
};

export default Feed;
