import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import HomeInfo from './HomeInfo';
import Hr from '../Hr/Hr';
import HomeFooter from './HomeFooter';
import Footer from './Footer';


const HomeNavLinks = () => {
  const links = [
    {
      route: '/ConsoliatedResult',
      desctiption: [
        'Consolidated Results',
        'Get All Your Semester Results Here',
      ],
    },
    {
      route: '/Results',
      desctiption: [
        'Get Your Result',
        'Get Results Of Particular Semester',
      ],
    },
    {
      route: '/multi',
      desctiption: [
        'Get Multiple Results',
        'Get Results Of More Than One Hallticket For A Semester',
      ],
    },
    {
      route: '/Printlist',
      desctiption: [
        'Get Multiple List',
        'Get Results Of Pass Or Fail List More Than One Hallticket',
      ],
    },
    {
      route: '/datacard',
      desctiption: [
        'Get Your CGPA',
        'Get Your Gpa & Results Performance Detailed Here ',
      ],
    },
    {
      route: '/notifications',
      desctiption: [
        'Notifications',
        'Get All The Latest Notifications From JNTUH.',
      ],
    },
    {
      route: '/OldVersion',
      desctiption: [
        'Old Version',
        'Get All The Latest Results From JNTUH.',
      ],
    },
  ];
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <>
    <br/>
    <h1 className='p-4 text-black dark:text-white text-3xl font-bold  text-center sm:text-6xl'>
        Welcome to{' '}
        <a
          className='text-blue-400 hover:text-blue-600 hover:underline'
          href='https://github.com/khaja-moiz'
          target='_blank'
        >
          JNTUH Results
        </a>
      </h1>
      <p className='home-header-caption text-black dark:text-white mt-6 text-base sm:text-xl mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]' >
        Examination Results Portal{' '}
          <code >Jawaharlal Nehru Technological University Hyderabad</code>
        </p>
      <p className='home-header-caption text-black dark:text-white mt-6 text-base sm:text-xl mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]'>
        Get all your results in one place.{' '}
        <i>
          Just your <b>hallticket</b>, to rule them all.
        </i>
      </p>
    <div className='home-links flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
      {links.map((link, idx) => (
        <a
          href={link.route}
          key={idx}
          className='border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black dark:text-white shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300'
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
      ))}
      
    </div>
    <br/>
      <Hr />
      <Hr />
      <Footer />
    </>
  );
};
export default HomeNavLinks;
