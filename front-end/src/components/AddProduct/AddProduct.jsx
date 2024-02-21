import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/userProductSlice";

const AddProduct = ({ controlShowProduct }) => {
  const [productData, setProductData] = useState({});

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.productName || !productData.description || !productData.category || !productData.price || !productData.images) {
      toast.error("please fill all the field");
      console.log("what worng");
      return;
    }
    if (productData.images.length < 3) {
      toast.error("please add atleast 3 images");
      return;
    }

    const productFormData = new FormData();
    productFormData.append("productName", productData.productName);
    productFormData.append("price", productData.price);
    productFormData.append("category", productData.category);
    productFormData.append("description", productData.description);
    for (let i = 0; i < productData.images.length; i++) {
      productFormData.append("images", productData.images[i]);
    }
    const action = await dispatch(addProduct(productFormData));
    if (action.payload?.success) {
      navigate("/profile");
      controlShowProduct();
    }
  };

  return (
    <div className="h-full w-screen flex justify-center items-center">
      <div className="  flex justify-center w-full md:w-2/3 items-center">
        <div className="p-3 border-white border-2 rounded-lg shadow-lg  w-full   ">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Add a New Product
          </h1>
          <form   onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="productName" className="block ">
                Product Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="productName"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block ">
                Description
              </label>
              <textarea
                onChange={handleChange}
                rows="5"
                name="description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block ">
                Price
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="price"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block ">
                Category
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="category"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <div className="flex  items-center gap-5">
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
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
