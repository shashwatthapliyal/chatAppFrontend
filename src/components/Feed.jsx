import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 pt-24 px-4 sm:px-6 lg:px-12">
    {/* Heading */}
    <div className="max-w-5xl mx-auto mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        Discover People
      </h1>
      <p className="text-gray-200 mt-2">
        Find and connect with amazing developers ✨
      </p>
    </div>

    {/* Feed Cards */}
    <div className="max-w-5xl mx-auto space-y-6">
      {feed &&
        feed.map((user, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <UserCard user={user} />
          </div>
        ))}
    </div>

    {/* Bottom text */}
    {feed && (
      <p className="text-center text-gray-300 mt-10 text-sm">
        ✨ You've reached the end of the feed
      </p>
    )}
  </div>
);
};

export default Feed;
