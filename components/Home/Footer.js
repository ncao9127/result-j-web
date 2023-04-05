import Link from "next/link";
import HomeBanner from "./HomeBanner";
import React,{useState} from 'react';

const Footer = ()=>
{
    const closeBanner=()=>{
        
       setHomeBanner(<></>)
    }
    const [homeBanner,setHomeBanner]=useState(<HomeBanner closeBanner={closeBanner}/>)
    return (
    <>

        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
            Made with ❤ by &nbsp;
            <Link href="https://github.com/khaja-moiz/" >
                <a target="_blank" className="font-bold text-[#9C1A8B]" >
                    MD MOIZ UDDIN
                </a>
            </Link>
        </p>
        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
            If you found this app helpful, you can support me by &nbsp;
            <Link href="upi://pay?pa=mduddin2502@paytm&pn=ResultsJntuh&cu=INR" >
                <a className="font-bold text-[#9C1A8B]">
                    buying me a pizza here.
                </a>
            </Link>
        </p>
       
        

    </>      
    )
}
export default Footer;
