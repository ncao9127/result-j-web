import Link from "next/link";
import SocialHandles from "../ui/SocialHandles";
const Footer = () => {

    return (
        <>
            <SocialHandles />
            <div className="flex justify-center text-center m-2 text-xs	 text-black-1600  font-bold my-6">
                <p>Copyright &copy; 2023<br /> <Link href="/"> resultsjntuh.vercel.app</Link></p>
            </div>
        </>
    )
}
export default Footer;