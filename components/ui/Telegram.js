import React, { useEffect, useState } from 'react';
import { BsTelegram } from 'react-icons/bs';
import Link from 'next/link';

const Telegram = () => {

    return (
        <>
            <div>
                <Link href="https://telegram.me/resultsjntuh">
                    <button className="my-2 bottom-5 right-5 bg-blue-500 hover:bg-white text-white hover:text-blue-500 rounded-xl px-3 py-2 shadow-lg z-10 flex items-center font-bold text-sm">
                        <BsTelegram className="w-5 h-5" />&nbsp; Join Us On Telegram
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Telegram;
