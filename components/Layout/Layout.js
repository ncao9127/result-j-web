import Header from "../Header/Header";
import Nav from "./Nav";

const Layout=({children})=>{
    return (
        <>
        <Header />
        <Nav />
        {children}
        <div className="mt-16"></div>
        </>
    );
}
export default Layout;