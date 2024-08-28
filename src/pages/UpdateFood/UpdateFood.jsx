import {
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateFood = () => {
  const update = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(updateFood);
  const {
    food_image,
    food_name,
    food_quantity,
    pickup_location,
    expired_date,
    additional_notes,
    _id,
  } = update || {};
  const [startDate, setStartDate] = useState(expired_date);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_image = form.foodImage.value;
    const food_name = form.foodName.value;
    // const donator_image = user?.photoURL;
    // const donator_name = user?.displayName;
    // const donator_email = user?.email;
    const food_quantity = parseInt(form.quantity.value);
    const pickup_location = form.pickupLocation.value;
    const expired_date = startDate;
    const additional_notes = form.notes.value;
    const foodInfo = {
      food_image,
      food_name,
      food_quantity,
      pickup_location,
      expired_date,
      additional_notes,
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/update-food/${_id}`, foodInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Food has been updated successfully",
            icon: "success",
          });
          navigate("/manage-foods");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full mx-auto md:max-w-3xl px-6 lg:px-12 md:mt-8 mt-5">
      <Helmet>
        <title>Pure Harvest | Update Food</title>
      </Helmet>
      <form
        onSubmit={handleUpdate}
        className="mt-4 sm:flex sm:items-center sm:-mx-2 border bg-[#ffffff11] py-8 rounded-xl px-6"
      >
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-bold text-center">Update Your Food</h1>
          <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-4 md:grid-cols-2">
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Name
                </label>
                <input
                  readOnly
                  defaultValue={user?.displayName}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Email
                </label>
                <input
                  readOnly
                  defaultValue={user?.email}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Image URL
                </label>
                <input
                  readOnly
                  defaultValue={user?.photoURL}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Pickup Location
                </label>
                <input
                  defaultValue={pickup_location}
                  name="pickupLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="">
                  Food Name
                </label>
                <input
                  defaultValue={food_name}
                  name="foodName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="">
                  Food Image URL
                </label>
                <input
                  defaultValue={food_image}
                  name="foodImage"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Food Status
                </label>
                <input
                  name="status"
                  readOnly
                  defaultValue="available"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-sm" htmlFor="">
                    Expired Date
                  </label>
                  <DatePicker
                    className="p-2 rounded-md w-full border bg-gray-900 text-gray-100"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm" htmlFor="">
                    Quantity
                  </label>
                  <input
                    defaultValue={food_quantity}
                    name="quantity"
                    type="number"
                    className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md    focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>
            <textarea
              defaultValue={additional_notes}
              name="notes"
              className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-md  mt-6 p-3 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              rows={3}
            ></textarea>
          </div>
          <div className="w-[300px] flex">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00BBE4] rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default UpdateFood;
