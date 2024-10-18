import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import socketService from "../services/socketService"; // Assuming you're using Socket.IO for signaling

const VideoCallModal = ({ isOpen, onRequestClose, remoteStream, localStream }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  // Attach video streams to video elements
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  if (!isOpen) return null;

  const handleEndCall = () => {
    // Add logic to end the call and disconnect streams
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    onRequestClose(); // Close the modal
  };

  const modalContent = (
    <div className="modal-overlay">
      <div className="video-call-modal">
        <div className="modal-header">
          <h2>Video Call</h2>
          <button className="close-button" onClick={onRequestClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="remote-video">
            <video ref={remoteVideoRef} autoPlay playsInline />
          </div>
          <div className="local-video">
            <video ref={localVideoRef} autoPlay muted playsInline />
          </div>
        </div>

        <div className="modal-footer">
          <button className="end-call-button" onClick={handleEndCall}>
            End Call
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("root") // Ensure this is the correct target for your portal
  );
};

export default VideoCallModal;
