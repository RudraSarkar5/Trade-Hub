import { useLocation } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useState } from "react";

const ProductInfo = () => {
  const {state} = useLocation();
  const {price,description,images,productName} = state;
  const [bigImage,setBigImage] = useState(images[0].secure_url);
  const [proudctImages,setProductImages] = useState([]);

 
  
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
          {images&&images.map((image,idx)=>(
               <div>
                 <img
                   onClick={()=>setBigImage(image.secure_url)}
                   src={image.secure_url}
                   alt="product-image"
                   className="h-full w-full border-2 border-gray-950 p-2"
                 />
               </div>
          ))}
         
         
        </div>
        <div className="w-full h-fit md:w-[45%] md:h-full   flex flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold">{productName}</h1>
          </div>
          <div className="flex justify-center  flex-col gap-2">
            <h1 className="text-2xl font-bold">Price: {price}</h1>
          </div>
          <div>
            <p className="text-lg">
              {description}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <button className=" w-fit p-3 bg-slate-950 text-white shadow-lg rounded-lg ">
              Connect With Seller
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
