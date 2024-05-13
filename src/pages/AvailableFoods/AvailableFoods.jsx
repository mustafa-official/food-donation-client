import AvailableSingleFood from "../../components/AvailableSingleFood";
import { useState } from "react";
import axios from "axios";
import { TfiLayoutGrid3, TfiLayoutGrid3Alt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import notFound from "../../assets/no.png";
import { ScrollRestoration } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
      <div className="flex min-h-[calc(100vh-80px)] justify-center items-center px-6 lg:px-12">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );
  if (availableFoods.length === 0)
    return (
      <div className="flex flex-col gap-3 justify-center min-h-[calc(80vh-80px)] items-center px-6 lg:px-12">
        <div className="">
          <img className="w-[60%] md:w-[50%] mx-auto" src={notFound} />
        </div>
        <p className="text-[12px] md:text-[16px]">No Data Found !</p>
      </div>
    );
  return (
    <div className="px-6 lg:px-12">
      <Helmet>
        <title>Pizza House | Available Foods</title>
      </Helmet>
      <h2 className="text-2xl md:text-4xl md:mt-6 mt-8 font-bold text-center">
        Available Foods
      </h2>
      <div className="flex justify-center flex-col md:flex-row items-center gap-3 mt-6 md:mt-10">
        <div>
        {/* overflow p-1 */}
          <form onSubmit={handleSearch} className="bg-white rounded-md">
            <div className="flex p-1 rounded-md focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="md:px-3 text-black rounded-md placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Search food name"
              />

              <button
                type="submit"
                className="px-3 ml-2 bg-[#00BBE4]  md:px-3 py-2 text-xl  tracking-wider  transition-colors duration-300 transform  rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
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
            className=" bg-[#00BBE4] text-white md:py-[10px] px-2 py-[10px] md:px-4 rounded-md"
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
          isTwoColumn
            ? "lg:grid-cols-2 gap-x-10 gap-y-10"
            : "lg:grid-cols-3 gap-x-8 gap-y-8"
        }`}
      >
        {availableFoods?.map((food) => (
          <AvailableSingleFood key={food._id} food={food}></AvailableSingleFood>
        ))}
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default AvailableFoods;
