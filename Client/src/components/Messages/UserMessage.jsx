const UserMessage = ({ msg }) => {
 
  return (
    <div className="w-full  flex justify-end h-fit">
      <p className="bg-[#2359b0] rounded-lg mr-3 md:mr-10 my-1 px-3 py-1 max-w-56 md:max-w-96 text-white">
        {msg}
      </p>
    </div>
  );
};

export default UserMessage;
