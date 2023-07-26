import { useState, useEffect } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import Link from "next/link";
import Qrcode from '../ui/Qrcode';
import Telegram from '../ui/Telegram';

const HomeNavLinks = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle the link click and show the modal
  const handleLinkClick = () => {
    setModalVisible(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const links = [
    {
      route: '/ConsolidatedResult',
      desctiption: [
        'Consolidated Results',
        'Get All Your Semester Results Here',
      ],
    },
    {
      route: '/SemResults',
      desctiption: [
        'Get Your Sem Result',
        'Get Results Of Particular Semester',
      ],
    },
    // {
    //   route: '/Classresults',
    //   desctiption: [
    //     'Get Class Results',
    //     'Class Results Of A Particular Semester',
    //   ],
    // },
    // {
    //   route: '/Classmate',
    //   desctiption: [
    //     'Classmate Results',
    //     'Get Results Status Of A Particular Semester',
    //   ],
    // },
    {
      route: '/CGPACalculator',
      desctiption: [
        'Get Your CGPA',
        'Get Your Gpa & Results Performance Detailed Here ',
      ],
    },
    {
      route: '/CreditsCalculator',
      desctiption: [
        'Credits Check',
        'Check Your Credits Eligible Critiera Here',
      ],
    },
    {
      route: '/ComparisonMode',
      desctiption: [
        'Results Comparison',
        'Get Overall Results Comparison with Classmate',
      ],
    },
    {
      route: '/Backlogs',
      desctiption: [
        'Check Backlogs',
        'Get Your Overall Backlogs List Here ',
      ],
    },
    // {
    //   route: '/Subjectsratio',
    //   desctiption: [
    //     'Subjects Stats',
    //     'Class Peformance Subjects Stats For Particular Semester ',
    //   ],
    // },
    {
      route: '/Classmatecgpa',
      desctiption: [
        'Classmate CPGA',
        'Check the Overall CGPA of Your Classmates',
      ],
    },
    {
      route: '/Notifications',
      desctiption: [
        'Notifications',
        'Get All The Latest Notifications From JNTUH.',
      ],
    },
    // {
    //   route: '/OldVersion',
    //   desctiption: [
    //     'Old Version',
    //     'Get All The Latest Results From JNTUH.',
    //   ],
    // },
    {
      route: '/help',
      desctiption: [
        'Help Desk',
        'Found any craches or bugs feel free to report us here',
      ],
    },
  ];
  const [hoveredLink, setHoveredLink] = useState(null);


  return (
    <>
      <br />
      <h1 className='title font-bold'>
        Welcome to{' '}
        <a
          className='text-blue-400 hover:text-blue-600'
          href=''
          target='_blank'
          rel="noreferrer"
          onClick={() => window.location.reload()}
        >
          JNTUH Results
        </a>
      </h1>
      <p className='description' >
        Examination Results Portal {' '}
        <br />
        <code className='code' >Jawaharlal Nehru Technological University Hyderabad</code>
      </p>
      <p className='home-header-caption text-black text-base sm:text-xl mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]'>
        Get all your results in one place.{' '}
        <i>
          Just your <b>hallticket</b>, to rule them all.
        </i>
      </p>
      <div className='home-links flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
        {links.map((link, idx) => (
          // Check if the link route is '/Classmatecgpa' and the current time is between 6 PM and 12 AM (midnight)
          // If true, render the link
          (link.route === '/Classmatecgpa' && (new Date().getHours() >= 5 || new Date().getHours() < 0))
            ? null
            : (
              <a
                href={link.route}
                key={idx}
                className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300"
                onMouseEnter={() => setHoveredLink(idx)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <h3 className='group-hover:text-black text-lg sm:text-2xl font-bold'>
                  <div className='flex flex-row items-center justify-start'>
                    <span className='p-1'>{link.desctiption[0]}</span>
                    {hoveredLink === idx && <HiArrowRight />}
                  </div>
                </h3>
                <p className='group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl'>
                  {link.desctiption[1]}
                </p>
              </a>
            )
        ))}

      </div>
      <br />
      <hr className="w-full border-gray" />
      <br />
      {/* Footer */}
      <p className="mt-1 block text-left mx-[12%] text-center text-[65%] sm:text-[100%]">
        Made with ❤ by &nbsp;
        <Link href="/"  >
          <a target="_blank" className="font-bold text-[#9C1A8B]" onClick={() => window.location.reload()}>
            MD MOIZ UDDIN
          </a>
        </Link>
      </p>
      <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
        If you found this app helpful, you can support me by &nbsp;
        <a className="font-bold text-[#9C1A8B] cursor-pointer" onClick={handleLinkClick}>
          buying me a pizza here.
        </a>
      </p>

      {isModalVisible && <Qrcode onClose={handleCloseModal} />}
      <Telegram />
      <br />
      {/* Footer */}
      <footer className="bottom-0 opacity-50">
        <div className="md:h-8 ">
          <div className=" md:px-0">
            <p className="text-center text-sm sm:text-[100%]">
              Collaborators:&nbsp;
            </p>
            <p className="text-center text-[67%] sm:text-[100%] ">
              <a href="https://github.com/thilakreddyy" target="_blank" rel="noreferrer">
                Thilak Reddy&nbsp;,&nbsp;
              </a>
              <a href="https://github.com/hemanth-kotagiri" target="_blank" rel="noreferrer" >
                Hemanth Kotagiri&nbsp;
              </a>
              &&nbsp;
              <a href="https://github.com/Syed-Ansar" target="_blank" rel="noreferrer">
                Syed Ansar
              </a>
            </p>
          </div>
        </div>
      </footer>
      <br />
    </>
  );
};
export default HomeNavLinks;
