import React, { useState } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for creating portals

const ProfileModal = ({ isOpen, onRequestClose, user, updateUserImage }) => {
  const [selectedImage, setSelectedImage] = useState(user.image); // Initialize with the user's current image

  if (!isOpen || !user) return null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Preview the selected image

      // Prepare the FormData object for API call
      const formData = new FormData();
      formData.append("image", file);

      // Call the API to upload the image
      updateUserImage(user.id, formData)
        .then((response) => {
          console.log("Image updated successfully", response);
        })
        .catch((error) => {
          console.error("Error updating image", error);
        });
    }
  };

  const handleImageClick = () => {
    // Create a temporary input element for file selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      handleImageChange(event); // Call the change handler
    };

    input.click(); // Trigger the file selection dialog
  };

  // Modal content
  const modalContent = (
    <div className="profile-modal-content">
      <div className="close-button">
        <i className="fa fa-times" aria-hidden="true" onClick={onRequestClose}></i>
      </div>

      <div className="profile-header">
        <img
          src={selectedImage || "default-avatar.png"} // Show selected image or default
          alt="User Avatar"
          className="profile-avatar"
          onClick={handleImageClick} // Open file dialog on image click
          style={{ cursor: "pointer", width: "100px", height: "100px", borderRadius: "50%" }} // Image styling
        />
        <h2>{user.firstName || user.username}</h2>
        <p>{user.email}</p>
      </div>
      <div className="profile-body">
        <p>{user.bio || "No bio available"}</p>
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
