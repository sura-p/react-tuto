import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const HoldToRecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [is, IsRecording] = useState(false);
  const [recordedBlobURL, setRecordedBlobURL] = useState(''); // Store blob URL here

  // Start recording when mic is pressed
  const startRecording = () => {
    setIsRecording(true);
    IsRecording(true);
  };

  // Stop recording when mic is released
  const stopRecording = () => {
    setIsRecording(false);
  };

  // Handle the blob when recording stops
  const onStop = (recordedBlob) => {
    // Convert blob to URL for preview
    const blobURL = URL.createObjectURL(recordedBlob.blob);
    setRecordedBlobURL(blobURL); // Set the blob URL for preview
  };

  return (
    <div>
      <h2>Hold-to-Record Audio</h2>

      {/* The audio recorder */
      console.log(isRecording,"isRecording")}
      {
        is?(<ReactMic
          record={isRecording}
          className="sound1-wave"
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
          mimeType="audio/wav"  // Optional, can specify format
        />):(<p>hold</p>)
      }
      

      {/* Mic Icon: Hold to record */}
      <div>
      <i class="fa fa-microphone fa-2x" aria-hidden="true"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}>
        </i>
        <button
          onMouseDown={startRecording}  // Start recording when button is pressed
          onMouseUp={stopRecording}    // Stop recording when button is released
          onTouchStart={startRecording} // Start on touch (for mobile)
          onTouchEnd={stopRecording}    // End on touch release (for mobile)
          style={{ 
            fontSize: '2rem', 
            padding: '10px 20px', 
            borderRadius: '50%', 
            backgroundColor: '#FF4081', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          🎤 Hold to Record
        </button>
      </div>

      {/* Preview the recorded audio */}{
        console.log(recordedBlobURL,"recordedBlobURL")
      }
      {recordedBlobURL && (
        <div>
          <h3>Preview Audio</h3>
          <audio controls src={recordedBlobURL}></audio>
        </div>
      )}
    </div>
  );
};

export default HoldToRecordAudio;
