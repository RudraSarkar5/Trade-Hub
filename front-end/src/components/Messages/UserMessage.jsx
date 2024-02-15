const UserMessage =({msg})=>{
    return (
      <div className="w-full  flex justify-end h-fit">
        <p className="bg-green-500  p-2 max-w-56 md:max-w-96 text-black     ">
          {msg}
        </p>
      </div>
    );
};

export default UserMessage;