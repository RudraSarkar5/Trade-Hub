import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../helper/axiosInstance";
import { chatContext } from "../../contexApi/ContextProvider";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/productSlice.js";
import { createChat, updateCurrentChat } from "../../redux/chatSlice.js"
import toast  from "react-hot-toast";


const ProductInfo = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();
  const { isLoggedIn, userData, } = useSelector((state)=>state.user);

  const [ product , setProduct ] = useState({});
  const [productOwner,setProductOwner] = useState({});
  const [bigImage, setBigImage] = useState("");
  const [proudctImages, setProductImages] = useState([]);

  const connectWithSeller = async() => {
    if(!isLoggedIn){
      toast.error("Please log in first to connect with seller!");
      return;
    }
    const action = await dispatch(createChat({senderId : userData._id, receiverId : productOwner._id}));
    if(action?.payload?.success){
      const { _id  } = action.payload.chat;
      const chat = {
        chatId : _id,
        chatFriend : productOwner,
      }
      dispatch(updateCurrentChat({chat}));
      navigate("/chat");
    }
  };

  useEffect(() => {
      axios.get(`/products/product-details/${productId}`)
      .then(({data})=>{
        setProduct(data.product);
        setBigImage(data.product.images[0].secure_url);
        setProductImages(data.product.images);
        setProductOwner(data.product.productOwner);
      })
      .catch((err)=>{console.log(err)});
  }, [productId]);

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
            {!isLoggedIn || (product.userId != userData._id) ? (
              <div className="flex justify-center relative mt-5 items-center">
                <button
                  onClick={connectWithSeller}
                  className=" w-fit p-3 bg-sky-500 text-white shadow-lg rounded-lg "
                >
                  Connect With Seller
                </button>
              </div>
              ) : null 
            }
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
