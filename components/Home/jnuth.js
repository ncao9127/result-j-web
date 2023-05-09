import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Jntuh = () => {

    return (
        <>
            <div className="h-20 flex items-center justify-between px-4 sticky">
                <div className="flex items-center space-x-4">
                    <a onClick={() => window.location.reload()}>
                        <Image
                            src="/jntuh.png"
                            className="w-16 md:w-24"
                            alt=""
                            width={140}
                            height={120}
                            quality={80}
                        />
                    </a>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#020E24]">
                        Jawaharlal Nehru Technological University Hyderabad
                    </h1>
                </div>
                {/* <div className="flex items-center justify-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
                        JNTUH
                    </h1>
                </div> */}
            </div>
        </>
    );
};

export default Jntuh;
