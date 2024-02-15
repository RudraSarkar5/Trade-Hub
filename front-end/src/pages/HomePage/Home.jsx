import Card from "../../components/Card/Card.jsx";
import Search from "../../components/Search/Search.jsx";
import Layout from "../../Layout/Layout.jsx";

import "./Home.css";

const Home = () => {
  return (
    <Layout>
      <div className=" flex w-full  flex-wrap min-h-screen justify-center gap-5 ">
        <div className="hero-section h-[40vh] md:h-[80vh] w-full bg-blue-500">
          <Search />
          <div className=" flex h-full gap-5 justify-center flex-col items-center text-black ">
            <h1 className="md:text-4xl bg-blue-600">
              Hey,Buyers Connent With Your Sellers
            </h1>
            <h1 className="md:text-4xl bg-green-600">
              Hey,Sellers Connent With Your Buyers
            </h1>
          </div>
        </div>
        <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
          <Card/>
         
        </div>
      </div>
    </Layout>
  );
};

export default Home;
