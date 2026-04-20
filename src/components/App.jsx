import { Outlet, useNavigate } from "react-router";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const user = useSelector((store) => store.user);
  const isLoggedIn = !!user;
  // console.log(isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(res.data);
      dispatch(addUser(res.data));

      // there can be two errors: user not loggedIn or som eother error.
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      // console.log(err.response);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#f0f2f5]">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 pt-14 overflow-hidden">
        <Outlet />
      </main>

      {isLoggedIn && <Footer />}
    </div>
  );
};

export default App;
