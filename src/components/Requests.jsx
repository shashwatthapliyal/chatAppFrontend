import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/recieved", {
      withCredentials: true,
    });
    console.log(res.data.connectionRequest);
    dispatch(addRequests(res.data.connectionRequest));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No Requests</h1>;
  return (
    <div>
      {requests &&
        requests.map((user, idx) => <UserCard user={user.fromUserId} key={idx} />)}
    </div>
  );
};

export default Requests;
