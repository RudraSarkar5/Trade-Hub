import { useEffect, useState } from "react";
import Card from "../../components/Card/Card.jsx";
import Search from "../../components/Search/Search.jsx";
import Layout from "../../Layout/Layout.jsx";
import { fetchProducts,searchedProductName } from "../../redux/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

const Home = () => {

  const dispatch = useDispatch();

  const [showproducts, setShowproducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [pagination, setPagination] = useState({
    limit: 2,
    page: 1,
    numberOfButtonPage: 3,
    starting: 1,
  });

  const { numberOfButtonPage, products, isNextButtonAvailable } = useSelector(
    (state) => state.products
  );

  const handleButtonClick = (e)=>{
    const buttonValue = e.target.value;
    setPagination({
      ...pagination,
      page : buttonValue
    })

  }

  const handleNextButton = ()=>{
    const nextStarting = pagination.starting + pagination.numberOfButtonPage;
    setPagination({
      ...pagination,
      starting : nextStarting
    })
  }

  const handlePreviousButton = ()=>{
    const nextStarting = pagination.starting - pagination.numberOfButtonPage;
    setPagination({
      ...pagination,
      starting: nextStarting,
    });
  }

  useEffect(() => {
    console.log(searchText);
    if (searchText.length == 0) {
      dispatch(fetchProducts({ ...pagination }));
    } else {
      dispatch(searchedProductName(searchText));
    }
  }, [searchText]);

  useEffect(() => {
    dispatch(fetchProducts({ ...pagination }));
  }, [pagination]);

  return (
    <Layout>
      <div className=" flex w-full  flex-wrap min-h-screen justify-center gap-5 ">
        <div className="hero-section h-[40vh] md:h-[80vh] w-full bg-blue-500">
          <Search setSearch={setSearchText} />
          <div className=" flex h-full gap-5 justify-center flex-col items-center text-black ">
            <h1 className="md:text-4xl bg-green-600">
              Hey,Buyers Connent With Your Sellers
            </h1>
          </div>
        </div>
        <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
          <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <Card key={idx} value={{ ...product }}></Card>
              ))
            ) : (
              <h1 className="text-4xl text-white text-center">
                No Products Found
              </h1>
            )}
          </div>
        </div>

        {numberOfButtonPage > 0 && (
          <div className="w-full flex justify-center gap-2 items-center bg-slate-500 h-10 mx-2 py-1">
            {pagination.starting > pagination.numberOfButtonPage ? (
              <button
                onClick={handlePreviousButton}
                className=" bg-blue-500 rounded-lg border-solid border-2 text-white p-1 mr-2"
              >
                prev
              </button>
            ) : null}
            {(() => {
              const buttons = [];
              for (let i = 0; i < numberOfButtonPage; i++) {
                buttons.push(
                  <button
                    onClick={handleButtonClick}
                    className="px-2 rounded-lg shadow-lg border-solid border-2 py-1 bg-blue-500 text-black"
                    value={i + 1}
                    key={i}
                  >
                    {i + 1}
                  </button>
                );
              }
              return buttons;
            })()}
            {isNextButtonAvailable ? (
              <button
                onClick={handleNextButton}
                className="bg-blue-500 rounded-lg border-solid border-2 text-white p-1 ml-2"
              >
                next
              </button>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
