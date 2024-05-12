// import { useEffect, useState } from "react";
import SingleFoods from "./SingleFoods";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
const FeaturedFoods = () => {
  // const [foods, setFoods] = useState([]);

  const { isLoading, data: foods } = useQuery({
    queryKey: ["featuredFood"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/featured-foods`
      );
      return res.data;
    },
  });

  // useEffect(() => {
  //   axios(`${import.meta.env.VITE_API_URL}/featured-foods`)
  //     .then((res) => setFoods(res.data))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // console.log(foods);

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );
  return (
    <div className="mt-8 md:mt-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center">Top Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 gap-5">
        {foods?.map((food) => (
          <SingleFoods key={food._id} food={food}></SingleFoods>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/available-foods">
          <Button
            className="bg-[#00BBE4] border border-[#00BBE4] hover:bg-transparent"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            size="md"
          >
            See All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
