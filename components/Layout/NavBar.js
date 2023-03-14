import React from 'react';
import { Link } from 'react-router-dom';

const navBarItems = [
  {
    id: 0,
    nav: 'Home',
    link: '/',
  },
  {
    id: 1,
    nav: 'R18',
    link: '/all-r18',
  },
  {
    id: 2,
    nav: 'Single',
    link: '/single',
  },
  {
    id: 3,
    nav: 'Multiple',
    link: '/multi',
  },
  {
    id: 4,
    nav: 'Notifications',
    link: '/notifications',
  },
  {
    id: 5,
    nav: 'Docs',
    link: 'https://hemanth-kotagiri.github.io/sgpa-rest-api-docs/',
    target: '_blank',
  },
];

const Navbar = () => {
  return (
    <div className='flex md:mr-6'>
      {navBarItems.map((item) => (
        <Link to={item.link} key={item.id}>
          <li
            key={item.id}
            className='cursor-pointer w-full px-[5px] sm:px[7px] md:px-3 lg:px-5 py-2 md:py-2 text-black dark:text-white hover:text-white md:font-semibold list-none hover:bg-black
          dark:hover:bg-white dark:hover:text-black hover:rounded-sm text-sm md:text-md md:bg-inherit font-bold'
          >
            <a target={item.target && '_blank'} className='md:bg-inherit'>
              {item.nav}
            </a>
          </li>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
