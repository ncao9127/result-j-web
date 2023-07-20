import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const FeedbackComponent = () => {
    return (
        <div style={styles.container}>
            <Image src="https://www.gstatic.com/search-console-insights/feedback_image.svg" alt="Feedback" style={styles.image} width={200} height={100}/>
            <div className="Jfw7Vd">Share your feedback with us</div>
            <div class="mqJkEc">We want to help you understand your site&apos; performance.<br />
                Have anything to say? Suggestions for improvements?</div>
            <Link href="https://forms.gle/nuWgqatiy3AUPiAx5">

                <span className='text-blue-800'>share feedback</span>

            </Link>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    // image: {
    //     width: '200px',
    //     height: '100px',
    // },
};

export default FeedbackComponent;
