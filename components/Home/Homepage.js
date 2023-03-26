import Hr from '../Hr/Hr'
import HomeSingle from './HomeSingle'
import HomeInfo from './HomeInfo'
import HomeFooter from './HomeFooter'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Homemulti from './Homemulti'
import HomePrintlist from './HomePrintlist'
import React, { useState } from 'react';
import HomeStudentDataCard from './HomeStudentDataCard';
import HomeClassmateCgpa from './HomeClassmateCgpa';
import HomeSemResult from './HomeSemResult';

const Home = ({ homepage }) => {
  return (
    <>
      <br />
      <div className="w-[75%] mx-[12.5%]">
        {/* <center className="absolute  w-[40px] right-[40%] sm:right-[48%] top-[17%] sm:top-[65%] transition-opacity ease-out duration-[2000ms] opacity-50">
          <img src='./swipe.png' />
        </center> */}
         <Carousel showThumbs={false}>
          <HomeSingle homepage={homepage} />
          <Homemulti homepage={homepage} />
          <HomePrintlist homepage={homepage}/>
          <HomeStudentDataCard homepage={homepage}/>
          <HomeSemResult homepage={homepage}/>
          {/* <HomeClassmateCgpa homepage={homepage}/> */}
          
        </Carousel>
      </div>
      <HomeInfo />
      <Hr />
      <Hr />
      <HomeFooter />
    </>
  )
}
const HomePage = () => {
  const homepage = (value) => {
    setHome(value)
  }
  const [home, setHome] = useState(<Home homepage={homepage} />)
  return (
    <> {home}</>
  )
}
export default HomePage;