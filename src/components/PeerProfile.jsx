import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // or useNavigate if you're using React Router v6
import socketService from "../services/socketService";
import ProfileModal from "./ProfileModal";
import VideoCallModal from "./VideoCallModal"; // Import the new VideoCallModal component

function PeerProfile({ user ,fileSelected}) {
  const [status, setStatus] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoCallOpen, setVideoCallOpen] = useState(false); // State for video call modal
  const [isCallModalOpen, setCallModalOpen] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Connect to socket when component mounts
    const token = "user-auth-token"; // Add your authentication token here

    // Register user on the socket
    socketService.on("userStatus", (data) => {
      if (user._id == data.userId) {
        setStatus(data.status);
      }
    });

    // Clean up on component unmount
    return () => {
      socketService.disconnect();
    };
  }, [user]);

  // Dropdown toggle and option click handlers
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); 
    // Toggle the dropdown open/close state
  };

  const handleOptionClick = (option) => {
    console.log(`${option} selected`);
    if (option === 'Image' || option === 'Video') {
      // Trigger file input for Image/Video
      fileInputRef.current.click(); // Programmatically open file selector
    }
    setIsOpen(false); // Close dropdown after selecting an option
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleVideoCall = async () => {
    setCallModalOpen(true);

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(localStream);

      // Set up WebRTC peer connection
      const peerConnection = new RTCPeerConnection();

      // Add local stream to the peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Listen for remote stream and set it
      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStream(remoteStream);
      };

      setPeerConnection(peerConnection);

      // Emit offer to start the signaling process
      socketService.emit("callUser", {
        offer: await peerConnection.createOffer(),
        to: user._id // Peer user ID
      });

      peerConnection.setLocalDescription(await peerConnection.createOffer());

      // Listen for answers and ICE candidates via socket
      socketService.on("receiveAnswer", async (answer) => {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      });

      socketService.on("iceCandidate", (candidate) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketService.emit("sendIceCandidate", {
            candidate: event.candidate,
            to: user._id
          });
        }
      };
    } catch (error) {
      alert(error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      fileSelected(file)
    }
  };

  return (
    <>
      <ProfileModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        user={user}
        editable={false}
      />
      <VideoCallModal
        isOpen={isCallModalOpen}
        onRequestClose={() => setCallModalOpen(false)}
        localStream={localStream}
        remoteStream={remoteStream}
      />
      <div className="row heading">
        <div
          className="col-sm-2 col-md-1 col-xs-3 heading-avatar"
          onClick={openModal}
        >
          <div className="heading-avatar-icon">
            <img
              src={
                `${process.env.REACT_APP_BACKEND_URL}/uploads/${user.image}` ||
                "https://dummyjson.com/icon/emilys/128"
              }
              alt="profile"
            />
          </div>
        </div>
        <div className="col-sm-8 col-xs-7 heading-name">
          <a className="heading-name-meta">{user.username}</a>
          <span className="heading-online">
            {status ? "online" : "offline"}
          </span>
        </div>
        <div className="col-sm-1 col-xs-1 heading-dot pull-right">
          <i
            className="fa fa-video-camera fa-2x"
            aria-hidden="true"
            onClick={handleVideoCall}
            style={{ cursor: "pointer" }}
          ></i>{" "}
          {/* Open video call on click */}
          <i
            className="fa fa-ellipsis-v fa-2x pull-right"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={toggleDropdown} // Toggle dropdown on click
          ></i>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            maxWidth: "14%",
            maxHeight: "30%",
            top: "38px",
            right: "4px",
            backgroundColor: "white",
            border: "1px solid rgb(204, 204, 204)",
            borderRadius: "4px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px",
            zIndex: 1000,
            margin: "0%"
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            
            <li
              onClick={() => handleOptionClick("Image")}
              style={{ padding: "8px", cursor: "pointer" }}
              className="dropdown-item"
            >
              Image
            </li>
            <li
              onClick={() => handleOptionClick("Video")}
              style={{ padding: "8px", cursor: "pointer" }}
              className="dropdown-item"
            >
              Video
            </li>
          </ul>
        </div>
      )}
       <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange} // Handle file selection
        accept="image/*,video/*" // Accept only images and videos
      />
    </>
  );
}

export default PeerProfile;
