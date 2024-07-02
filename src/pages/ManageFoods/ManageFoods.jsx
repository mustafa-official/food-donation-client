import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, ScrollRestoration } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";

const ManageFoods = () => {
  const { user } = useAuth();
  // const [myFood, setMyFood] = useState([]);
  const [myFoodData, setMyFoodData] = useState([]);

  const { isLoading, data: myQueryFood } = useQuery({
    queryKey: ["manageFoods", user],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/manage-food/${user?.email}`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (myQueryFood) {
      setMyFoodData(myQueryFood);
    }
  }, [myQueryFood]);

  // useEffect(() => {
  //   axios(`${import.meta.env.VITE_API_URL}/manage-food/${user?.email}`, {
  //     withCredentials: true,
  //   })
  //     .then((res) => setMyFood(res.data))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/remove-food/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = myQueryFood?.filter((food) => food._id !== id);
              setMyFoodData(remaining);
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex min-h-[calc(100vh-80px)] justify-center items-center">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );
  return (
    <section className="container px-6 lg:px-12 mx-auto pt-12">
      <Helmet>
        <title>Pure Harvest | Manage Foods</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl font-medium  ">Added Food</h2>

        <span className="px-3 py-1 text-xs  bg-[#00BBE4] rounded-full ">
          {myFoodData?.length} Foods
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="font-bold text-[18px] bg-[#00BBE4]">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4  font-normal text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Food Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 font-normal text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 font-normal text-left rtl:text-right "
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Expired Date</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-normal text-left rtl:text-right "
                    >
                      <span>Pickup Location</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-normal text-left rtl:text-right "
                    >
                      <span>Quantity</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-normal text-left rtl:text-right "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 ">
                  {myFoodData?.map((request) => (
                    <tr key={request._id}>
                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.food_name}
                      </td>
                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.donator_email}
                      </td>

                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {new Date(request?.expired_date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm  whitespace-nowrap">
                        {request?.pickup_location}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {request?.food_quantity}
                      </td>

                      <td className="px-4 py-4  whitespace-nowrap">
                        <div className="flex items-center gap-x-4">
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="hover:text-gray-500 transition-colors duration-200   text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <Link
                            to={`/update-food/${request?._id}`}
                            className="text-gray-500 transition-colors duration-200  hover:text-[#6ef74b] focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration></ScrollRestoration>
    </section>
  );
};

export default ManageFoods;
