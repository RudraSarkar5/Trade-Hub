import { Link } from "react-router-dom";

const Card = ({ user = false }) => {

  return (
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam quae quo
          vel adipisci culpa autem, quidem ex eaque? At nobis, quis deleniti
          aliquam aliquid enim et dolorem delectus ipsam? Ab?
        </p>
        <div className=" flex justify-around py-1 w-full ">
          <Link to="/product-info/1">
            <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
              Check In
            </button>
          </Link>

          {user ? (
            <Link to="/product-update/1">
              <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
                Edit
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;