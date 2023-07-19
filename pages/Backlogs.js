import React, { useState } from "react";
import axios from 'axios';
import Loading from "../components/Loading/Loading";
import { useRouter } from 'next/router'
import url from "../components/api/api"
import Backloglist from "../components/Backlog/Backloglist";
import Hr from "../components/Hr/Hr";
import HomeInfo from "../components/Home/HomeInfo";
import Head from 'next/head';
import Alert from "../components/Home/Banner";


const HomeStudentDataCard = ({ homepage }) => {
  const router = useRouter();
  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState("");

  const submit = async () => {
    if (htno.length !== 10) {
      setWarning("The Hall Ticket Should be 10 digits");
    } else {
      setWarning("");
      homepage(<Loading />);
      try {
        const storedData = localStorage.getItem(htno);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const { data, expiryTimestamp } = parsedData;
          console.log('Taking From Cache');
          console.log('Cache expiry ', new Date(expiryTimestamp));
          if (expiryTimestamp > Date.now()) {
            homepage(<Backloglist query={data} />);
            return;
          } else {
            console.log('Cache Expired : Cached Cleared...');
            localStorage.removeItem(htno);
          }
        }
        const response = await axios.get(url + '/api/single?htno=' + htno, { mode: 'cors' });
        // const url = "/api/single?htno=" + htno;
        // const response = await axios.get(url);
        if (response.status === 500) {
          homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>);
        } else if (response.status === 404 || response.status === 400) {
          homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>);
        } else {
          const responseData = response.data;
          const expiryTimestamp = Date.now() + 10 * 60 * 1000; // 10 minutes expiry time
          const dataToStore = JSON.stringify({ data: responseData, expiryTimestamp });
          console.log('New Data Cached Successfully..');
          console.log('Cache Expiry', new Date(expiryTimestamp));
          localStorage.setItem(htno, dataToStore);
          homepage(<Backloglist query={responseData} />);
        }
      } catch {
        homepage(<>
          <div
            style={{
              marginTop: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
    setHtno(event.target.value);
  };

  return (
    <>
      <Head>
        <title>
          JNTUH | BACKLOGS RESULTS
        </title>
        <meta
          name="description"
          content="Check out academic backlogs results with in a go."
          key="desc"
        />
      </Head>
      <div method="get">
        <center>
          <br />
          <h1 className="mb-2 font-bold text-[180%] ">
            Backlogs Finder
          </h1>
          <p>Get Your Complete Backlogs List Here </p>
          <br />
          <input name="htno" onChange={inputEvent} className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0" type="text" maxLength="10" placeholder="Enter your Roll Number" />
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
      <Alert/>
    </>
  );
};


const HomePage = () => {
  const homepage = (value) => {
    setContent(value);
  };

  const [content, setContent] = useState(<HomeStudentDataCard homepage={homepage} />);

  return (
    <div>
      {content}
    </div>
  );
};

export default HomePage;
