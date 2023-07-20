import '../styles/globals.css'
import Layout from '../components/Layout/Layout';
import { Analytics } from '@vercel/analytics/react';
import InstallButton from '../components/ui/InstallButton';
function MyApp({ Component, pageProps }) {


    return( <>
      <Layout >
        <Component {...pageProps}/> 
        <Analytics/>
      </Layout>
      {/* <InstallButton/> */}
      </>)
}

export default MyApp
