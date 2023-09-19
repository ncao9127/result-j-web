import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Telegram from './Telegram';
import Whatsapp from './Whatsapp';

const Notify = () => {
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        // Check if the toast has already been shown
        if (!toastShown) {
            // Get the current time
            const currentTime = new Date().getHours();

            if (currentTime >= 6 && currentTime < 18) {
                // Show the WhatsApp toast from 6 AM to 6 PM
                toast(
                    <div className="centered-toast"><Whatsapp /></div>,
                    { toastId: 'success4', position: "bottom-center", autoClose: false, newestOnTop: false, closeOnClick: true, rtl: false, draggable: true, theme: "light" }
                );
            } else {
                // Show the Telegram toast from 6 PM to 6 AM
                toast(
                    <div className="centered-toast"><Telegram /></div>,
                    { toastId: 'success2', position: "bottom-center", autoClose: false, newestOnTop: false, closeOnClick: true, rtl: false, draggable: true, theme: "light" }
                );
            }
            // Warn the user
            toast.warning("Looks Like JNTUH Servers Are Down ! Please Try Again After Sometime !", { toastId: 'success3', position: "bottom-center", autoClose: true, newestOnTop: false, closeOnClick: true, rtl: false, draggable: true, theme: "light" });

            // toast.warning("Kindly Wait For 15 minutes And Try Again");

            // toast.info('B.PHARM IV-II REGULAR / SUPPLEMENTARY JULY-2023 EXAMINATIONS RESULTS PUBLISHED', {
            //     toastId: 'success1',
            //     position: "bottom-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     newestOnTop: false,
            //     rtl: false,
            //     theme: "light",
            // });

            // Mark the toast as shown
            setToastShown(true);

            // Log that the toast has been shown
            console.log('Toast shown!');
        } else {
            // If the toast has already been shown, log it
            console.log('Toast has already been shown, will not show again.');
        }
    }, [toastShown]);

    return (
        <>
            <ToastContainer />
        </>
    );
}

export default Notify;
