import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../helper/axiosInstance";
import { chatContext } from "../../contexApi/ContextProvider";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/productSlice";

const ProductInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ product , setProduct ] = useState({});

  const { productId } = useParams();
  const user = useSelector((state)=>state.user.data);
  // const { selectedFriend, setSelectedFriend } = useContext(chatContext);

  // const { price, description, images, productName, userId } = state;

  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const id = userDetails._id;

  const [bigImage, setBigImage] = useState("");
  const [proudctImages, setProductImages] = useState([]);

  const connectWithSeller = () => {
    navigate("/chat", { state: { onlyChatBox: true } });
  };

  useEffect(() => {
      axios.get(`/products/product-details/${productId}`)
      .then(({data})=>{
        setProduct(data.product);
        setBigImage(data.product.images[0].secure_url);
        setProductImages(data.product.images);
      })
      .catch((err)=>{console.log(err)});
  }, [productId]);

//  if(product){
//   console.log(product);
//  }

  // useEffect(() => {
  //   async function fetchSeller() {
  //     const response = await axios.get(`/user/seller-details/${userId}`);
  //     setSelectedFriend(response.data.value);
  //   }
  //   fetchSeller();
  // }, []);



  return (
    <Layout>
      <div className="min-h-screen w-screen px-2  flex gap-5 md:justify-center pt-2 flex-col md:flex-row  ">
        <div className=" w-full h-[40vh] md:w-[45%] md:h-[70vh] border-2  grid grid-cols-4 gap-3  grid-rows-5">
          <div className="row-span-5 col-span-3">
            <img
              src={bigImage}
              alt=""
              className="h-full w-full border-2 border-gray-950 p-2"
            />
          </div>
          {proudctImages.length &&
            proudctImages.map((image, idx) => (
              <div key={image.public_id}>
                <img
                  onClick={() => setBigImage(image.secure_url)}
                  src={image.secure_url}
                  alt="product-image"
                  className="h-full w-full border-2 border-gray-950 p-2"
                />
              </div>
            ))}
        </div>
        <div className="w-full h-fit md:w-[45%] md:h-full   flex flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            {product.userId != user._id && (
              <div className="flex justify-center relative mt-5 items-center">
                <button
                  onClick={connectWithSeller}
                  className=" w-fit p-3 bg-sky-500 text-white shadow-lg rounded-lg "
                >
                  Connect With Seller
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center  flex-col gap-2">
            <h1 className="text-2xl font-bold">
              Price: {product && product.price}
            </h1>
          </div>
          <div>
            <p className="text-lg">{product && product.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
