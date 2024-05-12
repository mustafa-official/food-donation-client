import AvailableSingleFood from "../../components/AvailableSingleFood";
import { useState } from "react";
import axios from "axios";
import { TfiLayoutGrid3, TfiLayoutGrid3Alt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import notFound from "../../assets/no.png";

const AvailableFoods = () => {
  const [search, setSearch] = useState("");
  // const [availableFoods, setAvailableFoods] = useState([]);
  const [sortDate, setSortDate] = useState("");
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  const { isLoading, data: availableFoods } = useQuery({
    queryKey: ["availableFood", search, sortDate],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/available?search=${search}&sort=${sortDate}`
      );
      return res.data;
    },
  });

  // console.log(availableFoods);

  // useEffect(() => {
  //   axios(
  //     `${
  //       import.meta.env.VITE_API_URL
  //     }/available?search=${search}&sort=${sortDate}`
  //   )
  //     .then((res) => setAvailableFoods(res.data))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [search, sortDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  const handleExpiredDate = (e) => {
    const dates = e.target.value;
    setSortDate(dates);
  };
  const handleLayout = () => {
    setIsTwoColumn(!isTwoColumn);
  };
  // console.log(isTwoColumn);

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-80px)] justify-center items-center">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );
  if (availableFoods.length === 0)
    return (
      <div className="flex flex-col gap-3 justify-center min-h-[calc(80vh-80px)] items-center">
        <div className="">
          <img className="w-[60%] md:w-[50%] mx-auto" src={notFound} />
        </div>
        <p className="text-[12px] md:text-[16px]">No Data Found !</p>
       
      </div>
    );
  return (
    <div>
      <h2 className="text-2xl md:text-4xl md:mt-6 mt-8 font-bold text-center">
        Available Foods
      </h2>
      <div className="flex justify-center flex-col md:flex-row items-center gap-3 mt-6 md:mt-10">
        <div>
          <form onSubmit={handleSearch} className="bg-white rounded-md">
            <div className="flex p-1 overflow-hidden rounded-md focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="md:px-4 md:py-2 pl-2 text-black rounded-md placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter food name"
              />

              <button
                type="submit"
                className="px-3 ml-2 bg-[#00BBE4]  md:px-3 py-3 text-xl  tracking-wider  transition-colors duration-300 transform  rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                <IoSearch></IoSearch>
              </button>
            </div>
          </form>
        </div>
        <div className="text-black">
          <select
            onChange={handleExpiredDate}
            name="category"
            id="category"
            className=" bg-[#00BBE4] text-white md:py-[14px] px-2 py-[10px] md:px-4 rounded-md"
          >
            <option>Sort by</option>
            <option value="asc">Ascending</option>
            <option value="des">Descending</option>
          </select>
        </div>
        <div>
          <p onClick={handleLayout} className="text-2xl cursor-pointer">
            {isTwoColumn ? (
              <TfiLayoutGrid3Alt></TfiLayoutGrid3Alt>
            ) : (
              <TfiLayoutGrid3></TfiLayoutGrid3>
            )}
          </p>
        </div>
      </div>

      <div
        className={`mt-8 gap-5 grid grid-cols-1 md:grid-cols-2 ${
          isTwoColumn ? "lg:grid-cols-2 gap-x-8 gap-y-8" : "lg:grid-cols-3"
        }`}
      >
        {availableFoods?.map((food) => (
          <AvailableSingleFood key={food._id} food={food}></AvailableSingleFood>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
