import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
 return (
   user && (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 my-a">
       <div className="max-w-5xl m-auto">
         <EditProfile user={user} />
       </div>
     </div>
   )
 );
};

export default Profile;
