import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";

const RequestCard = ({ user, requestId }) => {

const connections=useSelector((store)=>store.connections)


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
      dispatch()
      setTimeout(() => setRequestStatus(null), 3000);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const { firstName, lastName, photoUrl, age, about } = user;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
        {/* Profile Image */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-gray-200">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-medium text-gray-800">
            {firstName} {lastName}, {age}
          </h2>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{about}</p>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => reviewRequest("accepted", requestId)}
            className="px-4 py-2 text-sm rounded-lg bg-[#25D366] text-white hover:opacity-90 transition"
          >
            Accept
          </button>

          <button
            onClick={() => reviewRequest("rejected", requestId)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-red-500 hover:bg-gray-100 transition"
          >
            Reject
          </button>
        </div>
      </div>

      {/* Toast */}
      {requestStatus && (
        <div className="fixed bottom-5 right-5 bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm">
          Request {requestStatus}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
