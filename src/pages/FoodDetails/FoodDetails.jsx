import {
  ScrollRestoration,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const FoodDetails = () => {
  const food = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    food_image,
    food_name,
    donator_image,
    donator_name,
    food_quantity,
    pickup_location,
    expired_date,
    additional_notes,
    _id,
    donator_email,
  } = food || {};

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const additional_notes = form.additionalNotes.value;
    const food_status = "Requested";
    const request_date = startDate;
    const user_email = user?.email;
    const requestInfo = {
      additional_notes,
      food_status,
      request_date,
      user_email,
    };
    // console.log(requestInfo);
    axios
      .put(`${import.meta.env.VITE_API_URL}/update-status/${_id}`, requestInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Your request has been successfully",
            icon: "success",
          });
          navigate("/food-request");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Helmet>
        <title>{`Hey Foods | ${food_name}`}</title>
      </Helmet>
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
                Expired Date:{" "}
                <span className="font-bold">
                  {new Date(expired_date).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="h-10 px-6 py-2 mt-6 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
          >
            Request
          </button>
        </div>
      </div>

      <div className="relative flex justify-center">
        {isOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 w-[80%] md:w-[70%] lg:w-[50%] sm:p-6 sm:align-middle">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  Request Here
                </h3>

                <form
                  onSubmit={handleRequest}
                  className="mt-4 sm:flex sm:items-center sm:-mx-2"
                >
                  <div className="flex flex-col gap-8 w-full">
                    <div>
                      <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                        <div>
                          <input
                            disabled
                            defaultValue={food_name}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <input
                            disabled
                            defaultValue={food_image}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <input
                            disabled
                            defaultValue={donator_name}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <input
                            disabled
                            defaultValue={donator_email}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <input
                            disabled
                            defaultValue={pickup_location}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <input
                            disabled
                            defaultValue={user?.email}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <input
                            disabled
                            defaultValue={_id}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <input
                            disabled
                            defaultValue={pickup_location}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="mt-2">
                          <DatePicker
                            disabled
                            className="border p-2 rounded-lg w-full text-gray-700"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      </div>
                      <textarea
                        defaultValue={additional_notes}
                        className="w-full border border-gray-200 rounded-md text-black mt-6 p-3"
                        rows={3}
                        name="additionalNotes"
                        placeholder="Write your think"
                      ></textarea>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      >
                        Request Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default FoodDetails;
