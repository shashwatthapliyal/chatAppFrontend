import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
// import Debouncing from "./components/Debouncing.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./components/Feed.jsx";
import Profile from "./components/Profile.jsx";
import EditProfile from "./components/EditProfile.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import SignUp from "./components/SignUp.jsx";
import Chat from "./components/Chat.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "chat/:targetUserId",
        element:<Chat/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>,
);
