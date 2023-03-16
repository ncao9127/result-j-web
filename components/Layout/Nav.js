import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md';
import { AiFillGithub as GitHubIcon } from 'react-icons/ai';
import Navbar from './NavBar';
import Image from 'next/image';

const NavBarComponent = () => {
  const [isEnable, setIsEnable] = useState(false);

  useEffect(() => {
    const getMode = () => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('mode') === 'true' ? true : false;
      }
      return true;
    };
    setIsEnable(getMode());
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    isEnable
      ? root.classList.add('dark')
      : root.classList.remove('dark');
    localStorage.setItem('mode', JSON.stringify(isEnable));
  }, [isEnable]);

  function handleMode() {
    setIsEnable(!isEnable);
  }

  return (
    <nav className="bg-transparent shadow-xl h-20 flex items-center px-4 lg:p-8 border-b-[0.1px] dark:border-gray-800 sticky">
      <h1 className="text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] dark:text-white">
        <Link href="/">
          <a><Image src='/logo.png' onClick="window.location.reload()" className="w-[60px]  sm:w-[80px]" alt="" width={80} height={60}/></a>
        </Link>
      </h1>
      <div className="hidden md:flex">
   {/* <Navbar/> */}
      </div>
      <div className="flex items-center space-x-4 md:space-x-8">
        <h1 className="cursor-pointer" onClick={handleMode}>
          {isEnable ? (
            <MdLightMode className="w-5 h-5 dark:text-white" />
          ) : (
            <MdOutlineDarkMode className="w-5 h-5" />
          )}
        </h1>
        <a href='https://github.com/khaja-moiz' target="_blank" rel="noreferrer">
          <GitHubIcon size="1.5rem" className="dark:text-white text-black" />
        </a>
      </div>
    </nav>
  );
};

export default NavBarComponent;
