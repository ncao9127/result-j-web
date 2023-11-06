import { useEffect, useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const Hallticketview = ({ query, onClose }) => {
    const containerRef = useRef(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showButton, setShowButton] = useState(true);

    const handleDownload = async () => {
        try {
            console.log('Generating JPEG...');
            setShowButton(false); // Hide the button when generating the JPEG
            const dataUrl = await toJpeg(containerRef.current, { quality: 1.0 }); // Adjust quality value (0.0 to 1.0) to control file size
            setDownloadUrl(dataUrl);
            console.log("Successfully Downloaded HallTicket");
        } catch (error) {
            console.error('Error converting HTML to image:', error);
            setShowButton(true);
        }
    };

    useEffect(() => {
        if (downloadUrl) {
            // Set the file name dynamically using the student's name
            const fileName = `${Details.NAME}_HallTicket.jpeg`;
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

    const { subjectDetails, Details } = query;

    // Before rendering the table, sort the subjectDetails based on the date
    const sortedSubjects = Object.values(subjectDetails).sort((a, b) => {
        // Convert dates to Date objects for comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Compare dates to sort in ascending order
        return dateA - dateB;
    });

    // Function to get the day of the week from a given date string
    const getDayFromDate = (dateString) => {
        if (dateString) {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const date = new Date(dateString);
            const dayIndex = date.getDay();
            return days[dayIndex];
        }
        return '-'; // If no date is provided, return a dash
    };
    // Function to format the date as "ddmmyear"
    const formatDate = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month since it's zero-based
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return '-'; // If no date is provided, return a dash
    };
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black qr bg-opacity-50 z-10">
                <div className="bg-white dark:text-black p-4 rounded-md border border-black-500 shadow-2xl rounded-xl" ref={containerRef}>
                    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="text-center font-bold mb-4 kalam">
                            HALL TICKET - JNTUH SUPPLEMENTARY EXAMS
                        </div>
                        <div class="grid grid-cols-2 gap-1 mb-4">
                            <div>
                                <p><span class="font-bold">Name:</span> {Details.NAME}</p>
                                <p><span class="font-bold">Roll Number:</span> {Details.ROLL_NO}</p>
                            </div>
                            <div>
                                <p><span class="font-bold">College Code:</span> {Details.COLLEGE_CODE}</p>
                                <p><span class="font-bold">Fathers Name:</span> {Details.FATHER_NAME}</p>
                            </div>
                        </div>

                        <div className="text-center font-bold mb-4">
                            EXAMINATION TIMETABLE - {new Date().getFullYear()}
                        </div>

                        <table class="border">
                            <thead>
                                <tr class="bg-gray-100 no-hover">
                                    <td class="font-semibold border px-1 py-0.5">Date</td>
                                    <td class="font-semibold border px-1 py-0.5">Day</td>
                                    <td class="font-semibold border px-1 py-0.5">Session</td>
                                    <td class="font-semibold border px-1 py-0.5">Subject</td>
                                    <td class="font-semibold border px-1 py-0.5">Sem</td>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedSubjects.map((subject) => {
                                    const formattedDate = formatDate(subject.date); // Format date as "ddmmyear"
                                    const dayOfWeek = getDayFromDate(subject.date); // Get the day of the week
                                    let sessionDisplay = '-';
                                    if (subject.time) {
                                        if (subject.time === '10:00 AM - 01:00 PM') {
                                            sessionDisplay = 'FN';
                                        } else {
                                            sessionDisplay = 'AN';
                                        }
                                    }
                                    return (
                                        <tr key={subject}>
                                            <td class="border px-1 py-0.5">{formattedDate}</td>
                                            <td class="border px-1 py-0.5">{dayOfWeek}</td>
                                            <td class="border px-1 py-0.5">{sessionDisplay}</td>
                                            <td class="border px-1 py-0.5">{subject.subjectName || '-'}</td>
                                            <td class="border px-1 py-0.5">{subject.semester || '-'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <caption className='caption-bottom text-[55%] md:text-[80%]'>Session Timings FN: 10:00 AM to 01:00 PM / AN: 2:00 PM to 05:00 PM </caption>
                        </table>
                    </div>
                    <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%] text-red-600 m-10 capitalize">
                        <b>NOTE:</b> this hall ticket is not an official issued by JNTUH. It is a dummy hall ticket generated for the supplementary examination time tables. You can easily view the entire supplementary exam schedule to prepare effectively for your exams and achieve academic success.
                    </div>
                    <div className="mt-1 block text-center mb-4 text-[55%] md:text-[80%] text-gray-600 m-6 opacity-25">
                        <b>Generate at results.jntuh.app {new Date().toLocaleString()}</b>
                    </div>
                    {showButton && <div className="flex justify-center"><button onClick={handleDownload} className='hover:text-green-500 font-bold'>Download Hall Ticket</button></div>}
                </div>
            </div>
        </>
    );
};

export default Hallticketview;
