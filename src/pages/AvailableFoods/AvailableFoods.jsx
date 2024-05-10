import { useLoaderData } from "react-router-dom";
import AvailableSingleFood from "../../components/AvailableSingleFood";

const AvailableFoods = () => {
  const availableFoods = useLoaderData();
  // console.log(availableFoods);
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Available Foods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 gap-5">
        {availableFoods.map((food) => (
          <AvailableSingleFood key={food._id} food={food}></AvailableSingleFood>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
