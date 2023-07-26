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

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BiArrowBack as BackIcon } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { BiCommentDetail, BiHelpCircle, BiShareAlt, BiMessageSquare, BiBug, BiMessageSquareAdd } from "react-icons/bi";
import StatusPage from "../components/ui/StatusPage";
import url from "../components/api/api";
import Head from "next/head";
import { FiDownload } from 'react-icons/fi';
import { BsTelegram } from 'react-icons/bs';
import HomeFooter from "../components/Home/HomeFooter";

function Home() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(url + '/api/notifications' , { mode: 'cors' });
            // const url = "/api/notifications"
            // const response = await axios.get(url);
            const notificationsData = response.data;
            setNotifications(notificationsData);
        } catch (error) {
            console.error("Unable to fetch notifications:", error);
        }
    };

    const firstNotification = notifications[0];

    return (
        <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 font-inter">
            <Head>
                <title>
                    JNTUH RESULTS | HELP DESK
                </title>
                <meta
                    name="description"
                    content="Check out here help desk and raise query ."
                    key="desc"
                />
            </Head>
            <Link href="/">
                <div className="flex flex-row items-center justify-between cursor-pointer">
                    <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
                    <h3 className="text-lg sm:text-2xl font-bold mt-6">
                        Help Desk
                    </h3>
                </div>
            </Link>
            <div className="max-w-xs flex flex-wrap items-center justify-around sm:max-w-4xl mt-6 sm:w-full">
                <Marquee
                    className="w-full z-0"
                    speed={50}
                    gradient={true}
                    pauseOnHover={true}>
                    <span style={{ paddingRight: "700px" }}></span>
                    <h3 className="text-sky-400  text-center font-bold">
                        {firstNotification?.notification_date} &nbsp;
                    </h3>
                    <title>JNTUH Results Notifications</title>
                    <h1 className="text-center">
                        {firstNotification?.notification_description}
                    </h1>
                    <br />
                </Marquee>
                <Link href="/feedback">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiCommentDetail className="inline-block mr-2" />
                            FeedBack / Suggestions
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            Tell us how this website helpful to you .
                        </p>
                    </div>
                </Link>
                {/* <Link href="https://forms.gle/nuWgqatiy3AUPiAx5">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiMessageSquareAdd className="inline-block mr-2" />
                            Suggestion
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            {"Tell us how you'd like to improve this site"}
                        </p>
                    </div>
                </Link> */}
                <Link href="https://telegram.me/JntuhResultschatBot">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiBug className="inline-block mr-2" />
                            Report Us!
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            {"Describe the issue you've encountered here"}
                        </p>
                    </div>
                </Link>
                <Link href="https://telegram.me/JntuhResultschatBot">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiMessageSquare className="inline-block mr-2" />
                            Chat with us
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            Feel free to share FeedBack and Report with us!
                        </p>
                    </div>
                </Link>
                <Link href="/Faqs">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiHelpCircle className="inline-block mr-2 align-middle" />
                            FAQS
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            Check out Frequently Asked Questions FAQ
                        </p>
                    </div>
                </Link>
                <button
                    className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300"
                    onClick={() => {
                        const url = "https://resultsjntuh.vercel.app/";
                        const title = "JNTUH Results";
                        const text = "Stop your endless search for exam results! Find all your JNTUH exam results conveniently at here. Our user-friendly website provides reliable and accurate results for B.Tech, B.Pharmacy, M.Tech, M.Pharmacy, and MBA. Best of all, it's free! Don't waste time on countless websites – trust us for quick and easy access to your results. Spread the word and let your fellow students know they can find their results here too.";
                        navigator.share({ url, title, text });
                    }}>
                    <div className="flex justify-center items-center mb-4">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiShareAlt className="inline-block mr-2 align-middle" />
                            Share with Friends
                        </h3>
                    </div>
                    <p className="text-m text-center group-hover:text-black text-slate-500 text-base sm:text-xl">
                        Share this website with your friends
                    </p>
                </button>
            </div>
            <br />
            <hr className="sm:w-96 w-48 border-gray mb-4" />
            <div className="z-0 flex space-x-4 m-2">
                <Link href="/download">
                    <div className="my-2 bottom-5 right-5 bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-xl px-3 py-2 shadow-lg flex items-center font-bold text-sm">
                        Download App <FiDownload className="w-5 h-5 ml-2" />
                    </div>
                </Link>
                <Link href="https://telegram.me/resultsjntuh">
                    <div className="my-2 bottom-5 right-5 bg-blue-500 hover:bg-white text-white hover:text-blue-500 rounded-xl px-3 py-2 shadow-lg  flex items-center font-bold text-sm">
                        <BsTelegram className="w-5 h-5" />&nbsp; Join Us On Telegram
                    </div>
                </Link>
            </div>
            <div className="mt-2">
                <HomeFooter />
            </div>
            <div className="mt-1 block text-center text-green-600 mb-4 text-[55%] md:text-[80%]">
                <Link href="https://resultsjntuhweb.statuspage.io" >
                    <a >
                        <StatusPage />
                    </a>
                </Link>

            </div>
        </div>

    );
}


export default Home;