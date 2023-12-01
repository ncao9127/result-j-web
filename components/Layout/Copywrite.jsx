import React from 'react';
import Link from "next/link";

const Copywrite = () => {
    return (
        <div className="flex justify-center text-center m-2 text-xs	 text-black-1600  font-bold my-6 top-0">
            <p>Copyright &copy; 2023<br /> <Link href="/"> resultsjntuh.vercel.app</Link></p>
        </div>
    );
};

export default Copywrite;