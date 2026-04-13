import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
 return (
 user && (
  <div className="h-[calc(100vh-64px)] bg-slate-900 text-white px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
    <div className="max-w-5xl mx-auto w-full">
      <EditProfile user={user} />
    </div>
  </div>
    )
  )
};

export default Profile;
