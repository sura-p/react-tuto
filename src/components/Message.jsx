import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getMessageList } from '../features/messageFeature/messageThunk';
const Message = ({ messageSend }) => {
  const messageEndRef = useRef(null); 
  console.log(messageSend,"message");
  


  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  useEffect(() => {
    scrollToBottom();
  }, [messageSend]); 
  return (
    <div class="row message-body">
    {messageSend.map((ele)=>(
      ele.p=='s'?(<div class="col-sm-12 message-main-sender">
        <div class="sender">
          <div class="message-text">
            {ele.msg.trim()}
          </div>
          <span class="message-time pull-right">
            {new Date(ele.date).toLocaleDateString()}
          </span>
        </div>
      </div>):(<div class="col-sm-12 message-main-receiver">
              <div class="receiver">
                <div class="message-text">
                {ele.msg.trim()}
                </div>
                <span class="message-time pull-right">
                {new Date(ele.date).toLocaleDateString()}
                </span>
                
              </div>
            </div>)
    ))}
    <div ref={messageEndRef} />
    </div>
  );
};

export default Message;
