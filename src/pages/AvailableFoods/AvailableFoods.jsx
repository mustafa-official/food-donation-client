import AvailableSingleFood from "../../components/AvailableSingleFood";
import { useEffect, useState } from "react";
import axios from "axios";

const AvailableFoods = () => {
  const [search, setSearch] = useState("");
  const [availableFoods, setAvailableFoods] = useState([]);
  const [sortDate, setSortDate] = useState("");
  // const [dateSorted, setDateSorted] = useState("");
  useEffect(() => {
    axios(
      `${
        import.meta.env.VITE_API_URL
      }/available?search=${search}&sort=${sortDate}`
    )
      .then((res) => setAvailableFoods(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [search, sortDate]);


  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  const handleExpiredDate = (e) => {
    const dates = e.target.value;
    setSortDate(dates);
  };
// console.log(sortDate);
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Available Foods
      </h2>
      <div className="flex justify-center items-center gap-5 mt-10">
        <div>
          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden rounded-lg border-blue-400 border focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-4 py-2 text-black rounded-md placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter food name"
              />

              <button
                type="submit"
                className="px-1 ml-2 bg-[#42A5F5] capitalize md:px-4 py-3 text-sm font-medium tracking-wider grotesk transition-colors duration-300 transform  rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="text-black">
          <select
            onChange={handleExpiredDate}
            name="category"
            id="category"
            className="border py-3 px-4 rounded-lg"
          >
            <option>Sort by expired date</option>
            <option value="asc">Ascending</option>
            <option value="des">Descending</option>
           
          </select>
        </div>
      </div>
      {availableFoods.length === 0 ? (
        <p>No data found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 gap-5">
          {availableFoods.map((food) => (
            <AvailableSingleFood
              key={food._id}
              food={food}
            ></AvailableSingleFood>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
