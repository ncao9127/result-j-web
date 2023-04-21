import { BiArrowBack as BackIcon } from "react-icons/bi";
import Link from "next/link";

const Info = () => {

    return (
        <>
            <style>
                {`
                @media print {
                  .refresh-button {
                    display: none;
                  }
                  .hello{
                    display: none;
                  }
                }
                `}
            </style>
            <center>
                <div className="font-serif mt-1 block text-[#808080]  mt-4 text-[55%] md:text-[80%]">
                    <button onClick={() => window.location.reload()} className="refresh-button">To Find Someone Else Results 🔃 Just Refresh Page</button>
                </div>

                <div className="hello overflow-hidden flex flex-col items-center justify-center  font-inter">
                    <Link href="/">
                        <div className="flex flex-row items-center justify-between cursor-pointer">
                            <BackIcon size="1rem" className=" mt-2 text-gray-400" />
                            <h6 className=" font-serif block text-[#808080] md:text-[80%] mt-2 ">
                                Home
                            </h6>
                        </div>
                    </Link>
                </div>
                <br />
            </center>

        </>
    )
}
export default Info;
