const FriedMessage = ({ msg }) => {
  
  return (
    <div className="  w-full  flex justify-start h-fit">
      <p className="bg-[#bbc1c9] rounded-lg ml-3 md:ml-10 my-1 px-3 py-1 max-w-56 md:max-w-96 text-black  ">
        {msg}
      </p>
    </div>
  );
};

export default FriedMessage;
