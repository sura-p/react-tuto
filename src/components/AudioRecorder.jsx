import React, { useState, useEffect } from 'react';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
    });
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onMouseDown={startRecording} onMouseUp={stopRecording}>
        {isRecording ? 'Recording...' : 'Hold to Record'}
      </button>
      {isRecording && <div className="recording-indicator"></div>}
    </div>
  );
}

export default AudioRecorder;
