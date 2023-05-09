import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md';
import { AiFillGithub as GitHubIcon } from 'react-icons/ai';
import Image from 'next/image';
import { BiShareAlt } from 'react-icons/bi';

const Jntuh = () => {

    return (
        <>
            <div className="h-20 flex items-center px-4  sticky">
                <h1 className="text-xll font-bold md:text-lg lg:text-2xl text-[#020E24] ml-9">

                    <a>
                        <Image
                            src="/jntuh.png"
                            onClick="window.location.reload()"
                            className="w-[60px]  sm:w-[80px]"
                            alt=""
                            width={120}
                            height={100}
                            quality={80}
                        />
                    </a>

                </h1>

                {/* <div className="font-bold  lg:text-3xl text-[#020E24] mt-1 ml-5 mb-6 ">
                    <h2 className="text-center">
                        Jawaharlal Nehru Technological University Hyderabad
                    </h2>

                </div> */}
                <div className="flex flex-col items-center justify-center text-center ">
                    <div className="p-6">
                        <h1 className="text-xl lg:text-2xl font-bold mb-5 uppercase mr-10" >Jawaharlal Nehru Technological University Hyderabad</h1>
                        <h1 className="text-lg text-black  sm:text-xl"></h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Jntuh;