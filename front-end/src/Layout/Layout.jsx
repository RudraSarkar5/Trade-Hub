
import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"

const Layout =({children})=>{
    return (
      <div className=" min-h-screen w-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    );
}

export default Layout;