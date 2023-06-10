import React, { useContext } from "react";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";

const MySelectedClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: selectedClasses = [],
    refetch,
    loading: isLoading,
  } = useQuery({
    queryKey: ["selectedClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/selectedClasses?email=${user?.email}`
      );
      return response.data;
    },
  });
  if (isLoading)
    return (
      <Circles
        height="80"
        width="80"
        color="#66FCF1"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );

  console.log(selectedClasses);

  return (
    <div className="w-full px-4">
      <h3 className="text-3xl font-semibold my-2 text-center text-white">
        Total Classes: {selectedClasses?.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-11/12 m-auto rounded-xl">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="p-4">ID</th>
              <th className="p-4">Image</th>
              <th className="p-4">Class Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses?.map((item, index) => (
              <tr key={item._id} className={"bg-gray-100 pl-4 text-center"}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item?.image} />
                    </div>
                  </div>
                </td>
                <td className="p-4">{item?.className}</td>
                <td className="p-4">${item?.price}</td>
                <td className="p-4">
                  <button
                    className="btn btn-ghost btn-sm hover:bg-[#26dfd3] bg-gradient-to-r from-[#232630] to-[#45A29E] text-white"
                  >
                    <Link to={'/dashboard/payment'}>Pay</Link>
                  </button>
                </td>
                <td className="p-4">
                  <button className="btn btn-ghost btn-sm bg-[#fc6666] text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;
