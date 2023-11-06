import React from 'react';
import { BsWhatsapp, BsTelegram, BsInstagram, BsTwitter } from 'react-icons/bs';
import Link from 'next/link';

const SocialHandles = () => {
    return (
        <div className="w-full">
            <center>
                <div className="flex justify-center mt-4 text-sm text-gray-600">
                    <a
                        href="https://whatsapp.com/channel/0029Va8rjKX1Hsq3SznAc81n"
                        className="mx-2"
                    >
                        <BsWhatsapp />
                    </a>
                    <a
                        href="https://telegram.me/resultsjntuh"
                        className="mx-2 "
                    >
                        <BsTelegram />
                    </a>
                    <a
                        href="https://www.instagram.com/resultsjntuh/"
                        className="mx-2"
                    >
                        <BsInstagram />
                    </a>
                    <Link
                        href="/"
                        className="mx-2 "
                    >
                        <BsTwitter />
                    </Link>
                </div>
            </center>
        </div>
    );
};

export default SocialHandles;
