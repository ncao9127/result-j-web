import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, currentIndex));
      currentIndex++;

      if (currentIndex > text.length) {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust the typing speed here

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return <span>{displayText}</span>;
};

export default TypingAnimation;
