import Layout from "../../Layout/Layout";
const EditProduct = () => {
  return (
    <Layout>
      <div className=" h-fit py-5 mb-10 px-5 flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700">
        <div className=" py-3 px-3 bg-white rounded-md shadow-md w-full md:w-2/3">
          <h1 className="text-2xl font-semibold mb-2 text-center text-blue-500">
            Update Product
          </h1>
          <form encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <div className="flex  items-center gap-5">
                <label htmlFor="productImages" className="block text-gray-600">
                  Images
                </label>
                <h2 className=" text-red-600 font-bold">* max 4 images</h2>
              </div>

              <input
                type="file"
                name="productImages"
                accept="image/*"
                multiple
                className="w-full"
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                value="Add Product"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
