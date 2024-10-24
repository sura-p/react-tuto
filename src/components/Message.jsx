import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getMessageList } from "../features/messageFeature/messageThunk";
import socketService from "../services/socketService";

const Message = ({ messageSend }) => {
  console.log(messageSend, "messageSend");

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
    socketService.on("fileUploaded", (fileData) => {
      setFiles((prevFiles) => [...prevFiles, fileData]); // Update files state
    });

    // Clean up on unmount
  }, []);

  return (
    <div className="row message-body">
      {messageSend.map((ele) => (
        <div
          className={`col-sm-12 message-main-${
            ele.p === "s" ? "sender" : "receiver"
          }`}
          key={ele.date}
        >
          <div className={ele.p === "s" ? "sender" : "receiver"}>
            <div className="message-text">
              {ele.msg.trim()}
              {/* Render the image or video if it exists */}
              {ele.fileUrl && (
                <div className="file-container">
                  {ele.fileType.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(ele.fileUrl)}
                      alt="Sent file"
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                  ) : (
                    ele.fileType.startsWith("video/") && (
                      <video width="150px" height="150px" controls>
                        <source src={URL.createObjectURL(ele.fileUrl)} type={ele.fileType} />
                        Your browser does not support the video tag.
                      </video>
                    )
                  )}
                 
                </div>
              )}
               { ele.image &&(<div className="file-container"> 
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/sharedMedia/${ele.image}`}
                      alt={ele.image}
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                  </div>)}
                  { ele.video &&(<div className="file-container"> 
                     <video width="150px" height="150px" controls>
                        <source src={`${process.env.REACT_APP_BACKEND_URL}/sharedMedia/${ele.video}`} type={ele.fileType} />
                        Your browser does not support the video tag.
                      </video>
                  </div>)}
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
