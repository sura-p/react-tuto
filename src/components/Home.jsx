// src/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login')
  };

  return (
    <div className="homepage">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        Welcome to Connectify
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        Connect with friends and family in an instant!
      </motion.p>
      <motion.button 
        onClick={handleGetStarted} 
        className="get-started-btn"
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;
