import React from 'react';
import FeedbackComponent from '../components/ui/Feedback';
import Head from 'next/head';
const HomePage = () => {
  return (
    <div>
      <Head>
        <title>
          JNTUH | FEEDBACK
        </title>
        <meta
          name="description"
          content="feedback"
          key="desc"
        />
      </Head>
      {/* Other content */}
      <FeedbackComponent />
    </div>
  );
};

export default HomePage;
