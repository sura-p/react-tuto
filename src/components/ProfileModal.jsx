import React from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for creating portals  // Importing the styles for the modal

const ProfileModal = ({ isOpen, onRequestClose, user }) => {
  if (!isOpen || !user) return null;

  // Modal content
  const modalContent = (
    <div className="profile-modal-content">
     <div className="close-button">
     <i class="fa fa-times" aria-hidden="true"  onClick={onRequestClose}></i>
     </div>
      
      <div className="profile-header">
        <img
          src={user.image || "default-avatar.png"} 
          alt="User Avatar"
          className="profile-avatar"
        />
        <h2>{user.firstName || user.username}</h2>
        <p>{user.email}</p>
      </div>
      <div className="profile-body">
        <p>{user.bio || "No bio availablewdcccccccccccccccccccccccccccccccccccccccc"}</p>
      </div>
    </div>
  );

  // Use a portal to render the modal into a different part of the DOM
  return ReactDOM.createPortal(
    <div className="profile-overlay">
      {modalContent}
    </div>,
    document.getElementById("root") // Specify the target root
  );
};

export default ProfileModal;
