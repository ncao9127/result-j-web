import React, { useState } from 'react';
import Head from 'next/head';
import districtsData from '../Json/Districts.json';
import Collegeview from './Collegeview';

const Institutesview = ({ query }) => {

    const [selectedCollege, setSelectedCollege] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    if (!query || query.length === 0) {
        return <div>No data available.</div>;
    }

    // Function to handle the link click and show the modal
    const handleLinkClick = () => {
        setModalVisible(true);
    };
    // Function to hide the modal
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    // Create a mapping between district names and district codes
    const districtMapping = {};
    districtsData.forEach((district) => {
        districtMapping[district['District Name']] = district['District Code'];
    });

    // Create a mapping between college types and the corresponding span elements
    const dynamicstyles = {
        'OU': <span className="bg-blue-100 text-blue-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">OU</span>,
        'PVT': <span className="bg-yellow-100 text-yellow-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">PVT</span>,
        'NA': <span className="bg-green-100 text-green-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">NA</span>,
        'COED': <span className="bg-indigo-100 text-indigo-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">COED</span>,
        'MUS': <span className=" bg-red-100 text-red-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">MUS</span>,
        'CHR': <span className=" bg-teal-100 text-teal-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-teal-900 dark:text-teal-300">CHR</span>,
        'GIRLS': <span className=" bg-pink-100 text-pink-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">GIRLS</span>,
        'UNIV': <span className=" bg-purple-100 text-purple-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">UNIV</span>,
        'SW': <span className=" bg-orange-100 text-orange-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">SW</span>,
        'SF': <span className=" bg-cyan-100 text-cyan-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-cyan-900 dark:text-cyan-300">SF</span>,
        'GOV': <span className=" bg-rose-100 text-rose-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-rose-900 dark:text-rose-300">GOV</span>,
        'PVTSF': <span className=" bg-lime-100 text-lime-800 md:mr-0.5 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-lime-900 dark:text-lime-300">PVTSF</span>,
    };

    return (
        <div>
            <Head>
                <title>Institute Details</title>
                <meta
                    name="description"
                    content="Details of colleges and institutes"
                />
            </Head>
            <div className="text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                <div className="">
                    <h3 className="text-gray-800 text-xl font-bold dark:text-white capitalize ">Institute-wise Courses offered in Telangana</h3>
                    <p className="text-gray-600 mt-2 dark:text-white">
                        <span className="bg-blue-100 text-blue-800 font-medium mr-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">OU = Osmania University</span>
                        <span className="bg-green-100 text-green-800 font-medium mr-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">NA = Not Applicable</span>
                        <span className="bg-indigo-100 text-indigo-800 font-medium mr-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">COED = Co-Education</span>
                        <span className="bg-yellow-100 text-yellow-800 font-medium mr-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">PVT = PRIVATE</span>
                    </p>
                </div>
                <br />
                <div className="text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
                    <table className="border-0 text-left ">
                        <tbody className="text-gray-600 divide-y border border-gray-200 dark:bg-gray-800 dark:text-white">
                            <tr className="bg-gray-50 text-gray-600 border-b border-gray-300 dark:bg-gray-700 dark:text-white font-bold no-hover">
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">S.No</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Code</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Institute</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Place</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">District</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Region</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Type</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Minority</td>
                                <td scope="col" className="text-left font-medium uppercase text-gray-900 dark:text-white">Mode</td>
                            </tr>
                            {query.map((item, index) => (
                                <tr key={index}>
                                    <td className="font-medium text-gray-900 dark:text-white">{index + 1}</td>
                                    <td className="text-blue-500 dark:text-blue-600 cursor-pointer"
                                        onClick={() => {
                                            setSelectedCollege(item); handleLinkClick();
                                            console.log(`Clicked college code: ${item['College Code']}`)
                                        }}>{item['College Code']}
                                    </td>
                                    <td className="text-gray-500 dark:text-white">{item['College Name']}</td>
                                    <td className="text-gray-500 dark:text-white">{item['Place of the College']}</td>
                                    <td className="text-gray-500 dark:text-white">{districtMapping[item['District in which located']]}</td>
                                    <td className="text-gray-500 dark:text-white">{dynamicstyles[item.Region]}</td>
                                    <td className="text-gray-500 dark:text-white">{dynamicstyles[item['Type of College']]}</td>
                                    <td className="text-gray-500 dark:text-white">{dynamicstyles[item['Minority Status']]}</td>
                                    <td className="text-gray-500 dark:text-white">{dynamicstyles[item['Co-Education']]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isModalVisible && <Collegeview query={{ selectedCollege }} onClose={handleCloseModal} />}
                <br />
                <span className=" bg-red-100 text-red-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">MUS = MUSLIM</span>
                <span className=" bg-teal-100 text-teal-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-teal-900 dark:text-teal-300">CHR = CHRISTIAN</span>
                <span className=" bg-pink-100 text-pink-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">GIRLS</span>
                <span className=" bg-purple-100 text-purple-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">UNIV = UNIVERSITY</span>
                <span className=" bg-orange-100 text-orange-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300">SW = STATE WIDE</span>
                <span className=" bg-cyan-100 text-cyan-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-cyan-900 dark:text-cyan-300">SF = SELF FINANCE</span>
                <span className=" bg-rose-100 text-rose-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-rose-900 dark:text-rose-300">GOV = GOVERNAMENT</span>
                <span className=" bg-lime-100 text-lime-800 mr-2 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-lime-900 dark:text-lime-300">PVTSF = PRIVATE SELF FINANCE</span>
            </div>
        </div>
    );
};

export default Institutesview;