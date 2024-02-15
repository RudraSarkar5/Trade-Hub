const FriedMessage = ({ msg }) => {
  return (
    <div className="  w-full  flex justify-start h-fit">
      <p className="bg-white  p-2 max-w-56 md:max-w-96 text-black     ">
        {msg}
      </p>
    </div>
  );
};

export default FriedMessage;
