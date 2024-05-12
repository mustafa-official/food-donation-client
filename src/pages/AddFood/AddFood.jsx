import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_image = form.foodImage.value;
    const food_name = form.foodName.value;
    const donator_image = user?.photoURL;
    const donator_name = user?.displayName;
    const donator_email = user?.email;
    const food_quantity = parseInt(form.quantity.value);
    const pickup_location = form.pickupLocation.value;
    const expired_date = startDate;
    const additional_notes = form.notes.value;
    const food_status = form.status.value;

    const addFood = {
      food_image,
      food_name,
      donator_image,
      donator_name,
      donator_email,
      food_quantity,
      pickup_location,
      expired_date,
      additional_notes,
      food_status,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/add-food`, addFood)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Food has been added successfully",
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
    <div className="w-full mx-auto md:max-w-3xl md:mt-8 mt-5">
      <Helmet><title>Hey Foods | Add Food</title></Helmet>
      <form
        onSubmit={handleRequest}
        className="mt-4 sm:flex sm:items-center sm:-mx-2 border border-[#00BBE4] py-8 rounded-xl px-6"
      >
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-bold text-center">Add Food</h1>
          <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-4 md:grid-cols-2">
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Name
                </label>
                <input
                  disabled
                  defaultValue={user?.displayName}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Email
                </label>
                <input
                  disabled
                  defaultValue={user?.email}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Donator Image URL
                </label>
                <input
                  disabled
                  defaultValue={user?.photoURL}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Pickup Location
                </label>
                <input
                  required
                  name="pickupLocation"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="">
                  Food Name
                </label>
                <input
                  required
                  name="foodName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="">
                  Food Image URL
                </label>
                <input
                  required
                  name="foodImage"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="">
                  Food Status
                </label>
                <input
                  name="status"
                  disabled
                  defaultValue="available"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-sm" htmlFor="">
                    Expired Date
                  </label>
                  <DatePicker
                    required
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
                    required
                    name="quantity"
                    type="number"
                    className="block w-full px-4 py-2 mt-2 border bg-gray-900 text-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>
            </div>
            <textarea
              name="notes"
              required
              className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-md  mt-6 p-3 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              rows={3}
              placeholder="Write about food"
            ></textarea>
          </div>
          <div className="w-[300px] flex">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              Add Food
            </button>
          </div>
        </div>
      </form>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default AddFood;
