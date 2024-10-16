import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunk';
import socketService from '../services/socketService';
import { useNavigate } from 'react-router-dom/dist';
const ProfileHeading = ({user, onSelectVisible}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectVisible = () => {
    onSelectVisible(prevState => !prevState); 
  };
  const handleLogout = () => {
    // Dispatch logout action to clear user data from Redux or other state management
    dispatch(logoutUser());
    socketService.disconnect();
   
     
      navigate("/login");
    
  };
  return (
    <div class="row heading">
            <div class="col-sm-2 col-xs-3 heading-avatar">
              <div class="heading-avatar-icon">
                <img src={user.image} alt='profile'/>
              </div>
            </div> <div class="col-sm-4 col-xs-7 heading-name">
                  <a class="heading-name-meta">{user.firstName}</a>
                </div>
            <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
              <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true" onClick={handleLogout} ></i>
            </div>
            <div class="col-sm-2 col-xs-2 heading-compose  pull-right" >
              <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true" onClick={handleSelectVisible}></i>
            </div>
          </div>
  );
};

export default ProfileHeading;
