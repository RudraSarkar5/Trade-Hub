const FriedMessage = ({ msg }) => {
  
  return (
    <div className="  w-full  flex justify-start h-fit">
      <p className="bg-gray-700 rounded-lg ml-5 my-1 p-2 max-w-56 md:max-w-96 text-black  ">
        {msg}
      </p>
    </div>
  );
};

export default FriedMessage;
