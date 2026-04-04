import React from "react";

const ConnectionCard = ({ user }) => {
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
          <button className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 transition">
            Message
          </button>

          <button className="px-3 py-1 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 transition text-red-400 border border-gray-700">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
