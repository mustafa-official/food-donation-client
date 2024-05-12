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
import { IoIosClose } from "react-icons/io";

const FoodDetails = () => {
  const food = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log(navigation.state);

  const {
    food_image,
    food_name,
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

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <div className="px-6 lg:px-12 lg:mt-10">
      <Helmet>
        <title>{`Pizza House | ${food_name}`}</title>
      </Helmet>
      {/* <h2 className="my-6 text-2xl font-bold">Donator Information</h2> */}

      {/* Donator Information */}
      {/* <div className="max-w-md flex flex-col md:flex-row gap-5 md:items-center text-gray-100">
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
      </div> */}

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
              <p className="mt-4 mb-1">
                Donator: <span className="font-bold">{donator_name}</span>
              </p>
              <p className="flex items-center gap-1">
                <SlLocationPin className="text-[16px]"></SlLocationPin>{" "}
                {pickup_location}
              </p>
              <p className="mt-4 mb-1">
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
            onClick={() => openModal()}
            type="button"
            className="h-10 px-6 py-2 mt-6 text-white transition-colors duration-300 transform bg-[#00BBE4] rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
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
            <div className="flex  items-end justify-center min-h-screen px-4 pt-4  text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="relative inline-block px-4 pt-5 overflow-hidden text-left align-bottom transition-all transform bg-transparent backdrop-blur-md border-2  bg-[#ffffff46] rounded-lg shadow-xl dark:bg-gray-900 w-[80%] md:w-[70%] lg:w-[50%] my-4 pb-6 sm:align-middle">
                <h3
                  className="text-lg font-medium text-white capitalize dark:text-white"
                  id="modal-title"
                >
                  Request Here
                </h3>

                {/* Request Now */}
                <form
                  onSubmit={handleRequest}
                  className="sm:flex sm:items-center sm:-mx-2 px-2"
                >
                  <div className="flex flex-col gap-3 w-full text-black">
                    <div>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2 mt-2 md:grid-cols-2">
                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Food Name
                          </label>

                          <input
                            disabled
                            defaultValue={food_name}
                            type="text"
                            className="block w-full px-2 py-2  mt-1  text-[#ffffff] bg-[#ffffff69] border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Food Image URL
                          </label>
                          <input
                            disabled
                            defaultValue={food_image}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Donator Name
                          </label>
                          <input
                            disabled
                            defaultValue={donator_name}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Donator Email
                          </label>
                          <input
                            disabled
                            defaultValue={donator_email}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Pickup Location
                          </label>
                          <input
                            disabled
                            defaultValue={pickup_location}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            User Email
                          </label>
                          <input
                            disabled
                            defaultValue={user?.email}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Food Id
                          </label>
                          <input
                            disabled
                            defaultValue={_id}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-white" htmlFor="">
                            Expired Date
                          </label>
                          <input
                            disabled
                            defaultValue={expired_date}
                            type="text"
                            className="block w-full px-2 py-2  mt-1 text-[#ffffff] bg-[#ffffff69] border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-xs text-white" htmlFor="">
                            Request Date
                          </label>
                          <DatePicker
                            disabled
                            className="border py-2  pr-24 pl-2 mt-2 bg-[#ffffff69] rounded-md w-full text-black "
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      </div>

                      <textarea
                        defaultValue={additional_notes}
                        className="w-full border border-[#00BBE4] rounded-md text-black mt-6 p-3"
                        rows={3}
                        name="additionalNotes"
                        placeholder="Write your think"
                      ></textarea>
                    </div>
                    <div className="">
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => closeModal()}
                          className="text-3xl font-bold text-black bg-base-200 rounded-md hover:bg-base-300"
                        >
                          <IoIosClose></IoIosClose>
                        </button>
                      </div>

                      <div className="w-[250px]">
                        <button
                          type="submit"
                          className="py-2 md:px-0 px-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#00BBE4] rounded-md sm:mt-0 sm:w-1/2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        >
                          Request Now
                        </button>
                      </div>
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
