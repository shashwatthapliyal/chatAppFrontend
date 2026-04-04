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
    <div className="">
      {feed && feed.map((user, idx) => <UserCard user={user} key={idx} />)}
    </div>
  );
};

export default Feed;
