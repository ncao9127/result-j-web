import React from "react";

const Contribute = () => {
    return (
        <>
            <footer className="bottom-0 opacity-50">
                <div className="md:h-8 ">
                    <div className=" md:px-0">
                        <p className="text-center text-sm sm:text-[100%]">
                            Collaborators:&nbsp;
                        </p>
                        {/* <p className="text-center text-[67%] sm:text-[100%] ">
                            <a href="https://github.com/thilakreddyy" target="_blank" rel="noreferrer">
                                Thilak Reddy&nbsp;,&nbsp;
                            </a>
                            <a href="https://github.com/hemanth-kotagiri" target="_blank" rel="noreferrer" >
                                Hemanth Kotagiri&nbsp;
                            </a>
                            &&nbsp;
                            <a href="https://github.com/Syed-Ansar" target="_blank" rel="noreferrer">
                                Syed Ansar
                            </a>
                        </p> */}
                        <p className="text-center text-[67%] sm:text-[100%] cursor-pointer">
                            <span>
                                Thilak Reddy&nbsp;,&nbsp;
                            </span>
                            <span>
                                Hemanth Kotagiri&nbsp;
                            </span>
                            &&nbsp;
                            <span>
                                Syed Ansar
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Contribute;