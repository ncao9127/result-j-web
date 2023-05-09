import React, { useState } from "react";
import axios from 'axios';
import SingleResults from "../components/Single/SingleResults";
import Loading from "../components/Loading/Loading";
import { useRouter } from 'next/router'
import url from "../components/api/api"
import Hr from "../components/Hr/Hr";
import HomeInfo from "../components/Home/HomeInfo";

const HomeSingle = ({ homepage }) => {
  const router = useRouter();
  const submit = async () => {
    if (htno.length != 10) {
      setWarning("The Hall Ticket Should be 10 digits")
    }
    else {
      setWarning()
      homepage(<Loading />)
      try
      {
        const response = await axios.get(url+'/api/single?htno=' + htno, { mode: 'cors' });
        // console.log(response.status)
        if (response.status == 500) {
          homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>)
        }
        else if (response.status == 404 || response.status == 400) {
          console.log("400")
          homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>)
        }
        else {
          homepage(<SingleResults query={response.data} />)
          // router.push('/Single?htno=' + htno, undefined, { shallow: true })
        }
      }
      catch
      {
        homepage(<><div
          style={{
            marginTop: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>500 | Please try again later</p>
          <br/>
          <button onClick={() => window.location.reload()} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >Refresh</button>
        </div></>)

      }
      
    }

  }
  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value)
  }


  const [htno, setHtno] = useState("");
  const [warning, setWarning] = useState();
  return (
    <>
      <div method="get">
        <center>
          <br />
          <h1 className="mb-2 font-bold text-[180%] ">
             Consolidated Results
          </h1>
          <p>
            Grades For All Semesters Of A Particular Student
          </p>
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
      <Hr/>
      <HomeInfo/>
      
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