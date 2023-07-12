import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
    MdOutlineSpaceDashboard,
    MdOutlineMoreHoriz,
    MdOutlineLogout,
    MdCreditScore, MdCompareArrows, MdSubject
} from "react-icons/md";
import { BsListNested, BsCardChecklist, BsListUl, BsCardText, BsClipboardData } from 'react-icons/bs';
import { BiHomeHeart, BiShareAlt } from 'react-icons/bi';
import { LuStretchVertical, LuGraduationCap } from 'react-icons/lu';
import { FaUserGraduate } from 'react-icons/fa';
import { CgNotifications } from 'react-icons/cg'
import Link from 'next/link';

function SideNavbar() {
    return (
        <div>
            <Disclosure >
                {/* <Disclosure.Button  className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className=" h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button> */}
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 overflow-y-auto">
                    <div className="flex flex-col justify-start item-center">
                        <Link href="/">
                            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                                JNTUH RESULTS
                            </h1>
                        </Link>
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <Link href='/'>
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BiHomeHeart className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Home
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/ConsolidatedResult'>
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <FaUserGraduate className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Consolidated Results
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/SemResults'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BsCardText className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Semester Result
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/Classresults'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BsListUl className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Class Results
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/Classmate'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BsListNested className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Classmate Results
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/CGPACalculator'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BsClipboardData className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Get Your CGPA
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/CreditsCalculator'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdCreditScore className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Credits Check
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/ComparisonMode'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <LuStretchVertical className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Results Comparison
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/Backlogs'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <BsCardChecklist className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Check Backlogs
                                    </h3>
                                </div>
                            </Link>
                            <Link href='/Subjectsratio'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdSubject className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Subjects Stats
                                    </h3>
                                </div>
                            </Link>

                            <Link href='/Notifications'>
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <CgNotifications className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        Notifications
                                    </h3>
                                </div>
                            </Link>

                        </div>
                        {/* setting  */}
                        {/* <div className=" my-2 border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                                <a href="https://resultsjntuhbpharm.vercel.app" target='_blank' rel="noreferrer">
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        B.Pharm Results
                                    </h3>
                                </a>
                            </div>
                        </div> */}
                        <div className=" my-2" onClick={() => {
                            const url = "https://resultsjntuh.vercel.app/";
                            const title = "JNTUH Results";
                            const text = "Stop your endless search for exam results! Find all your JNTUH exam results conveniently at here. Our user-friendly website provides reliable and accurate results for B.Tech, B.Pharmacy, M.Tech, M.Pharmacy, and MBA. Best of all, it's free! Don't waste time on countless websites – trust us for quick and easy access to your results. Spread the word and let your fellow students know they can find their results here too.";
                            navigator.share({ url, title, text });
                        }}>
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <BiShareAlt className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Share
                                </h3>
                            </div>
                        </div>
                        <Link href='/help'>
                            <div className=" my-2">
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                        More
                                    </h3>
                                </div>
                            </div>
                        </Link>
                        {/* logout */}

                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

export default SideNavbar;