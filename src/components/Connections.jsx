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
    <div className="min-h-screen bg-[#f0f2f5] pt-20 px-4 sm:px-6">
      {/* Heading */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Your Connections ({connections.length})
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          People you are connected with 🤝
        </p>
      </div>

      {/* Empty State */}
      {connections.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-sm">
          No Connections Found
        </div>
      )}

      {/* List */}
      <div className="max-w-4xl mx-auto space-y-3">
        {connections.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between 
        bg-white border border-gray-200 
        rounded-lg px-4 py-3 
        hover:bg-gray-50 transition"
          >
            <ConnectionCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
