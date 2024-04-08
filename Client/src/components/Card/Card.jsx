import { Link, NavLink, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/userProductSlice";
import { useDispatch } from "react-redux";

const Card = ({ user = false, value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardClassName = user
    ? " row-span-1 flex justify-around items-center bg-[#29495b]"
    : " row-span-2 flex justify-around items-center bg-[#29495b]";

  const handleDelete = async (productId) => {
    const action = await dispatch(deleteProduct(productId));
    if (action?.payload?.success) {
      navigate("/profile");
    }
  };
  return (
    <div className="h-[400px] p-1  md:w-[30%]  grid grid-rows-12 bg-[#5387a6] shadow-lg rounded-lg">
      <div className=" row-span-1 bg-[#2c4d5f]">
        <h1 className="text-xl text-center uppercase">{value.productName}</h1>
      </div>
      <div className=" mx-auto row-span-9 bg-[#5387a6] ">
        <img
          src={value&&value.images[0]?.secure_url}
          alt="product-image"
          className=" h-[100%] w-[100%]"
        />
      </div>
      <div className={cardClassName}>
        <p>Price : {value.price}</p>
        <NavLink to="/product-info" state={value}>
          
          <button className="px-4 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
            Info
          </button>
        </NavLink>
      </div>
      {user && (
        <div className="  row-span-1 flex justify-around items-center bg-[#29495b]">
          <NavLink to="/product-update" state={value}>
            <button className="px-2 py-1 bg-blue-500 text-black hover:bg-green-500 rounded-lg ">
              Edit
            </button>
          </NavLink>

          <button
            onClick={() => handleDelete(value._id)}
            className="px-2 py-1 bg-red-500 text-black hover:bg-green-500 rounded-lg "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
