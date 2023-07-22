import Link from "next/link";
import React,{useState} from 'react';
import Qrcode from "../ui/Qrcode";

const HomeFooter = ()=>{
    const [isModalVisible, setModalVisible] = useState(false);

    // Function to handle the link click and show the modal
    const handleLinkClick = () => {
      setModalVisible(true);
    };
  
    // Function to hide the modal
    const handleCloseModal = () => {
      setModalVisible(false);
    };
    
    return (
    <>
        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[65%] sm:text-[100%]">
            Made with ❤ by &nbsp;
            <Link href="/" >
                <a target="_blank" className="font-bold text-[#9C1A8B]" >
                    MD MOIZ UDDIN
                </a>
            </Link>
        </p>
        <p className="mt-1 block text-left mx-[12%] text-center mb-4 text-[67%] sm:text-[100%]">
        If you found this app helpful, you can support me by &nbsp;
        <a className="font-bold text-[#9C1A8B] cursor-pointer" onClick={handleLinkClick}>
          buying me a pizza here.
        </a>
      </p>

      {isModalVisible && <Qrcode onClose={handleCloseModal} />}
    </>      
    )
}
export default HomeFooter;
