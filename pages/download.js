import React, { useEffect } from 'react';
import Head from 'next/head';
import InstallButton from '../components/ui/InstallButton';
import Link from 'next/link';


const Download = () => {
  // Function to check if the page has been refreshed before
  const getLastRefreshTime = () => {
    return localStorage.getItem('lastRefreshTime');
  };

  // Function to set the last refresh time in localStorage
  const setLastRefreshTime = () => {
    localStorage.setItem('lastRefreshTime', Date.now());
  };

  // Function to clear the last refresh time from localStorage
  const clearLastRefreshTime = () => {
    localStorage.removeItem('lastRefreshTime');
  };

  // useEffect with an empty dependency array to run the refreshPage function once when the component mounts
  useEffect(() => {
    const lastRefreshTime = getLastRefreshTime();

    if (!lastRefreshTime || Date.now() - lastRefreshTime >= 5 * 60 * 1000) {
      console.log('Refreshing the page for a new user.');
      setLastRefreshTime();
      window.location.reload();
    } else {
      console.log('Existing user, not refreshing the page.');
    }

    // Set a timer to clear the last refresh time after 5 minutes (300,000 milliseconds)
    const timer = setTimeout(clearLastRefreshTime, 5 * 60 * 1000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="bg-custom-page min-h-screen " style={{
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      }}>
        <Head>
          <title>Download Resultsjntuh </title>
        </Head>
        <div>
          <br />
          <br />
          <br />
          <div className='m-6'>
            <h1 style={{ fontSize: '40px' }}>Download <br /> ResultsJntuh App</h1>
            <p>Stay connected on Resultsjntuh App across your devices, so you can pick up any results when you required.</p>
          </div>
          <div className="flex flex-wrap items-center justify-around mt-6 ">
            <div className="border border-black-400 bg-[#111B21] hover:drop-shadow-sm group text-white shadow-2xl max-w-xs p-6 mt-6 text-center md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-green-600 duration-300">
              <h6 className="text-white mt-2 group-hover:text-black" style={{ fontSize: '12px' }}>
                Mobile and Tablet
              </h6>
              <h3 className="text-white group-hover:text-black " style={{ fontSize: '32px' }}>
                Android
              </h3>
              <p className="text-white p-4 group-hover:text-black" style={{ fontSize: '12px' }}>
                Minimum Requirements Android OS 5.0 or above version
              </p>
              <br />
              <br />
              <div>
             <div className='flex justify-center items-center'>
                <InstallButton />
              </div>
              </div>
            </div>
            <div className="border border-black-400 bg-[#111B21] hover:drop-shadow-sm group text-white shadow-2xl max-w-xs p-6 mt-6 text-center md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-green-600 duration-300">
              <h6 className="text-white mt-2 group-hover:text-black" style={{ fontSize: '12px' }}>
                Mobile
              </h6>
              <h3 className="text-white group-hover:text-black " style={{ fontSize: '32px' }}>
                iOS
              </h3>
              <p className="text-white p-4 group-hover:text-black" style={{ fontSize: '12px' }}>
                Minimum Requirements Requires iOS 6.0 or newer version
              </p>
              <br />
              <br />
              <span className='flex justify-center items-center '>
                <InstallButton />
              </span>
            </div>
            <div className="border border-black-400 bg-[#111B21] hover:drop-shadow-sm group text-white shadow-2xl max-w-xs p-6 mt-6 text-center md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-green-600 duration-300">
              <h6 className="text-white mt-2 group-hover:text-black" style={{ fontSize: '12px' }}>
                Desktop
              </h6>
              <h3 className="text-white group-hover:text-black " style={{ fontSize: '32px' }}>
                Windows
              </h3>
              <p className="text-white p-4 group-hover:text-black" style={{ fontSize: '12px' }}>
                Requires Windows 8 or newer. For all other operating systems, you can use Resultsjntuh app in your browser.
              </p>
              <br />
              <br />
              <span className='flex justify-center items-center '>
                <InstallButton />
              </span>
            </div>
          </div>
          <br />
          <div className='flex justify-center items-center'>
            <p className='justify-center items-center mt-4 p-2 m-4'>
              Visit <a href="https://resultsjntuh.vercel.app/download" target="_blank" rel="noopener noreferrer">&nbsp;
                <span className='underline text-blue-500'>resultsjntuh.vercel.app/download</span>
              </a> &nbsp; on your mobile phone to install
            </p>
          </div>
        </div>
        <br />
        <br />
      </div>
      <div className='m-6 mt-10 ml-10' style={{
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      }}>
        <div className="-mt-2" style={{ fontSize: '40px' }}>
          <h1>Already<br />downloaded?</h1>
        </div>
        <p className='mt-2' style={{ fontSize: '16px' }}>Learn more about what you can do on Resultsjntuh. <Link href="/Faqs"><span className='text-blue-400 cursor-pointer'>Faqs</span></Link></p>
      </div>
    </>
  );
};

export default Download;
