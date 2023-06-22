import ClassResultPage from "../components/Classmate/ClassResultPage";
import Head from 'next/head';
const classresult = () => {

    return (
        <>
            <Head>
                <title>
                    JNTUH | CLASSMATE RESULTS
                </title>
                <meta
                    name="description"
                    content="Check out classmate result particular semester with in a go."
                    key="desc"
                />
            </Head>
            <ClassResultPage />

        </>
    )
}

export default classresult;

// import React, { useState } from "react";
// import { useRouter } from 'next/router'
// import axios from 'axios';
// import Printlist from "../components/Printlist/Printlist";
// import Loading from "../components/Loading/Loading";
// import url from "../components/api/api";
// import Hr from "../components/Hr/Hr";
// import HomeInfo from "../components/Home/HomeInfo";
// const HomePrintlist = ({ homepage }) => {
//     const router = useRouter();
//     const submits = async () => {
//         if ((htno1.length != 10 || htno2.length != 10 || code == "") || (htno1.slice(0, 8) != htno2.slice(0, 8)) || (htno1.slice(8, 10) > htno2.slice(8, 10))) {
//             alert("Please give the correct information!!")
//         }
//         else {
//             homepage(<Loading />)
//             const response = await axios.get(url + '/api/multi?from=' + htno1 + '&to=' + htno2 + '&code=' + code, { mode: 'cors' });
//             homepage(<Printlist query={response.data} />)
//         }
//     }
//     const inputEvent = (event) => {
//         event.target.value = event.target.value.toUpperCase();
//         if (event.target.name == "htno_1") {
//             setHtno1(event.target.value)
//         }
//         else if (event.target.name == "htno_2") {
//             setHtno2(event.target.value)
//         }
//         else if (event.target.name == "code") {
//             setCode(event.target.value)
//         }
//     }
//     const [htno1, setHtno1] = useState("");
//     const [htno2, setHtno2] = useState("");
//     const [code, setCode] = useState("");
//     return (
//         <>
//             <div method="get" >
//                 <center>
//                     <br />
//                     <h1 className="mb-2 font-bold text-[180%] ">
//                         Multi Results List
//                     </h1>
//                     <p>
//                         Fetech The List Of Grades For All Students of Particular Semester
//                     </p>
//                     <br />
//                     <div>
//                         <input onChange={inputEvent} name="htno_1" className="content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] sm:mx-2 m-1" type="text" maxLength="10" placeholder="Enter From Roll Number" required />
//                         <input onChange={inputEvent} name="htno_2" className="my-2 content-center border-[1px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:my-0 sm:mx-2" type="text" maxLength="10" placeholder="Enter To Roll Number" required />
//                     </div>
//                     <select name="code" onChange={inputEvent} className="text-[60%] md:border-[0.5px] rounded border-black border-solid md:mt-[25px] md:text-[80%]">
//                         <option >Semester</option>
//                         <option defaultValue value="1-1">1-1</option>
//                         <option value="1-2">1-2</option>
//                         <option value="2-1">2-1</option>
//                         <option value="2-2">2-2</option>
//                         <option value="3-1">3-1</option>
//                         <option value="3-2">3-2</option>
//                         <option value="4-1">4-1</option>
//                         <option value="4-2">4-2</option>
//                     </select>
//                     <br />
//                     <br />
//                     <button onClick={submits} className="w-[70px] text-white	bg-blue-700 rounded mr-1.5 text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
//                         Results
//                     </button>
//                     <br />
//                     <br />
//                 </center>
//             </div>
//             <Hr />
//             <HomeInfo />
//             <div className="font-serif mt-1 block text-left text-[#808080] ml-[13%] mb-4 text-[55%] md:text-[80%]">
//                 Range Should Be In Between Of 100
//             </div>
//         </>
//     )
// }

// const HomePage = () => {
//     const homepage = (value) => {
//         setContent(value);
//     };

//     const [content, setContent] = useState(<HomePrintlist homepage={homepage} />);

//     return (
//         <div>
//             {content}
//         </div>
//     );
// };

// export default HomePage;
