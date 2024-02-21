import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addProduct } from "../../redux/userProductSlice";
import Layout from "../../Layout/Layout";

const EditProduct = () => {
  const {state} =  useLocation();
  const {productName,description,category,price} = state;

  const [productData, setProductData] = useState({
    productName,
    description,
    category,
    price
  });
  console.log(productData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleImage = (e) => {
    const { files, name } = e.target;
    setProductData({
      ...productData,
      [name]: files,
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     !productData.name ||
  //     !productData.price ||
  //     !productData.category ||
  //     !productData.images ||
  //     !productData.description
  //   ) {
  //     toast.error("please fill all the field");
  //     return;
  //   }
  //   if (productData.images.length < 3) {
  //     toast.error("please add atleast 3 images");
  //     return;
  //   }

  //   const productFormData = new FormData();
  //   productFormData.append("name", productData.name);
  //   productFormData.append("price", productData.price);
  //   productFormData.append("category", productData.category);
  //   productFormData.append("description", productData.description);
  //   for (let i = 0; i < productData.images.length; i++) {
  //     productFormData.append("images", productData.images[i]);
  //   }
  //   const action = dispatch(addProduct(productFormData));
  //   if (action.payload?.success) {
  //     navigate("/profile");
  //     setProductData({});
  //   }
  // };

  return (
    <Layout>
      <div className="  flex mt-14  h-[80vh] justify-center w-full  items-center">
        <div className="  shadow-lg p-3 md:w-3/6 rounded-md w-full   ">
          <h1 className="text-2xl font-semibold text-center ">
            Update Product
          </h1>
          <form encType="multipart/form-data">
            <div className="">
              <label htmlFor="productName" className="block ">
                Product Name
              </label>
              <input
                value={productData.productName}
                onChange={handleChange}
                type="text"
                name="name"
                className="w-full px-2  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <label htmlFor="description" className="block ">
                Description
              </label>
              <textarea
                value={productData.description}
                onChange={handleChange}
                rows="2"
                name="description"
                className="w-full px-3 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <label htmlFor="price" className="block ">
                Price
              </label>
              <input
                value={productData.price}
                onChange={handleChange}
                type="number"
                name="price"
                className="w-full px-3  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <label htmlFor="price" className="block ">
                Category
              </label>
              <input
                value={productData.category}
                onChange={handleChange}
                type="text"
                name="category"
                className="w-full px-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="">
              <div className="flex  items-center gap-2">
                <label htmlFor="productImages" className="block ">
                  Images
                </label>
                <h2 className=" text-red-600 font-bold">* max 5 images</h2>
              </div>

              <input
                onChange={handleImage}
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-blue-500
            text-white rounded-md hover:bg-blue-600"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
