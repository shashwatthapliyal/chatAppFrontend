import React from "react";
import { Link } from "react-router";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about } = user;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Profile */}
        <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
          <img
            src={photoUrl}
            alt="user"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-gray-800 truncate">
            {firstName} {lastName}
          </h2>
        </div>
      </div>

      {/* RIGHT ACTION */}
      <div className="flex items-center gap-3">
        <Link to={`/chat/${user._id}`} state={{ firstName, lastName }}>
          <button className="text-[#25D366] text-sm font-medium hover:underline">
            Message
          </button>
        </Link>

        <button className="text-red-500 text-sm hover:underline">Remove</button>
      </div>
    </div>
  );
};

export default ConnectionCard;
