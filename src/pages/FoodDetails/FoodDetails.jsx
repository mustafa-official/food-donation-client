import { useLoaderData } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
const FoodDetails = () => {
  const food = useLoaderData();
  const {
    food_image,
    food_name,
    donator_image,
    donator_name,
    food_quantity,
    pickup_location,
    expired_date,
    food_status,
    additional_notes,
    _id,
  } = food || {};
  return (
    <div>
      <h2 className="my-6 text-2xl font-bold">Donator Information</h2>
      <div className="max-w-md flex flex-col md:flex-row gap-5 md:items-center bg-gray-900 text-gray-100">
        <div className="flex-shrink-0 mb-12 md:w-40 w-36 h-36 md:h-40">
          <img
            src={donator_image}
            alt=""
            className="object-cover object-center w-full h-full rounded bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div>
            <h2 className="text-2xl font-semibold">{donator_name}</h2>
            <span className="text-sm text-gray-400"></span>
          </div>
          <div className="">
            <span className="flex items-center space-x-2">
              <SlLocationPin></SlLocationPin>
              <span className="text-gray-400">{pickup_location}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto lg:flex-row lg:items-center">
        <div className="w-full">
          <img
            className="object-cover w-full h-full mx-auto rounded-md"
            src={food_image}
            alt="glasses photo"
          />
        </div>
        <div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide lg:text-4xl">
              {food_name}
            </h1>

            <div className="mt-4">
              <p>{additional_notes}</p>
              <p className="mt-5 mb-2">
                Quantity: <span className="font-bold">{food_quantity}</span>
              </p>
              <p>
                Expired Date: <span className="font-bold">{expired_date}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            className="h-10 px-6 py-2 mt-6 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            Request
          </button>
        </div>
      </div>

      
    </div>
    
  );
};

export default FoodDetails;
