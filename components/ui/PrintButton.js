
import React, { useState } from 'react';

const PrintButton = () => {
  const print = () => {
    setTimeout(function () {
      window.print();
    }, 500);
  }

  return(
    <>
      <div className="printi flex flex-col items-center ">
        <button onClick={print} className="w-[70px] text-white	bg-blue-500 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%] font-bold md:my-2">Print</button>
      </div>
    </>
  )
}
export default PrintButton



