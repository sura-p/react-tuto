import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useEffect, useState } from "react";
import socketService from "../services/socketService";
import { useAuthUser } from "../hooks/selectors/AuthSelector";

function Reply({ peer, onSend, selectedFile, setSelectedFile }) {
  console.log(peer == undefined, peer, "peer");

  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobURL, setRecordedBlobURL] = useState("");
  const [file, setFile] = useState();
  const [isMicActive, setIsMicActive] = useState(false);
  const [receiverId, setReceiver] = useState(peer._id);
  const [socketVar, setSocketVar] = useState();
  const user = useAuthUser();
  let timeoutId = null; // Variable to hold the timeout ID

  useEffect(() => {
    setSocketVar(socketService.connect());
  }, []);

  const startRecording = () => {
    setIsMicActive(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsMicActive(false);
  };

  const onStop = (recordedBlob) => {
    const blobURL = URL.createObjectURL(recordedBlob.blob);
    setRecordedBlobURL(blobURL);
  };

  const addEmoji = (emoji) => {
    setInputText((prevText) => prevText + emoji.native);
  };

  const handleEmoji = () => {
    setVisible(!visible);
  };

  const handleSend = async () => {
    if ((inputText && receiverId) || (selectedFile && receiverId)) {
      onSend({
        msg: inputText,
        p: "s",
        date: new Date().toISOString(),
        fileUrl: selectedFile,
        fileType: selectedFile && selectedFile.type ? selectedFile.type : null
      });
      setInputText("");

      if (selectedFile && selectedFile.type.startsWith("image/")) {
        console.log("eventEmitted", selectedFile);

        socketVar.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          message: inputText,
          fileUrl: await fileToBuffer(selectedFile),
          fileName: selectedFile.name,
          fileType: selectedFile.type
        });
      } else if (selectedFile && selectedFile.type.startsWith("video/")) {
        socketVar.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          message: inputText,
          fileUrl: await fileToBuffer(selectedFile),
          fileName: selectedFile.name,
          fileType: selectedFile.type
        });
      } else {
        // Send just a text message if no file is selected
        socketVar.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          message: inputText
        });
      }

      console.log("eventEmitted");

      setSelectedFile(null);
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
  };

  const fileToBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer (which is a buffer)
    });
  };

  return (
    <div className={!selectedFile ? "row reply" : "reply-2"}>
      <div className="col-sm-1 col-xs-1 reply-emojis">
        <i className="fa fa-smile-o fa-2x" onClick={handleEmoji}></i>
      </div>
      {visible && (
        <div className="emoji-picker">
          <Picker
            perLine={21}
            emojiSize={15}
            previewPosition={"none"}
            searchPosition={"none"}
            onEmojiSelect={addEmoji}
          />
        </div>
      )}

      <div className="col-sm-9 col-xs-9 reply-main">
        {!selectedFile && (
          <textarea
            className="form-control"
            rows="1"
            id="comment"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        )}
        {selectedFile && selectedFile.type.startsWith("image/") && (
          <div className="file-preview">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="image-preview"
            />
            <i
              class="fa fa-times remove-btn"
              aria-hidden="true"
              onClick={removeFile}
            ></i>
          </div>
        )}
        {selectedFile && selectedFile.type.startsWith("video/") && (
          <div className="file-preview">
            <video
              src={URL.createObjectURL(selectedFile)}
              controls
              className="video-preview"
            />
            <i
              class="fa fa-times remove-btn"
              aria-hidden="true"
              onClick={removeFile}
            ></i>
          </div>
        )}
      </div>

      <div
        className="col-sm-1 col-xs-1 reply-recording"
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
      >
        <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
      </div>

      <div className="col-sm-1 col-xs-1 reply-send" onClick={handleSend}>
        <i className="fa fa-send fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
}

export default Reply;
