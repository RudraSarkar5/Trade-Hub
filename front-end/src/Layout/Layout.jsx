import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="  min-h-screen w-screen">
      <Navbar />
      <div className="mb-10 mt-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
