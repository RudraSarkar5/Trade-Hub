import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { logOut, userDelete, getUserDetails } from "../../redux/userSlice";
import { getUserProducts } from "../../redux/userProductSlice";
import UserDetails from "../../components/UserDetails/UserDetails";
import ProductList from "../../components/ProductList/ProductList";
import AddProduct from "../../components/AddProduct/AddProduct";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProducts, setShowProducts] = useState(true);
  
  

  const handleShowProduct = () => {
    setShowProducts(true);
  };

  const handleAddProduct = () => {
    setShowProducts(false);
  };

  // const handleShowProducts = () => {
  //   setShowProducts(true);
  // };

  const handleLogOut = async () => {
    const action = await dispatch(logOut());
    if (action.payload?.success) {
      navigate("/login");
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    const action = await dispatch(userDelete());
    if (action.payload?.success) {
      navigate("/signup");
      window.location.reload();
    }
  };

  const { data , isUpToDate } = useSelector((state) => state?.user);
  const { products, productUpToDate } = useSelector((state) => state?.userProducts
  );

  useEffect(() => {
    if (!productUpToDate) {
      dispatch(getUserProducts());
    };
  }, [productUpToDate]);

  return (
    <Layout>

      <div className="">
        {data && (
          <UserDetails
            user={data}
            deleteProfile={handleDelete}
            logOutProfile={handleLogOut}
          />
        )}
      </div>

      <ul className="py-2 flex justify-center items-center gap-5">
        <li
          className="bg-white text-black rounded-md px-2 py-1"
          onClick={handleShowProduct}
        >
          Product List
        </li>
        <li
          className="bg-white text-black rounded-md px-2 py-1"
          onClick={handleAddProduct}
        >
          Add Product
        </li>
      </ul>

      {showProducts ? (
        <div className="product-list gap-5 flex-wrap mb-12 flex-col md:flex-row flex justify-center p-5 w-full min-h-fit">
          {products?.length > 0 ? (
            <ProductList allProduct={products} />
          ) : (
            <div className="text-center text-4xl">No Product Found</div>
          )}
        </div>
      ) : (
        <AddProduct controlShowProduct={handleShowProduct} />
      )}
    </Layout>
  );
};

export default Profile;
