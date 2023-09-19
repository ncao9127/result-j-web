import React, { useEffect, useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';

const Whatsapp = () => {

    return (
        <>
            <div>
                <Link href="https://whatsapp.com/channel/0029Va8rjKX1Hsq3SznAc81n">
                    <button className="my-2 bottom-5 right-5 bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-xl px-3 py-2 shadow-lg z-10 flex items-center font-bold text-sm">
                        <BsWhatsapp className="w-5 h-5" />&nbsp; Whatsapp Channel
                    </button>
                </Link>
            </div>

        </>
    );
};

export default Whatsapp;
