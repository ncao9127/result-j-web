import Header from "../Header/Header";
import Nav from "./Nav";
import Footer from "./footer";

const Layout=({children})=>{
    return (
        <>
        <Header />
        <Nav />
        {children}
        <div className="mt-16"></div>
        <Footer/>
        </>
    );
}
export default Layout;