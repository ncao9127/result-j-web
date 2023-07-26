import React, { useState } from "react";
import axios from 'axios';
import Loading from "../components/Loading/Loading";
import { useRouter } from 'next/router'
import url from "../components/api/api"
import Hr from "../components/Hr/Hr";
import HomeInfo from "../components/Home/HomeInfo";
import Cmode from "../components/Comparison/Cmode";
import Head from 'next/head';
import Alert from "../components/Home/Banner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeSingle = ({ homepage }) => {
  const router = useRouter();
  const submit = async () => {
    if (htno1.length !== 10 || htno2.length !== 10) {
      setWarning("The Hall Ticket Should be 10 digits");
    } else {
      setWarning("");
      homepage(<Loading />);
      try {
        const storedData = localStorage.getItem(`${htno1}${htno2}`);

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const { data, expiryTimestamp } = parsedData;

          console.log('Taking From Cache');
          console.log('Cache expiry ', new Date(expiryTimestamp));

          if (expiryTimestamp > Date.now()) {
            homepage(<Cmode query={data} />);
            return;
          } else {
            console.log('Cache Expired: Cached Cleared...');
            localStorage.removeItem(`${htno1}${htno2}`);
          }
        }

        // const response = await axios.get(url + '/api/classresults?htnos=' + htno1 + ',' + htno2, { mode: 'cors' });

        const response = await axios.get(url + '/api/single?htnos=' + htno1 + ',' + htno2, { mode: 'cors' });

        // const url = "/api/single?htnos=" + htno1 + "," + htno2;
        // const response = await axios.get(url);
        if (response.status === 500) {
          homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>);
        } else if (response.status === 404 || response.status === 400) {
          console.log("400")
          homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>);
        } else {
          const responseData = response.data;
          const expiryTimestamp = Date.now() + 10 * 60 * 1000; // 10 minutes expiry time
          const dataToStore = JSON.stringify({ data: responseData, expiryTimestamp });
          console.log('New Data Cached Successfully...');
          console.log('Cache Expiry', new Date(expiryTimestamp));
          localStorage.setItem(`${htno1}${htno2}`, dataToStore);
          homepage(<Cmode query={responseData} />);
        }
      } catch {
        toast.warning("Kindly Wait For 15 minutes And Try Again");
        homepage(<><div
          style={{
            marginTop: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <p>500 | Please try again later</p>
          <br />
          <button onClick={() => window.location.reload()} className="w-[70px] text-white bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]">Refresh</button>
        </div>
        </>);
      }
    }
  };

  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    if (event.target.name === "htno_1") {
      setHtno1(event.target.value)
    } else if (event.target.name === "htno_2") {
      setHtno2(event.target.value)
    }
  }

  const [htno1, setHtno1] = useState("");
  const [htno2, setHtno2] = useState("");
  const [warning, setWarning] = useState();

  return (
    <>
      <Head>
        <title>
          JNTUH | RESULTS COMPARISON
        </title>
        <meta
          name="description"
          content="Check out results comparison with fellow classmate with in a go."
          key="desc"
        />
      </Head>
      <div method="get">
        <center>
          <br />
          <h1 className="mb-2 font-bold text-[180%] ">
            Comparison Mode
          </h1>
          <p>
            Compare Your Overall Results With Your Friends
          </p>
          <br />
          <input onChange={inputEvent} name="htno_1" className="content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] sm:mx-2 m-1" type="text" maxLength="10" placeholder="Enter Your Roll Number" required />
          <input onChange={inputEvent} name="htno_2" className="my-2 content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:my-0 sm:mx-2" type="text" maxLength="10" placeholder="Enter Friend Roll Number" required />
          <br />
          <p className="text-[60%] text-red-600">{warning}</p>
          <br />
          <button type="submit" onClick={submit} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
            Results
          </button>
          <br />
          <br />
        </center>
      </div>
      <Hr />
      <HomeInfo />
      <Alert />
    </>
  )
}

const HomePage = () => {
  const homepage = (value) => {
    setContent(value);
  };

  const [content, setContent] = useState(<HomeSingle homepage={homepage} />);

  return (
    <div>
      {content}
    </div>
  );
};

export default HomePage;
