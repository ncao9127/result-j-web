import Link from "next/link";
import SocialHandles from "../ui/SocialHandles";
import Image from 'next/image';
import { useTheme } from 'next-themes';
const Footer = () => {
    const { theme } = useTheme();
    // Define the image source based on the current theme
    const logoSrc = theme === 'dark' ? '/logodark.png' : '/logo.png';

    return (
        <>
            {/* <div className="opacity-50 flex justify-center items-center hidden print:block my-6">
                <center>
                    <Image
                        src={logoSrc} // Use the dynamically determined image source
                        alt="Results Jntuh Logo"
                        width={70}
                        height={50}
                    />
                </center>
            </div> */}
            <div className="opacity-80">
                <SocialHandles />
            </div>
            <div className="flex justify-center text-center m-2 text-xs	 text-black-1600  font-bold my-6">
                <p>Copyright &copy; 2023<br /> <Link href="/"> resultsjntuh.vercel.app</Link></p>
            </div>
        </>
    )
}
export default Footer;