import React, { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Event listener to capture the PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // Prevent the default prompt
      setDeferredPrompt(e); // Save the event for later use
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the PWA install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt.');
        } else {
          console.log('User dismissed the install prompt.');
        }
        setDeferredPrompt(null); // Reset the prompt event
      });
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleInstallClick}
          className="bottom-5 right-5 bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-full p-4 shadow-lg z-10 flex items-center font-bold"
        >
          Intall App <FiDownload className="w-6 h-6 ml-2" />
        </button>
      </div>
    </>

  );
};

export default InstallButton;
