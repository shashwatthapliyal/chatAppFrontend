import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";

const RequestCard = ({ user, requestId }) => {
  //   console.log(requestId);
  const [requestStatus, setRequestStatus] = useState(null);
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        },
      );
      setRequestStatus(status);
      dispatch(removeRequest(requestId));
      setTimeout(() => setRequestStatus(null), 3000);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const { firstName, lastName, photoUrl, age, about } = user;

  return (
    <div className="flex justify-center m-5">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-md hover:shadow-xl transition-all duration-300">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-700">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-white">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}, {age}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-2">{about}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => reviewRequest("accepted", requestId)}
            className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 transition"
          >
            Accept
          </button>

          <button
            onClick={() => reviewRequest("rejected", requestId)}
            className="px-3 py-1 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 transition text-red-400 border border-gray-700"
          >
            Reject
          </button>
        </div>
      </div>
      {requestStatus && (
        <div className="toast">
          <div className="alert alert-info">
            <span>Request {requestStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
