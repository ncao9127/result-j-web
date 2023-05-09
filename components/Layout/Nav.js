import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md';
import { AiFillGithub as GitHubIcon } from 'react-icons/ai';
import Navbar from './NavBar';
import Image from 'next/image';
import { BiShareAlt } from 'react-icons/bi';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';

const NavBarComponent = () => {
  const [isEnable, setIsEnable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getMode = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("mode") === "true" ? true : false;
      }
      return true;
    };
    setIsEnable(getMode());
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    isEnable
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("mode", JSON.stringify(isEnable));
  }, [isEnable]);

  function handleMode() {
    setIsEnable(!isEnable);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // auto-hide popup after 3 seconds
  }

  return (
    <>
      {showPopup && (
        <div className="popup-container font-bold">
          <p>This feature is still in development.</p>
        </div>
      )}
      <nav className="bg-transparent shadow-xl h-20 flex items-center px-4 lg:p-8 border-b-[0.1px] sticky">
        <h1 className="text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] mt-1">
          <Link href="/">
            <a>
              <Image
                src="/logo.png"
                onClick="window.location.reload()"
                className="w-[60px]  sm:w-[80px]"
                alt=""
                width={80}
                height={60}
              />
            </a>
          </Link>
        </h1>
        <div className="hidden md:flex">{/* <Navbar/> */}</div>
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* <h1 className="cursor-pointer" onClick={handleMode}>
            {isEnable ? (
              <MdLightMode className="w-5 h-5" />
            ) : (
              <MdOutlineDarkMode className="w-5 h-5" />
            )}
          </h1>
          <a href="https://github.com/khaja-moiz" target="_blank" rel="noreferrer">
            <GitHubIcon size="1.5rem" className="text-black" />
          </a>
          <h1 onClick={() => {
                        const url = "https://resultsjntuh.vercel.app/";
                        const title = "JNTUH Results";
                        const text = "Check out JNTUH Results website";
                        navigator.share({ url, title, text });
                    }}>
          <BiShareAlt size="1.5rem" className="text-black"/>
          </h1> */}
          <Icon icon={menu2Fill} className="w-5 h-5" onClick={handleMode}/>
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
