import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // or useNavigate if you're using React Router v6
import socketService from "../services/socketService";
import ProfileModal from "./ProfileModal";
import VideoCallModal from "./VideoCallModal"; // Import the new VideoCallModal component

function PeerProfile({ user }) {
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoCallOpen, setVideoCallOpen] = useState(false); // State for video call modal

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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openVideoCall = () => setCallModalOpen(true); // Function to open video call modal
  const closeVideoCall = () => setCallModalOpen(false); // Function to close video call modal
  const [isCallModalOpen, setCallModalOpen] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const handleVideoCall = async () => {
    setCallModalOpen(true);

   try {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
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
      to: user._id, // Peer user ID
    });

    peerConnection.setLocalDescription(await peerConnection.createOffer());

    // Listen for answers and ICE candidates via socket
    socketService.on("receiveAnswer", async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socketService.on("iceCandidate", (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketService.emit("sendIceCandidate", {
          candidate: event.candidate,
          to: user._id,
        });
      }
    };
   } catch (error) {
    alert(error)
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
          ></i>
        </div>
      </div>
    </>
  );
}

export default PeerProfile;
