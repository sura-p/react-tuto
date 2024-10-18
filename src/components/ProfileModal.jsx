import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to get error and auth state
import { updateProfile } from "../features/profile/profileThunk"; // Ensure this thunk accepts formData correctly
import { toast } from "react-toastify"; // Assuming you're using toast for notifications
import { useNavigate } from "react-router-dom";
import { useProfileError, useProfileLoading } from "../hooks/selectors/ProfileSelector";

const ProfileModal = ({ isOpen, onRequestClose, user,editable}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure you are using react-router-dom's navigate
  const error= useProfileError(); // Assuming auth slice has error and isAuthenticated
  const loading = useProfileLoading()
  const initialValues = { email: user.email, username: user.username };
  console.log(loading,"loadingp", user);
  
  const [selectedImage, setSelectedImage] = useState(
    user?.image 
      ? `${process.env.REACT_APP_BACKEND_URL}/uploads/${user.image}`
      : "https://dummyjson.com/icon/emilys/128"
  );
  const [username,setuserName] = useState(user?.username)
  const [userEmail,setuserEmail] = useState(user?.email)
 // Ensure modal only renders if open and user exists

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Preview the selected image

      const formData = new FormData();
      formData.append("file", file);

      // Dispatch the formData to update the profile with multipart/form-data header
      dispatch(
        updateProfile(formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      );
    }
  };

  useEffect(() => {
    // Handle error and authentication effects
    if (error) {
      toast.error("Failed to update profile");
    }
  }, [error, navigate]);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      handleImageChange(event); // Trigger image change handler
    };

    input.click(); // Open file selection dialog
  };

  const handleUsername = (event) => {
    setuserName(event.target.value)
   
  }
  const handleEmail = (event) => {
    setuserEmail(event.target.value)
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Object to store changed values
    const updatedFields = {};

    // Check if email has changed
    if (userEmail !== initialValues.email) {
      updatedFields.email = userEmail;
    }

    // Check if username has changed
    if (username !== initialValues.username) {
      updatedFields.username = username;
    }

    // Only send API request if there are changed fields
    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateProfile(updatedFields,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }));
    } else {
      console.log("No fields have changed");
    }
  };
  const hasChanges = username !== initialValues.username || userEmail !==initialValues.email;

  console.log(hasChanges,'has');
  
  if (!isOpen || !user) return null;
  // Modal content
  const modalContent = (
    <div className="profile-modal-content">
      <div className="close-button">
        <i className="fa fa-times" aria-hidden="true" onClick={onRequestClose}></i>
      </div>

      <div className="profile-header">
        {!loading?<>
        {editable?<img
          src={selectedImage || "default-avatar.png"} // Show selected image or default
          alt="User Avatar"
          className="profile-avatar"
          onClick={handleImageClick} // Open file dialog on image click
          style={{
            cursor: "pointer",
            width: "100px",
            height: "100px",
            borderRadius: "50%"
          }} // Image styling
        />:<img
        src={selectedImage || "default-avatar.png"} // Show selected image or default
        alt="User Avatar"
        className="profile-avatar"
        style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          borderRadius: "50%"
        }} // Image styling
      />}
        <input value={username} onChange={handleUsername}></input>
        <input value={userEmail} onChange={handleEmail}></input></>: <div className="loader" />}
        <button onClick={handleSubmit} disabled={!hasChanges}>update</button>
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
    document.getElementById("root") // Ensure the portal renders in the correct root element
  );
};

export default ProfileModal;
