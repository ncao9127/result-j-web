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


import axios from "axios";
import Link from "next/link";
import { BiArrowBack as BackIcon } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { BiShareAlt } from 'react-icons/bi';
import { BiMessageSquare } from "react-icons/bi";
import { BiBug } from "react-icons/bi";
import { BiCommentDetail, BiMessageSquareAdd } from "react-icons/bi";
import { BiHelpCircle } from 'react-icons/bi';
import StatusPage from "../components/ui/StatusPage";



function Home({ notifications }) {
    const firstNotification = notifications[0];

    return (
        <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 font-inter">
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
                    className="w-full"
                    speed={50}
                    gradient={true}
                    pauseOnHover={true}>
                    <span style={{ paddingRight: "700px" }}></span>
                    <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
                        {firstNotification?.notification_date}
                    </h3>
                    <title>JNTUH Results Notifications</title>
                    <h1 className=" text-m text-center">
                        {firstNotification?.notification_description}
                    </h1>
                    <br />
                </Marquee>
                <Link href="https://resultsjntuhbpharm.vercel.app">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            {/* <BiCommentDetail className="inline-block mr-2" /> */}
                            B.Pharmacy Results
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            Check Out Here Complete JNTUH B.pharm Results Here.
                        </p>
                    </div>
                </Link>
                <Link href="https://forms.gle/nuWgqatiy3AUPiAx5">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiCommentDetail className="inline-block mr-2" />
                            FeedBack
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            Tell us how this website helpful to you .
                        </p>
                    </div>
                </Link>
                <Link href="https://forms.gle/nuWgqatiy3AUPiAx5">
                    <div className="border border-gray-100 hover:drop-shadow-sm group text-black shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300">
                        <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-2 text-center group-hover:text-black text-lg sm:text-2xl font-bold">
                            <BiMessageSquareAdd className="inline-block mr-2" />
                            Suggestion
                        </h3>
                        <p className=" text-m text-center group-hover:text-black text-slate-500  text-base sm:text-xl">
                            {"Tell us how you'd like to improve this site"}
                        </p>
                    </div>
                </Link>
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
                        const text = "Check out JNTUH Results website";
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
            <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%]"><p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
                If you found this app helpful, you can support me by &nbsp;
                <Link href="https://paytm.me/d-XoZ3L" >
                    <a className="font-bold text-[#9C1A8B]">
                        buying me a pizza here.
                    </a>
                </Link>
            </p>
            </div>
            <div className="mt-1 block text-center text-green-600 mb-4 text-[55%] md:text-[80%]">
                <Link href="https://resultsjntuhweb.statuspage.io" >
                    <a >
                    <StatusPage/>
                    </a>
                </Link>
                
            </div>
        </div>

    );
}

export async function getStaticProps() {
    try {
        const response = await axios.get(
            "https://results-restapi.up.railway.app/notifications?refresh=true"
        );
        const notifications = response.data;
        return {
            props: {
                notifications,
            },
            revalidate: 60 * 30, // 30 minutes
        };
    } catch (error) {
        return {
            props: {
                notifications: [],
                error: "Unable to fetch notifications",
            },
        };
    }
}

export default Home;