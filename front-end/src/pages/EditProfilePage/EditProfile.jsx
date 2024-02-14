import Layout from "../../Layout/Layout";
const EditProfile = () => {
  return (
    <Layout>
      <div className=" h-screen md:h-fit  py-5 mb-10 px-5 flex justify-center items-center ">
        <div className=" py-3 px-3 bg-black rounded-md shadow-md w-full md:w-2/3">
          <h1 className="text-2xl font-semibold mb-2 text-center text-blue-500">
            Update Profile
          </h1>
          <form encType="multipart/form-data" className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block ">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

           

           
            <div>
              <label htmlFor="location" className="block ">
                Location
              </label>
              <input
                type="text"
                name="location"
                className="w-full  border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="block ">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="w-full"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
              >
                update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
