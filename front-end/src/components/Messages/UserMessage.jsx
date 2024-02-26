const UserMessage = ({ msg }) => {
  console.log("whats happen man");
  return (
    <div className="w-full  flex justify-end h-fit">
      <p className="bg-[#215221] rounded-lg mr-5 my-1 p-2 max-w-56 md:max-w-96 text-black">
        {msg}
      </p>
    </div>
  );
};

export default UserMessage;
