import { useEffect, useRef, useState } from 'react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const Qrcode = ({ onClose }) => {
    const containerRef = useRef(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [showButton, setShowButton] = useState(true); // State to control the visibility of the button

    const handleDownload = async () => {
        try {
            console.log('Generating JPEG...');
            setShowButton(false); // Hide the button when generating the JPEG
            const dataUrl = await toJpeg(containerRef.current, { quality: 1.0 }); // Adjust quality value (0.0 to 1.0) to control file size
            setDownloadUrl(dataUrl);
            console.log("Successfully Downloaded QR Code");
        } catch (error) {
            console.error('Error converting HTML to image:', error);
            setShowButton(true); // Show the button again if there is an error
        }
    };

    useEffect(() => {
        if (downloadUrl) {
            // Trigger the download
            saveAs(downloadUrl, 'qrcode.jpeg');
            // Reset the downloadUrl state
            setDownloadUrl(null);
            setShowButton(true); // Show the button again after the download
        }
    }, [downloadUrl]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose(); // Call the onClose function to close the modal
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black qr bg-opacity-50">
                <div className="bg-white p-4 rounded-md border border-black-500 hover:drop-shadow-sm shadow-2xl rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105" ref={containerRef}>
                    <p className="text-center">Scan QR Code To Pay</p>
                    <div className="flex items-center justify-center">
                        <Image src="/qrcode.png" alt="Pizza QR Code" width={200} height={200} />
                    </div>
                    <p className="text-center">moizadmin@jio</p>
                    {showButton && <div className="flex justify-center"><button onClick={handleDownload} className='hover:text-green-500'>Download QR Code</button></div>}
                </div>
            </div>
        </>
    );
};

export default Qrcode;