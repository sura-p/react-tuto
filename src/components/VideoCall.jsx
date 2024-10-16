// VideoCall.js
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import socketService from '../services/socketService';

const VideoCall = () => {
  const [socket, setSocket] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const localStreamRef = useRef();
  const peerConnectionRef = useRef();
  const pcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  useEffect(() => {
   socketService.connect() // Connect to backend server
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      localStreamRef.current = stream;
    }).catch((error) => {
      console.error('Error accessing media devices.', error);
    });

    socketService.on('offerOrAnswer', (data) => {
      peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
    });

    socketService.on('candidate', (candidate) => {
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
        socketService.disconnect();
    };
  }, []);

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection(pcConfig);
console.log(peerConnection,"peerConnection");

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    localStreamRef.current.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStreamRef.current);
    });

    peerConnectionRef.current = peerConnection;
  };

  const createOffer = () => {
    createPeerConnection();

    peerConnectionRef.current.createOffer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1,
    }).then((sdp) => {
      peerConnectionRef.current.setLocalDescription(sdp);
      socket.emit('offerOrAnswer', sdp);
    }).catch((error) => console.error(error));
  };

  const createAnswer = () => {
    peerConnectionRef.current.createAnswer({
      offerToReceiveVideo: 1,
      offerToReceiveAudio: 1,
    }).then((sdp) => {
      peerConnectionRef.current.setLocalDescription(sdp);
      socket.emit('offerOrAnswer', sdp);
    }).catch((error) => console.error(error));
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }}></video>
      <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }}></video>
      <div>
        <button onClick={createOffer}>Call</button>
        <button onClick={createAnswer}>Answer</button>
      </div>
    </div>
  );
};

export default VideoCall;
