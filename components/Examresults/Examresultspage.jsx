import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loading/Loading";
import url from "../api/api";
import Banner from "../Home/Banner";
import Examresultsview from "./Examresultsview";

const Examresultspage = ({ title, link, homepage }) => {
  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState("");

  const payload = link.replace("http://results.jntuh.ac.in/jsp/SearchResult.jsp?", "");
  // Create a URL object from the link
  const url = new URL(link);

  // Extract examCode from the searchParams of the URL
  const examCode = url.searchParams.get('examCode');
  console.log(examCode);

  const submit = async (event) => {
    event.preventDefault();
    if (htno.length !== 10) {
      setWarning("The Hall Ticket Should be 10 digits");
    } else {
      setWarning();
      homepage(<Loading />);
      try {
        // Check if data is available in local storage
        const storedData = localStorage.getItem(htno + examCode);

        if (storedData) {
          const { data, expiryTimestamp } = JSON.parse(storedData);
          console.log('Taking From Cache', data);
          console.log('Cache expiry ', new Date(expiryTimestamp));

          // Compare expiry timestamp with current time
          if (expiryTimestamp && expiryTimestamp > Date.now()) {
            // Data is valid, render SingleResults with stored data
            homepage(<Examresultsview query={data} />);
            return;
          } else {
            // Data has expired, remove it from localStorage
            console.log('Cache Expired : Cached Cleared...');
            localStorage.removeItem(htno);
          }
        }
        // alert("kindly wait for 15 minutes and try again")

        const response = await axios.get(url + '/api/ne?' + payload + "&htno=" + htno, { mode: 'cors' });

        // const url = "/api/ne?" + payload + "&htno=" + htno;
        // const response = await axios.get(url);

        if (response.status === 500) {
          homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>);
        } else if (response.status === 404 || response.status === 400) {
          homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>);
        } else {
          // Store the response data and expiry timestamp in local storage
          const expiryTimestamp = Date.now() + 10 * 60 * 1000; // Set expiry to 10 minutes
          const dataToStore = { data: response.data, expiryTimestamp };
          localStorage.setItem(htno + examCode, JSON.stringify(dataToStore));
          console.log('New Data Cached Successfully..');
          console.log('Cache Expiry', new Date(expiryTimestamp));
          homepage(<Examresultsview query={response.data} />);
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
          <button onClick={() => window.location.reload()} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >Refresh</button>
        </div></>);
      }
    }
  };


  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value);
  };

  return (
    <>
      <form>
        <div className="flex flex-col items-center justify-center text-center ">
          <h1 className="font-bold mt-16 bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 m-4">{title}</h1>
          {/* <hr className="sm:w-96 w-48 border-gray-700 mb-4" /> */}
          {/* <h6 className="mt-5 mb-2 mx-2">Check Your Credits Eligible Criteria Here </h6> */}
        </div>
        <br />
        <div method="get" className="mx-[0.25%] ">
          <center>
            <input name="htno" onChange={inputEvent} className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0" type="text" maxLength="10" placeholder="Enter your Roll Number" />
            <br />
            {/* <p className="text-[60%] text-red-600">{warning}</p> */}
            <br />
            <button type="submit" onClick={submit} className="w-[70px] text-white bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
              Results
            </button>
            <br />
            <br />
          </center>
        </div>
      </form>

      <br />
      <Banner />
    </>
  );
};

export default Examresultspage;
