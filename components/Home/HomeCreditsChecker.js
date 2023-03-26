import React, { useState } from "react";
import axios from 'axios';
import Loading from "../Loading/Loading";
import { useRouter } from 'next/router'
import url from "../api/api"
import CreditsChecker from "../CreditsChecker/CreditsChecker";
import R18Regular from "../CreditsChecker/R18Regular"
import R18LE from "../CreditsChecker/R18LE"
import R22Regular from "../CreditsChecker/R22Regular"
import R22LE from "../CreditsChecker/R22LE"
import Hr from "../Hr/Hr";
import HomeInfo from "./HomeInfo";

const HomeCC = ({ homepage }) => {
    const [examType, setExamType] = useState('');
    const [suboption, setSuboption] = useState('');

    const handleExamTypeChange = (event) => {
        setExamType(event.target.value);
    };
    const handleSubOptionChange = (event) => {
        setSuboption(event.target.value);
    };
    const router = useRouter();
    const submit = async () => {
        if (htno.length != 10) {
            setWarning("The Hall Ticket Should be 10 digits")
        }
        else {
            setWarning()
            homepage(<Loading />)
            try {
                // const queryParams = `htno=${htno}&type=${type}&category=${category}`;
                // const response = await axios.get(url+'/api/single?' + queryParams, { mode: 'cors' });
                const response = await axios.get(url + '/api/single?htno=' + htno, { mode: 'cors' });
                if (response.status == 500) {
                    homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>)
                }
                else if (response.status == 404 || response.status == 400) {
                    homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>)
                }
                else {
                    if (examType === "R18" && suboption === "Regular") {
                        if (htno[4] == 5) {
                            homepage(<><div style={{ marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <p><b>Please Enter Your R18 Regular Htno</b></p>
                            </div></>)
                        } else {
                            homepage(<R18Regular query={response.data} />)
                        }
                    } else if (examType === "R18" && suboption === "LE") {
                        if (htno[4] == 5) {
                            homepage(<R18LE query={response.data} />)
                        } else {
                            homepage(<><div style={{ marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <p><b>Please Enter Your R18 Lateral Entry Htno</b></p>
                            </div></>)
                        }
                    } else if (examType === "R22" && suboption === "Regular") {
                        if (htno[4] == 5) {
                            homepage(<><div style={{ marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <p><b>Please Enter Your R22 Regular Htno</b></p>
                            </div></>)
                        } else {
                            homepage(<R22Regular query={response.data} />)
                        }
                    } else if (examType === "R22" && suboption === "LE") {
                        if (htno[4] == 5) {
                            homepage(<R22LE query={response.data} />)
                        } else {
                            homepage(<><div style={{ marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                <p><b>Please Enter Your R22 Lateral Entry Htno</b></p>
                            </div></>)
                        }
                    }
                }
            }
            catch {
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
            <form>
                <div className="flex flex-col items-center justify-center text-center ">
                    <h1 className="text-3xl font-bold mt-16 mb-4 text-blue-500">Welcome to Credits Checker</h1>
                    <hr className="w-full border-gray-700" />
                        <h6 className="font-normal leading-normal mt-5 mb-2 font-bold mx-2 text-[1xl] sm:text-2xl">Check Your Credits Eligible Critiera Here </h6>
                    <div className="flex flex-row items-center justify-center mb-6">
                        <label className="mr-4">
                            <input type="radio" value="R18" checked={examType === 'R18'} onChange={handleExamTypeChange} required />
                            R18
                        </label>
                        <label>
                            <input type="radio" value="R22" checked={examType === 'R22'} onChange={handleExamTypeChange} required />
                            R22
                        </label>
                    </div>
                    {examType && (
                        <div className="flex flex-row items-center justify-center mb-6">
                            <label className="mr-4">
                                <input type="radio" value="Regular" checked={suboption === 'Regular'} onChange={handleSubOptionChange} required />
                                Regular
                            </label>
                            <label className="mr-4">
                                <input type="radio" value="LE" checked={suboption === 'LE'} onChange={handleSubOptionChange} required />
                                LE - Lateral Entry
                            </label>
                        </div>)}
                </div>

                <div method="get" className="mx-[0.25%] ">
                    <center>
                        <input name="htno" onChange={inputEvent} className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0" type="text" maxLength="10" placeholder="Enter your Roll Number" />
                        <br />
                        <p className="text-[60%] text-red-600">{warning}</p>
                        <br />
                        <br />
                        <button type="submit" onClick={submit} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
                            Results
                        </button>
                        <br />
                        <br />
                    </center>
                </div>
            </form>
            <Hr/>
            <div className="font-serif mt-1 block text-left text-[#808080] ml-[13%] mb-4 text-[55%] md:text-[80%]">
        It only works above R18 Regulation
        </div>
        </>
    )
}

const HomePage = () => {
    const homepage = (value) => {
        setContent(value);
    };
    const [content, setContent] = useState(<HomeCC homepage={homepage} />);
    return (
        <div>
            {content}
        </div>
    );
};
export default HomePage