import Header from "../Header/Header";
import Nav from "./Nav";
import Footer from "./footer";
import Alertinfo from "../ui/Alertinfo";

const Layout=({children})=>{
    return (
        <>
        <Header />
        <Nav />
        {children}
        <div className="mt-16"></div>
        <Footer/>
        <Alertinfo/>
        </>
    );
}
export default Layout;
