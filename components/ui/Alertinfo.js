import React from 'react';

const blurbg = "backdrop-blur"
const Alertinfo = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-white w-80 p-4 rounded-lg shadow-lg m-2'>
                <h2 className='text-xl font-semibold text-black'>
                    Resultsjntuh 
                </h2>
                <p className={`text-black text-[65%] capitalize flex`}>
                    Our site is currently undergoing scheduled maintenance to enhance performance and security.
                    <br />
                    Maintenance Window: 17/02/24 11:00 am - 2:00 pm (UTC)
                    <br />
                    During this time, the website may be temporarily unavailable. We appreciate your patience and apologize for any inconvenience.
                </p>
                <div className={`fixed inset-0 bg-gray-900 opacity-80 -z-10 ${blurbg}`}>
                </div>
            </div>
        </div>
    );
};

export default Alertinfo;
