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
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950-700 pt-24 px-4 sm:px-6 lg:px-12">
      {/* Empty State */}
      {connections.length === 0 && (
        <div className="text-center text-gray-300 mt-20 text-lg">
          No Connections Found
        </div>
      )}

      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Your Connections ({connections.length})
        </h1>
        <p className="text-gray-200 mt-2">People you are connected with 🤝</p>
      </div>

      {/* Connections List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {connections &&
          connections.map((user, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg"
            >
              <ConnectionCard user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connections;
