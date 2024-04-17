const Search = ({ setSearch }) => {
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center relative  w-full">
        <input
          onChange={handleSearch}
          placeholder="Search Product Here"
          className="p-2 w-full md:w-3/4 m-5 rounded-lg border-2 border-blue-500 focus:outline-none focus:border-blue-700 shadow-md"
          type="text"
        />
      </div>
    </div>
  );
};

export default Search;
