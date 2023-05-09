import React, { useState } from "react";
import { useRouter } from 'next/router'
import axios from 'axios';
import Loading from "../components/Loading/Loading";
import url from "../components/api/api";
import SemResult from "../components/SemesterResult/SemResult";
import Hr from "../components/Hr/Hr";
import HomeInfo from "../components/Home/HomeInfo";
const HomeSemResult = ({ homepage }) => {
    const router = useRouter();
    const submits = async () => {
        if ((htno.length != 10 || code == "")) {
            alert("Please give the correct information!!")
        }
        else {
            homepage(<Loading />)
            const response = await axios.get(url + '/api/result?htno=' + htno + '&code=' + code, { mode: 'cors' });
            homepage(<SemResult query={response.data} />)
        }
    }
    const inputEvent = (event) => {
        event.target.value = event.target.value.toUpperCase();
        if (event.target.name == "htno") {
            setHtno(event.target.value)
        }
        else if (event.target.name == "code") {
            setCode(event.target.value)
        }

    }
    const [htno, setHtno] = useState("");

    const [code, setCode] = useState("");
    return (
        <>
            <div method="get" >
                <center>
                    <br />
                    <h1 className="mb-2 font-bold text-[180%] ">
                        Semester Result
                    </h1>
                    <p>
                        Results For A Particular Semester
                    </p>
                    <br />
                    <div>
                        <input onChange={inputEvent} name="htno" className="content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] sm:mx-2" type="text" maxLength="10" placeholder="Enter Your Roll Number" required />
                    </div>
                    <select name="code" onChange={inputEvent} className="text-[60%] md:border-[0.5px] rounded border-black border-solid md:mt-[25px] md:text-[80%]">
                        <option >Semester</option>
                        <option defaultValue value="1-1">1-1</option>
                        <option value="1-2">1-2</option>
                        <option value="2-1">2-1</option>
                        <option value="2-2">2-2</option>
                        <option value="3-1">3-1</option>
                        <option value="3-2">3-2</option>
                        <option value="4-1">4-1</option>
                        <option value="4-2">4-2</option>
                    </select>
                    <br />
                    <br />
                    <button onClick={submits} className="w-[70px] text-white	bg-blue-700 rounded mr-1.5 text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
                        Results
                    </button>
                    <br />
                    <br />
                </center>
            </div>
            <Hr />
            <HomeInfo />
        </>
    )
}
const HomePage = () => {
    const homepage = (value) => {
        setContent(value);
    };

    const [content, setContent] = useState(<HomeSemResult homepage={homepage} />);

    return (
        <div>
            {content}
        </div>
    );
};

export default HomePage;
