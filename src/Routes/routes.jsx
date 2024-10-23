import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Chat from "../page/Chat";
import VideoCall from "../components/VideoCall";
import Home from "../components/Home";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/chat",
    element: <Chat />
  },
  {
    path: "/emoji",
    element: <VideoCall />
  }
]);

export default route;
