import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import UserCard from "./UserCard";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  //   console.log(requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/recieved", {
      withCredentials: true,
    });
    // console.log(res.data.connectionRequest);
    dispatch(addRequests(res.data.connectionRequest));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="mt-20 ">
        <h1 className="text-xl md:text-xl font-bold text-white mb-6 ">
          No Requests
        </h1>
      </div>
    );
  return (
    <div className="min-h-screen bg-[#f0f2f5] pt-20 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-3xl">
          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 text-center">
            Connection Requests
          </h1>

          {/* Requests List */}
          {requests && requests.length > 0 ? (
            <div className="space-y-3">
              {requests.map((user, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
                >
                  <RequestCard user={user.fromUserId} requestId={user._id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20 text-sm">
              No Requests Found 😴
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
