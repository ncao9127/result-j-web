import { useEffect, useRef, useState } from 'react';
import Hr from '../Hr/Hr';

const Collegeview = ({ query, onClose }) => {
    const Details = query['selectedCollege'];
    const Address = Details['Address of the College']?.Address.join(', ');
    const containerRef = useRef(null);

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
                <div className="m-4 md:m-1 bg-white dark:text-black p-4 border border-black-500 shadow-2xl rounded-xl" ref={containerRef}>
                    <div class="text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] mt-2">
                        <table className='text-center border-0'>
                            <tbody className='divide-y'>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>College Code</td>
                                    <td>College Name</td>
                                    <td>Co-Education</td>
                                    <td>Minority Status</td>
                                </tr>
                                <tr>
                                    <td>{Details['College Code']}</td>
                                    <td>{Details['College Name']}</td>
                                    <td>{Details['Co-Education']}</td>
                                    <td>{Details['Minority Status']}</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>Region</td>
                                    <td>Aided/Unaided</td>
                                    <td>Type of College</td>
                                    <td>Phone No</td>
                                </tr>
                                <tr>
                                    <td>{Details['Region']}</td>
                                    <td>{Details['Aided/Unaided']}</td>
                                    <td>{Details['Type of College']}</td>
                                    <td>{Details['Phone No']}</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td colSpan="4">Address of the College</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">{Address}</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>Place Of The College</td>
                                    <td>District In Which Located</td>
                                    <td>Hostel Availability</td>
                                    <td>Year Of Establishment</td>
                                </tr>
                                <tr>
                                    <td>{Details['Place of the College']}</td>
                                    <td>{Details['District in which located'] || '-'}</td>
                                    <td>{Details['Hostel Availability']}</td>
                                    <td>{Details['Year of Establishment']}</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>Email ID</td>
                                    <td>Affilited To</td>
                                    <td>Website</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{Details['Email ID']}</td>
                                    <td>{Details['Affiliated to']}</td>
                                    <td colSpan="4">
                                        <a href={`http://${Details['Website']}`} target="_blank" rel="noopener noreferrer">
                                            {Details['Website']}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <Hr />
                        <table className='text-center border-0 mt-2'>
                            <tbody className='divide-y'>
                                <tr className='font-medium no-hover'>
                                    <td colSpan="4">Courses Offered</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>S.No</td>
                                    <td>Branch Code</td>
                                    <td>Branch Name</td>
                                    <td>Fee</td>
                                </tr>
                                {Details['Courses Offered'].map((course, index) => (
                                    <tr key={index}>
                                        <td>{course['S.No']}</td>
                                        <td>{course['Branch Code']}</td>
                                        <td>{course['Branch Name']}</td>
                                        <td>{course['Fee']}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br/>
                        <div className='opacity-25 text-[55%]'>
                            <Hr/>
                            <center>
                                <p>Generated On resultsjntuh.vercel.app</p>
                                <p className='capitalize'>last updated on oct-2023</p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collegeview;
