import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import Nav1 from './Nav1';

const NavBarComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (event) => {
      setStartX(event.touches[0].clientX);
    };

    const handleTouchEnd = (event) => {
      const endX = event.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 50 && !showPopup) {
        setShowPopup(true); // Swipe right to open the menu
      } else if (deltaX < -50 && showPopup) {
        setShowPopup(false); // Swipe left to close the menu
      }
    };

    const handleMenu = (event) => {
      if (
        event.target.closest('.menu-icon') ||
        event.target.closest('.menu-container')
      ) {
        setShowPopup((prevState) => !prevState);
      } else {
        setShowPopup(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('click', handleMenu);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleMenu);
    };
  }, [showPopup, startX]);

  return (
    <>
      {showPopup && <Nav1 />}
      <nav className="nav shadow-xl h-16 flex items-center px-4 lg:p-8 border-b-[0.1px] sticky">
        <h1 className="text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] mt-1">
          <Link href="/">
            <a>
              <Image
                src="/logo.png"
                alt="Logo"
                width={70}
                height={50}
              />
            </a>
          </Link>
        </h1>
        <div
          className="flex items-center space-x-4 md:space-x-8"
        >
          <Icon
            icon={menu2Fill}
            className="w-7 h-7 menu-icon"
            style={{ cursor: 'pointer' }}
          />
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;




// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md';
// import { AiFillGithub as GitHubIcon } from 'react-icons/ai';
// import Navbar from './NavBar';
// import Image from 'next/image';

// const NavBarComponent = () => {
//   const [isEnable, setIsEnable] = useState(false);

//   useEffect(() => {
//     const getMode = () => {
//       if (typeof window !== 'undefined') {
//         return localStorage.getItem('mode') === 'true' ? true : false;
//       }
//       return true;
//     };
//     setIsEnable(getMode());
//   }, []);

//   useEffect(() => {
//     const root = window.document.documentElement;
//     isEnable
//       ? root.classList.add('dark')
//       : root.classList.remove('dark');
//     localStorage.setItem('mode', JSON.stringify(isEnable));
//   }, [isEnable]);

//   function handleMode() {
//     setIsEnable(!isEnable);
//   }

//   return (
//     <nav className="bg-transparent shadow-xl h-20 flex items-center px-4 lg:p-8 border-b-[0.1px] sticky">
//       <h1 className="text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] ">
//         <Link href="/">
//           <a><Image src='/logo.png' onClick="window.location.reload()" className="w-[60px]  sm:w-[80px]" alt="" width={80} height={60}/></a>
//         </Link>
//       </h1>
//       <div className="hidden md:flex">
//    {/* <Navbar/> */}
//       </div>
//       <div className="flex items-center space-x-4 md:space-x-8">
//         <h1 className="cursor-pointer" onClick={handleMode}>
//           {isEnable ? (
//             <MdLightMode className="w-5 h-5" />
//           ) : (
//             <MdOutlineDarkMode className="w-5 h-5" />
//           )}
//         </h1>
//         <a href='https://github.com/khaja-moiz' target="_blank" rel="noreferrer">
//           <GitHubIcon size="1.5rem" className="text-black" />
//         </a>
//       </div>
//     </nav>
//   );
// };
// export default NavBarComponent;
