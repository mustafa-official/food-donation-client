// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import ReactLoading from "react-loading";
import axios from "axios";

const FoodRequest = () => {
  const { user } = useAuth();
  // const [myRequset, setMyRequset] = useState([]);

  const { isLoading, data: myRequset } = useQuery({
    queryKey: ["foodRequest", user],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/food-request/${user?.email}`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  // useEffect(() => {
  //   axios(`${import.meta.env.VITE_API_URL}/food-request/${user?.email}`, {withCredentials: true})
  //     .then((res) => setMyRequset(res.data))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [user]);
  //   console.log(myRequset);

  if (isLoading)
    return (
      <div className="flex">
        <ReactLoading type="spin" color="#ffff" height={30} width={30} />
      </div>
    );

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-xl font-medium  ">Food Requests</h2>

        <span className="px-3 py-1 text-xs  bg-[#00BBE4] rounded-full ">
          {myRequset?.length} Requests
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
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
                        <span>Donator Email</span>
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
                      Request Date
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 ">
                  {myRequset.map((request) => (
                    <tr key={request._id}>
                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.food_name}
                      </td>
                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.donator_email}
                      </td>

                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.expired_date}
                      </td>

                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.pickup_location}
                      </td>
                      <td className="px-4 py-4 text-sm   whitespace-nowrap">
                        {request?.food_quantity}
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {new Date(request?.request_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodRequest;
