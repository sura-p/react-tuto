import React, { useState, useEffect } from "react";

const Notification = ({ message, type }) => {
    const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the notification after 3 seconds
    const timer = setTimeout(() => {
        setVisible(false);
    }, 3000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

    // if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        padding: "10px 20px",
        backgroundColor: type === "success" ? "green" : "blue",
        color: "white",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
        width: "30%",
        height: "12%",
        alignContent: "center"
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
