import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunk';
import socketService from '../services/socketService';
import { useNavigate } from 'react-router-dom/dist';
import ProfileModal from './ProfileModal';
const ProfileHeading = ({user, onSelectVisible}) => {
  console.log(user,"user");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const handleSelectVisible = () => {
    onSelectVisible(prevState => !prevState); 
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleLogout = () => {
    // Dispatch logout action to clear user data from Redux or other state management
    dispatch(logoutUser());
    socketService.disconnect();
   
     
      navigate("/login");
    
  };
  return (<>
   <ProfileModal isOpen={isModalOpen} onRequestClose={closeModal} user={user} editable={true} />
    <div class="row heading">
            <div class="col-sm-2 col-xs-3 heading-avatar " onClick={openModal}>
              <div class="heading-avatar-icon">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${user.image}`||"https://dummyjson.com/icon/emilys/128"} alt='profile'/>
              </div>
            </div> <div class="col-sm-4 col-xs-7 heading-name">
                  <a class="heading-name-meta">{user.username}</a>
                </div>
            <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
              <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true" onClick={handleLogout} ></i>
            </div>
            <div class="col-sm-2 col-xs-2 heading-compose  pull-right" >
              <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true" onClick={handleSelectVisible}></i>
            </div>
            
          </div>
          </>
  );
};

export default ProfileHeading;
