import { useEffect, useState } from "react";
import Card from "../../components/Card/Card.jsx";
import Search from "../../components/Search/Search.jsx";
import Layout from "../../Layout/Layout.jsx";
import { fetchProducts } from "../../redux/productSlice.js";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 3,
    page: 1,
    numberOfButtonPage: 5,
    starting: 1,
  });

  const { numberOfButtonPage, products } = useSelector(
    (state) => state.products
  );

  const handleButtonClick = (e)=>{
    const buttonValue = e.target.value;
    setPagination({
      ...pagination,
      page : buttonValue
    })

  }

  useEffect(() => {
    dispatch(fetchProducts({ ...pagination }));
  }, [pagination]);

  return (
    <Layout>
      <div className=" flex w-full  flex-wrap min-h-screen justify-center gap-5 ">
        <div className="hero-section h-[40vh] md:h-[80vh] w-full bg-blue-500">
          <Search />
          <div className=" flex h-full gap-5 justify-center flex-col items-center text-black ">
            <h1 className="md:text-4xl bg-green-600">
              Hey,Buyers Connent With Your Sellers
            </h1>
          </div>
        </div>
        <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
          <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
            {products &&
              products.map((product, idx) => (
                <Card key={idx} value={{ ...product }}>
                </Card>
              ))}
          </div>
        </div>

        <div className="w-full flex justify-center gap-2 items-center bg-slate-500 h-10 mx-2 py-1">
          {numberOfButtonPage &&
            (() => {
               const buttons = [];
              for (let i = 0; i < numberOfButtonPage; i++) {
                
               
                buttons.push (
                  <button
                    onClick={handleButtonClick}
                    className="px-2 rounded-lg shadow-lg border-solid border-2  py-1 bg-blue-500 text-black"
                    value={i + 1}
                    key={i}
                  >
                    {i + 1}
                  </button>
                );
              }
              return buttons;
            })()}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
