import { useEffect, useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiInfo } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import Darkmode from './Darkmode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = ({ onClose }) => {

    const [selectedButton, setSelectedButton] = useState('general');
    const [showGeneralContent, setShowGeneralContent] = useState(true);
    const [showAboutUsContent, setShowAboutUsContent] = useState(false);
    const { theme, setTheme } = useTheme();
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);

        // Update visibility of content blocks
        if (buttonName === 'general') {
            setShowGeneralContent(true);
            setShowAboutUsContent(false);
        } else if (buttonName === 'aboutUs') {
            setShowGeneralContent(false);
            setShowAboutUsContent(true);
        }
    };

    const handleClearLocalStorage = () => {
        localStorage.clear();
        toast.success(
            "Successfully Cleared Cache",
            { toastId: 'success1', position: "bottom-center", autoClose: true, newestOnTop: false, closeOnClick: true, rtl: false, draggable: true, theme: "light" }
        );
        console.log("Successfully Cleared Cache")
    };


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="bg-white dark:text-black p-4 rounded-md border border-black-500 shadow-2xl rounded-xl" ref={containerRef}>
                    <div className="flex items-center mb-4 ">
                        <div className="flex-grow text-lg font-bold">Settings</div>
                        <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <hr className="" />
                    <div className="text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                        <div className="flex m-4 justify-center">
                            <div className='rounded-xl flex bg-gray-100 px-1 py-1 font-medium text-sm'>
                                <button
                                    className={`flex items-center px-4 py-2 rounded-xl ${selectedButton === 'general' ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleButtonClick('general')}
                                ><IoSettingsOutline />&nbsp;General
                                </button>
                                <button
                                    className={`flex items-center px-3 py-2 rounded-xl ${selectedButton === 'aboutUs' ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleButtonClick('aboutUs')}
                                >
                                    <FiInfo />&nbsp;About Us
                                </button>
                            </div>
                        </div>
                        {showGeneralContent && <div className="block mt-10" style={{ width: '300px', height: '200px' }}>

                            <div className="flex items-center mb-4 border-b border-token-border-light pb-3 last-of-type:border-b-0">
                                <div className="flex-grow text-sm font-base">Themes</div>
                                {/* <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
                                    dark light
                                </button> */}
                                <div className='text-sm'>
                                    {theme === 'light' ? (
                                        <>
                                            <Darkmode />
                                        </>
                                    ) : (
                                        <>
                                            <Darkmode />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center mb-3 mt-2 ">
                                <div className="flex-grow text-sm font-base">Clear Cache Storage</div>
                                <button className="text-white rounded-xl px-3 py-2 bg-red-600 text-sm" onClick={handleClearLocalStorage}>
                                    Clear
                                </button>
                            </div>
                            <br />
                            <br />
                            <div className='opacity-25 text-center mt-8 text-[35%]'>
                                <span className='rounded-xl px-2 py-1 bg-gray-100 font-bold'>Ver - 2023.09.10L</span>
                            </div>
                        </div>
                        }
                        {showAboutUsContent && <div className="block md:text-[60%] mt-10" style={{ width: '300px', height: 'auto' }}>
                            Welcome to [ResultsJntuh] - Your Quick Results Hub!
                            <br /><br />
                            Dear Students,
                            <br />
                            [ResultsJntuh] is your go-to platform for fast and accurate exam results. We&apos;ve got B.Tech, B.Pharmacy, M.Tech, M.Pharmacy, and MBA results in one spot.
                            <br /><br />
                            Why choose us?
                            <br />
                            <span className="font-bold">User-Friendly:</span> Easily navigate our site.<br />
                            <span className="font-bold">Reliable:</span> Trust us for accurate results.<br />
                            <span className="font-bold">Free:</span> No cost, just results.<br />
                            <span className="font-bold">Comprehensive:</span> All your results in one place.<br /><br />
                            Help your friends! Share [ResultsJntuh] and make result-checking a breeze.<br />
                            Visit us at <span className="font-bold">[resultsjntuh.vercel.app]</span> for quick and reliable exam results.
                            <br /><br />
                            Best,
                            <br />
                            <span className="font-bold">[Mohd Moiz Uddin]</span>

                        </div>}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Settings;
