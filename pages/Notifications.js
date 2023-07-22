// import { IoConstructOutline } from 'react-icons/io5'
// import { useSpring, animated } from 'react-spring'

// export default function Notifications() {
//   const fadeProps = useSpring({
//     opacity: 1,
//     from: { opacity: 0 },
//     delay: 800 // add a delay of 500ms before the animation starts
//   })

//   return (
//     <animated.div className='text-black dark:text-white flex flex-col px-3 text-center items-center min-h-max py-2 overflow-hidden font-inter' style={fadeProps}>
//       <br/>
//       <IoConstructOutline size='48px' />
//       <h1 className='font-bold'> We are working on this feature!</h1>
//       <p>
//         We always strive to bring you the best. If you have any suggestions, <br></br> 
//         please let us know 
//       </p>
//     </animated.div>
//   )
// }

// import axios from "axios";
// import Link from "next/link";
// import { BiArrowBack as BackIcon } from "react-icons/bi";

// function Home({ notifications }) {
//   return (
//     <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 font-inter">
//       <Link href="/">
//         <div className="flex flex-row items-center justify-between cursor-pointer">
//           <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
//           <h3 className="text-lg sm:text-2xl font-bold mt-6">
//             Latest Notifications
//           </h3>
//         </div>
//       </Link>
//       <div className="max-w-xs flex flex-wrap items-center justify-around sm:max-w-4xl mt-6 sm:w-full">
//         {notifications.map((item, index) => (
//           <div
//             key={index}
//             className="shadow-2xl p-6 mt-6 text-left border w-96 rounded-xl min-w-[30%]"
//           >
//             <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
//               {item.notification_date}
//             </h3>
//             <title>JNTUH Results Notifications</title>
//             <p className=" text-m text-center">
//               {item.notification_description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export async function getStaticProps() {
//   try {
//     const response = await axios.get(
//       "https://results-restapi.up.railway.app/notifications?refresh=true",
//     );
//     const notifications = response.data;
//     return {
//       props: {
//         notifications,
//       },
//       revalidate: 60 * 30, // 30 minutes
//     };
//   } catch (error) {
//     return {
//       props: {
//         notifications: [],
//         error: "Unable to fetch notifications",
//       },
//     };
//   }
// }

// export default Home;




import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { BiArrowBack as BackIcon } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import Loading from "../components/Loading/Loading";
import url from "../components/api/api";
import Head from 'next/head';

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get(url + "/api/notifications" , { mode: 'cors' });
        // const url = "/api/notifications";
        // const response = await axios.get(url);
        setNotifications(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      }
    };

    fetchData(); // Invoke the fetchData function when the component mounts
  }, []);

  if (isLoading) {
    return <Loading />; // Render the Loading component while data is being fetched
  }

  const firstNotification = notifications[0];

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 font-inter">
      <Head>
        <title>
          JNTUH RESULTS | NOTIFICATIONS
        </title>
        <meta
          name="description"
          content="Check out latest results notifications with in a go."
          key="desc"
        />
      </Head>
      <Link href="/">
        <div className="flex flex-row items-center justify-between cursor-pointer">
          <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
          <h3 className="text-lg sm:text-2xl font-bold mt-6">
            Latest Notifications
          </h3>
        </div>
      </Link>
      <div className="max-w-xs flex flex-wrap items-center justify-around sm:max-w-4xl mt-6 sm:w-full">
        <div className="z-0">
          <Marquee
            className="w-full"
            speed={50}
            gradient={true}
            pauseOnHover={true}
          >
            <span style={{ paddingRight: "700px" }}></span>
            <h3 className="text-sky-400  font-bold ">
              {firstNotification?.notification_date} &nbsp;
            </h3>
            <h1 className=" text-center">
              {firstNotification?.notification_description}
            </h1>
            <br />
          </Marquee>
        </div>
        {notifications.map((item, index) => (
          <div
            key={index}
            className="shadow-2xl p-6 mt-6 text-left border w-96 rounded-xl min-w-[30%]"
          >
            <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-1 text-center">
              {item.notification_date}
            </h3>
            <title>JNTUH Results Notifications</title>
            <p className="text-m text-center">{item.notification_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
