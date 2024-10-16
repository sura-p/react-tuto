import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"; // or useNavigate if you're using React Router v6
import { logoutUser } from "../features/auth/authThunk";
import { useAuthError, useAuthUser } from "../hooks/selectors/AuthSelector";
import socketService from "../services/socketService";

function PeerProfile({ user }) {
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useAuthError();
  const loginUserDetail = useAuthUser();

  useEffect(() => {
    // Connect to socket when component mounts
    const token = "user-auth-token"; // Add your authentication token here
    // socketService.connect(token);

    // Register user on the socket
    socketService.on("userStatus", (data) => {
      console.log(data, "data" ,user._id == data.userId);
      if (user._id == data.userId) {
        setStatus(data.status);
      }
    });

    // Clean up on component unmount
    return () => {
      socketService.disconnect();
    };
  }, [user]);
  console.log(status,"status");
  
  const handleLogout = () => {
    // Dispatch logout action to clear user data from Redux or other state management
    dispatch(logoutUser(loginUserDetail.id));
    socketService.disconnect();
    if (!error) {
      // If error is null or undefined, it means login was successful
      navigate("/login"); // Navigate to the desired page (e.g., /dashboard)
    }
  };
const handleClick = () => { 

}
  return (
    <div className="row heading">
      <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
        <div className="heading-avatar-icon">
          <img src={user.image} alt="profile" />
        </div>
      </div>
      <div className="col-sm-8 col-xs-7 heading-name">
        <a className="heading-name-meta">{user.username}</a>
        <span className="heading-online">{status ?"online": "offline"}</span>
      </div>
      <div className="col-sm-1 col-xs-1 heading-dot pull-right">
      <i class="fa fa-video-camera fa-2x" aria-hidden="true" onClick={handleClick}></i>
        <i
          className="fa fa-ellipsis-v fa-2x pull-right"
          aria-hidden="true"
          onClick={handleLogout} 
          style={{ cursor: "pointer" }} 
        ></i>
      </div>
    </div>
  );
}

export default PeerProfile;
