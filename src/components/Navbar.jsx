import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);

  const handleLogOut = async () => {
    try {
      // console.log("handlelogout");
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-lg sm:text-xl font-semibold text-gray-800">
          DevTinder
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* USER NAME */}
          {user && (
            <p className="hidden sm:block text-sm text-gray-600">
              Hello,{" "}
              <span className="font-medium text-gray-800">
                {user.firstName}
              </span>
            </p>
          )}

          {/* AVATAR + DROPDOWN */}
          {user && (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
                <img
                  src={user.photoUrl}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
                <ul className="text-sm py-1 text-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/connections"
                      className="block px-3 py-2 hover:bg-gray-100"
                    >
                      Connections
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/requests"
                      className="block px-3 py-2 hover:bg-gray-100"
                    >
                      Requests
                    </Link>
                  </li>

                  <li
                    onClick={handleLogOut}
                    className="px-3 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
