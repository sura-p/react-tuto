import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = () => {
  const [showPicker, setShowPicker] = useState(false); // Toggle emoji picker visibility
  const [inputText, setInputText] = useState(''); // State for managing input text

  // Function to handle emoji click
  const onEmojiClick = (event, emojiObject) => {
    setInputText(prevText => prevText + emojiObject.emoji); // Append selected emoji to input text
  };

  // Toggle emoji picker visibility
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className="emoji-picker-container">
      {/* <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      /> */}
      
      <div className="emoji-picker">
        {/* Emoji picker icon (click to show/hide picker) */}
        <i className="fa fa-smile-o" aria-hidden="true" onClick={togglePicker}></i>
        
        {/* Conditionally render the emoji picker */}
        {showPicker && (
          <Picker onEmojiClick={onEmojiClick} />
        )}
      </div>
    </div>
  );
};

export default EmojiPicker;
