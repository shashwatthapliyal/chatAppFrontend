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
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          DevTinder
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* USER NAME */}
          {user && (
            <p className="hidden sm:block text-sm text-gray-300">
              Hello,{" "}
              <span className="font-medium text-white">{user.firstName}</span>
            </p>
          )}

          {/* AVATAR + DROPDOWN */}
          {user && (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border border-white/20 hover:border-white/40 transition duration-300">
                <img
                  src={user.photoUrl}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-4 pt-2 w-52 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible scale-95 group-hover:scale-100 transition-all duration-200">
                <ul className="text-sm p-2 space-y-1 text-gray-200">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-lg hover:bg-white/20 hover:text-white transition"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/connections"
                      className="block px-3 py-2 rounded-lg hover:bg-white/20 hover:text-white transition"
                    >
                      Connections
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/requests"
                      className="block px-3 py-2 rounded-lg hover:bg-white/20 hover:text-white transition"
                    >
                      Requests
                    </Link>
                  </li>

                  <li
                    onClick={handleLogOut}
                    className="px-3 py-2 rounded-lg hover:bg-red-500/30 hover:text-red-400 cursor-pointer transition"
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
