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
          <div
            className="h-[350px] md:w-[30%] flex flex-col justify-between shadow-lg rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',

              backgroundSize: "100% 100%",
            }}
          >
            <h1 className=" uppercase inline-block pt-2 text-center inset-0 bg-black text-white opacity-70  font-bold">
              Iphone 14
            </h1>

            <div className=" inset-0 bg-black  opacity-50  flex justify-center flex-col items-center px-2 pb-2 text-white font-bold">
              <p className="  p-1 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
                quae quo vel adipisci culpa autem, quidem ex eaque? At nobis,
                quis deleniti aliquam aliquid enim et dolorem delectus ipsam?
                Ab?
              </p>
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Details
              </button>
            </div>
          </div>
          <div
            className="h-[350px] md:w-[30%] flex flex-col justify-between shadow-lg rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',

              backgroundSize: "100% 100%",
            }}
          >
            <h1 className=" uppercase inline-block pt-2 text-center inset-0 bg-black text-white opacity-70  font-bold">
              Iphone 14
            </h1>

            <div className=" inset-0 bg-black  opacity-50  flex justify-center flex-col items-center px-2 pb-2 text-white font-bold">
              <p className="  p-1 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
                quae quo vel adipisci culpa autem, quidem ex eaque? At nobis,
                quis deleniti aliquam aliquid enim et dolorem delectus ipsam?
                Ab?
              </p>
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Details
              </button>
            </div>
          </div>
          <div
            className="h-[350px] md:w-[30%] flex flex-col justify-between shadow-lg rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',

              backgroundSize: "100% 100%",
            }}
          >
            <h1 className=" uppercase inline-block pt-2 text-center inset-0 bg-black text-white opacity-70  font-bold">
              Iphone 14
            </h1>

            <div className=" inset-0 bg-black  opacity-50  flex justify-center flex-col items-center px-2 pb-2 text-white font-bold">
              <p className="  p-1 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
                quae quo vel adipisci culpa autem, quidem ex eaque? At nobis,
                quis deleniti aliquam aliquid enim et dolorem delectus ipsam?
                Ab?
              </p>
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Details
              </button>
            </div>
          </div>
          <div
            className="h-[350px] md:w-[30%] flex flex-col justify-between shadow-lg rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',

              backgroundSize: "100% 100%",
            }}
          >
            <h1 className=" uppercase inline-block pt-2 text-center inset-0 bg-black text-white opacity-70  font-bold">
              Iphone 14
            </h1>

            <div className=" inset-0 bg-black  opacity-50  flex justify-center flex-col items-center px-2 pb-2 text-white font-bold">
              <p className="  p-1 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
                quae quo vel adipisci culpa autem, quidem ex eaque? At nobis,
                quis deleniti aliquam aliquid enim et dolorem delectus ipsam?
                Ab?
              </p>
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Details
              </button>
            </div>
          </div>
          <div
            className="h-[350px] md:w-[30%] flex flex-col justify-between shadow-lg rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',

              backgroundSize: "100% 100%",
            }}
          >
            <h1 className=" uppercase inline-block pt-2 text-center inset-0 bg-black text-white opacity-70  font-bold">
              Iphone 14
            </h1>

            <div className=" inset-0 bg-black  opacity-50  flex justify-center flex-col items-center px-2 pb-2 text-white font-bold">
              <p className="  p-1 ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
                quae quo vel adipisci culpa autem, quidem ex eaque? At nobis,
                quis deleniti aliquam aliquid enim et dolorem delectus ipsam?
                Ab?
              </p>
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
