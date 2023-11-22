import { useEffect, useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const Creditsview = ({ query, reg, onClose }) => {
    const containerRef = useRef(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showButton, setShowButton] = useState(true);

    const handleDownload = async () => {
        try {
            console.log('Generating JPEG...');
            setShowButton(false); // Hide the button when generating the JPEG
            const dataUrl = await toJpeg(containerRef.current, { quality: 1.0 }); // Adjust quality value (0.0 to 1.0) to control file size
            setDownloadUrl(dataUrl);
            console.log("Successfully Downloaded creditsview");
        } catch (error) {
            console.error('Error converting HTML to image:', error);
            setShowButton(true);
        }
    };

    useEffect(() => {
        if (downloadUrl) {
            const fileName = `CreditsView.jpeg`;
            saveAs(downloadUrl, fileName);
            setDownloadUrl(null);
            setShowButton(true);
        }
    }, [downloadUrl]);

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
                <div className="bg-white dark:text-black p-4 rounded-md border border-black-500 shadow-2xl rounded-xl" ref={containerRef}>
                    <div class="text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] mt-2">
                        <table className='text-center border-0 mt-2'>
                            <tbody className='divide-y'>
                                <tr className='font-medium no-hover'>
                                    <td colSpan="4">{reg} Promotion Rules</td>
                                </tr>
                                <tr className='bg-gray-200 dark:bg-slate-900 font-medium no-hover'>
                                    <td>Promotion</td>
                                    <td>Conditions to be fulfilled</td>
                                </tr>
                                {query.map((semesterInfo) => (
                                    semesterInfo.semester !== "4-2" && (
                                        <tr key={semesterInfo.semester}>
                                            <td>{semesterInfo.semester}</td>
                                            {/* <td> Must have secured at least {semesterInfo.secured_credits} credits out of {semesterInfo.out_of} credits.</td> */}
                                            <td>
                                                {semesterInfo.semester === "1-1" && "Regular course of study of first year first semester"}
                                                {semesterInfo.semester === "2-1" && "Regular course of study of second year first semester"}
                                                {semesterInfo.semester === "3-1" && "Regular course of study of third year first semester"}
                                                {semesterInfo.semester === "4-1" && "Regular course of study of fourth year first semester"}
                                                {semesterInfo.semester === "1-2" && `Must have secured at least ${semesterInfo.secured_credits} credits out of ${semesterInfo.out_of} credits up to first year second semester.`}
                                                {semesterInfo.semester === "2-2" && `Must have secured at least ${semesterInfo.secured_credits} credits out of ${semesterInfo.out_of} credits up to second year second semester.`}
                                                {semesterInfo.semester === "3-2" && `Must have secured at least ${semesterInfo.secured_credits} credits out of ${semesterInfo.out_of} credits up to third year second semester.`}
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-1 block text-center mb-4 text-[55%] md:text-[80%] text-gray-600 m-6 opacity-25">
                        <b>Generate at results.jntuh.app <br /> {new Date().toLocaleString()}</b>
                    </div>
                    {showButton && <div className="flex justify-center"><button onClick={handleDownload} className='hover:text-green-500 font-base'>Download</button></div>}
                </div>
            </div>
        </>
    );
};

export default Creditsview;
