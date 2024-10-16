import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React, { useEffect, useState } from 'react';
import socketService from '../services/socketService';
import { useAuthUser } from '../hooks/selectors/AuthSelector';

function Reply({peer,onSend}) {
  console.log(peer==undefined,peer,"peer");
  
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobURL, setRecordedBlobURL] = useState('');
  const [isMicActive, setIsMicActive] = useState(false);
  const [receiverId,setReceiver] = useState(peer._id);
  const [socketVar,setSocketVar] = useState();
  const user = useAuthUser()
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
    setInputText((prevText) => prevText +emoji.native);
  };

  const handleEmoji = () => {
    setVisible(!visible);
  };

  const handleSend = () => {
    if (inputText && receiverId) {
      onSend({msg:inputText,p:'s'});
      setInputText("");
      socketVar.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        message:inputText,
      });
    }
  };

  return (
    <div className="row reply">
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
       
          <textarea
            className="form-control"
            rows="1"
            id="comment"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
      
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
