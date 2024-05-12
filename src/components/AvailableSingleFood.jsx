import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AvailableSingleFood = ({ food }) => {
  const {
    food_image,
    food_name,
    // donator_image,
    // donator_name,
    food_quantity,
    pickup_location,
    expired_date,
    // food_status,
    // additional_notes,
    _id,
  } = food || {};
  return (
    <div className="flex hover:scale-105 transition  hover:shadow-md-purple flex-col p-4 lg:p-6 space-y-6  h-full  border hover:border-[#00BBE4] border-white border-b-[#00BBE4]  rounded-md  dark:bg-gray-50 dark:text-gray-800">
      <div className="flex-grow">
        <div className="rounded-lg">
          <img
            src={food_image}
            alt=""
            className="object-cover rounded-md  hover:scale-105 transition-all  w-full mb-4 h-52 md:h-60 mx-auto"
          />
        </div>

        <h2 className="mb-1 text-xl font-bold">{food_name}</h2>
        {/* <p
            title={additional_notes}
            className="text-[16px] mt-3  flex items-center gap-1 dark:text-gray-600"
          >
            {additional_notes.slice(0, 80)}...
          </p> */}
        <p className="text-[16px]  flex items-center mt-4 gap-1 dark:text-gray-600">
          <SlLocationPin className="text-[16px]"></SlLocationPin>{" "}
          {pickup_location}
        </p>
      </div>
      <hr />
      <div className="flex flex-wrap items-center justify-between">
        <p>
          Quantity: <span className="font-bold">{food_quantity}</span>
        </p>
        <div className="flex items-center gap-2 dark:text-gray-600">
          <div className="flex items-center gap-2">
            <p>
              Expired:{" "}
              <span className="font-bold">
                {new Date(expired_date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <Link
          to={`/food-details/${_id}`}
          className="px-5 text-center py-2.5 relative rounded group font-medium w-full text-white  inline-block"
        >
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-60 filter blur-sm bg-gradient-to-br from-[#00BBE4] to-gray-900"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 filter group-active:opacity-0 rounded opacity-60 from-[#00BBE4] to-gray-900"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#00BBE4] to-gray-900"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#00BBE4] from-black"></span>
          <span className="relative">View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default AvailableSingleFood;
AvailableSingleFood.propTypes = {
  food: PropTypes.object,
};
