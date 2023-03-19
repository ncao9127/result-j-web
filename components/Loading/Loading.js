// const Loading=()=>
// {
//   return(
//     <center>
//       <button type="button" className="text-[50%] inline-flex items-center px-2 py-1 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed sm:px-4 sm:py-2 sm:text-[100%]" disabled="">
//         <svg className="animate-spin -ml-1 mr-3 h-2.5 w-2.5 text-white sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//         </svg>
//         Processing...
//       </button>
//     </center>
//   )
// }

// export default Loading; 


// import React from 'react';
// import { HashLoader } from 'react-spinners';

// const Loading = () => {
//   return (
//     <div className="flex flex-col items-center h-screen">
//     <center>
//         <HashLoader size={20} color="#ffffff" css="margin-right: 8px;" />
//         <h1 className="text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400">
//          Sit back, relax while the backend fetches all the results
//        </h1>
//           Processing...
    
//     </center>
//     </div>
//   );
// };

// export default Loading;
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-l sm:text-2xl mt-6 mb-6 text-center text-gray-400">
        Relax while the backend fetched the results
      </h1>
      <hr className="sm:w-96 w-48 border-gray-700 mb-6" />
      <div className="flex items-center justify-center">
        <HashLoader color={"#558888"}  size={30} css={{margin: 'auto'}} />
      </div>
    </div>
  );
};

export default Loading;
