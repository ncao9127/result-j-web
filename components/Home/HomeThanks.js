import React, { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';


function MyFlippyComponent({ name, position, company, link }) {
  const flippyRef = useRef(null);

  const handleToggle = () => {
    if (flippyRef.current) {
      flippyRef.current.toggle();
    }
  };

  return (
    <Flippy
      flipOnHover={true}
      flipOnClick={false}
      flipDirection="horizontal"
      ref={flippyRef}
      style={{ width: '200px', height: '75px' }}
    >
      <div className=''>
        <br />
        <FrontSide style={{ backgroundColor: '' }} className=' mt-2 rounded-xl shadow-2xl text-center font-bold  '>
          {name}
        </FrontSide>

        <BackSide style={{ backgroundColor: '' }} className='  rounded-xl shadow-2xl text-center font-bold '>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {position}<br />
            {company}
          </a>
        </BackSide>
      </div>
    </Flippy>
  );
}

function MultiFlippyComponent() {
  const data = [
    { name: 'THILAK REDDY', position: 'BackEnd Developer', company: 'Jntuh Results services', link: 'https://github.com/ThilakReddyy' },
    { name: 'HEMANTH KOTAGIRI', position: 'RestApi Developer', company: 'Jntuh Results Services', link: 'https://github.com/hemanth-kotagiri' },
  ];

  return (

    <div className="container mx-[4%]">
      <div>
        <h1 className='text-center font-bold '>THANKS</h1>
      </div>

      <br />
      {data.map((item, index) => (
        <div key={index} className=" mt-2 mx-[1%]">
          <MyFlippyComponent key={index} name={item.name} position={item.position} company={item.company} link={item.link} />
        </div>
      ))}
    </div>
  );
}

export default MultiFlippyComponent;
