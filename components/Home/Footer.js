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
            <Link href=""  >
                <a target="_blank" className="font-bold text-[#9C1A8B]"  onClick={() => window.location.reload()}>
                    MD MOIZ UDDIN
                </a>
            </Link>
        </p>
        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
            If you found this app helpful, you can support me by &nbsp;
            <Link href="https://paytm.me/d-XoZ3L" >
                <a className="font-bold text-[#9C1A8B]">
                    buying me a pizza here.
                </a>
            </Link>
        </p>
       
        

    </>      
    )
}
export default Footer;
