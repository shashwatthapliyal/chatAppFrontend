import React from "react";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about } = user;

return (
  <div className="w-full">
    
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      
      {/* Profile Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-white/20">
        <img
          src={photoUrl}
          alt="user"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-white text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-semibold">
          {firstName} {lastName}, {age}
        </h2>

        <p className="text-gray-300 text-sm mt-1 line-clamp-2">
          {about}
        </p>
      </div>

      {/* Actions */}
      <div className="flex sm:flex-col gap-3 mt-3 sm:mt-0">
        
        <button className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white">
          Message
        </button>

        <button className="px-4 py-2 text-sm rounded-xl bg-white/10 text-red-400 border border-white/20">
          Remove
        </button>
      </div>
    </div>

  </div>

  );
};

export default ConnectionCard;
