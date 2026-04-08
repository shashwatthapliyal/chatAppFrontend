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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 flex flex-col mt-10">
      {/* Main Content */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Connection Requests
          </h1>

          {/* Requests List */}
          {requests && requests.length > 0 ? (
            <div className="space-y-5">
              {requests.map((user, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md border border-white/20 
                rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition duration-300"
                >
                  <RequestCard user={user.fromUserId} requestId={user._id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-20">
              <h2 className="text-xl">No Requests Found 😴</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
