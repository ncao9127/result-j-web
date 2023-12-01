import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const GPAview = ({ title, formData, result, onClose }) => {

    const containerRef = useRef(null);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black qr bg-opacity-50 z-10">
                <div className=" bg-white dark:text-black p-2 border border-black-500 shadow-2xl rounded-xl" style={{ width: '300px', height: 'auto' }} ref={containerRef}>

                    <div className="flex items-center mb-4 mt-2">
                        <div className="flex-grow text-sm font-bold text-left">GPA View</div>
                        <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <hr className="" />
                    <div class=" mt-2">


                        <div className="flex justify-center items-center mt-4 relative">
                            <h2 className="text-lg font-bold absolute z-20 ml-2">{result}</h2>
                            <h6 className="text-xs font-bold absolute z-10 mt-10 ml-2">{title}</h6>
                            <Image src="/blob.svg" alt="Blob Image" width={100} height={100} className='justify-center items-center' />
                        </div>

                        {formData && Object.keys(formData).length > 0 && (
                            <table className='text-center border-0 mt-2'>
                                <tbody className='divide-y'>
                                    <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                        {Object.keys(formData[0]).map((key) => (
                                            <td key={key}>{key}</td>
                                        ))}
                                    </tr>
                                    {formData.map((data, index) => (
                                        <tr key={index}>
                                            {Object.values(data).map((value, subIndex) => (
                                                <td key={subIndex}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <br />
                        <div className='opacity-25 text-[55%]'>
                            <center>
                                <p>Generated At resultsjntuh.vercel.app</p>
                                <p className='capitalize'> On {formattedDate}</p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GPAview;