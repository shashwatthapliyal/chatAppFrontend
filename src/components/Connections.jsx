import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-24 px-4 sm:px-6 lg:px-12">
      {/* Empty State */}
      {connections.length === 0 && (
        <div className="text-center text-gray-400 mt-20 text-lg">
          No Connections Found
        </div>
      )}

      {/* Heading */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">
          Your Connections ({connections.length})
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          People you are connected with 🤝
        </p>
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {connections.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between 
        bg-white/[0.05] border border-white/10 
        rounded-xl px-4 py-3 
        transition hover:bg-white/[0.08]"
          >
            <ConnectionCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
