import React, { useState } from "react";
import Link from "next/link";

const Banner = ({ setBanner }) => {
    const closeBanner = () => {
        setBanner(false);
    };

    return (
        <div className="text-sm flex flex-col items-center py-2 overflow-hidden font-inter">
            <div className="my-2 rounded bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 text-center md:text-left m-10 ">
                <div className="flex justify-between">
                    <p className="font-bold">Please Note</p>
                    <button
                        onClick={closeBanner}
                        className="text-gray-400 hover:text-gray-900 focus:outline-none text-xs"
                    >
                        Close
                    </button>
                </div>
                <p className="text-xs">
                    If you encounter any difficulties retrieving results, <br />please &ldquo;kindly wait for 15 minutes and try again&rdquo;
                    <br />or reach out to me directly via
                    <Link href="/help">
                        <strong className="hover:cursor-pointer text-sky-900">&ldquo;Help Desk&ldquo;</strong>
                    </Link>
                </p>

                {/* <p className="text-xs"> If the current display of results is not in the correct format due to high server load at JNTUH.<br/> We kindly request your patience until the results can be displayed accurately.</p> */}
            </div>
        </div>
    );
};

const Alert = () => {
    const [banner, setBanner] = useState(true);

    return (
        <div>
            {banner && <Banner setBanner={setBanner} />}
            {/* Other content */}
        </div>
    );
};

export default Alert;
