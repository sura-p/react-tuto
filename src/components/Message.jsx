import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMessageList } from '../features/messageFeature/messageThunk';
import socketService from '../services/socketService';

const Message = ({ messageSend }) => {
  const messageEndRef = useRef(null);
  const [files, setFiles] = useState([]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageSend]);

  useEffect(() => {
    // Listen for file uploads
    socketService.on('fileUploaded', (fileData) => {
      setFiles((prevFiles) => [...prevFiles, fileData]); // Update files state
    });

    // Clean up on unmount
    
  }, []);

  return (
    <div className="row message-body">
      {messageSend.map((ele) => (
        <div className={`col-sm-12 message-main-${ele.p === 's' ? 'sender' : 'receiver'}`} key={ele.date}>
          <div className={ele.p === 's' ? 'sender' : 'receiver'}>
            <div className="message-text">
              {ele.msg.trim()}
              {/* Render the image or video if it exists */}
              {ele.fileUrl && (
                <div className="file-container">
                  {ele.fileType.startsWith('image/') ? (
                    <img src={ele.fileUrl} alt="Sent file" style={{ maxWidth: '100%', height: 'auto' }} />
                  ) : (
                    ele.fileType.startsWith('video/') && (
                      <video width="320" height="240" controls>
                        <source src={ele.fileUrl} type={ele.fileType} />
                        Your browser does not support the video tag.
                      </video>
                    )
                  )}
                </div>
              )}
            </div>
            <span className="message-time pull-right">
              {new Date(ele.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

export default Message;
