import React, { useContext } from "react";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { Circles } from "react-loader-spinner";

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: myClasses = [],
    refetch,
    loading: isLoading,
    error,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/myClasses?email=${user?.email}`);
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
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full px-4">
      <h3 className="text-3xl font-semibold my-2 text-center text-white">
        Total Classes?: {myClasses?.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-11/12 m-auto rounded-xl">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="p-4">ID</th>
              <th className="p-4">Class Name</th>
              <th className="p-4">Enrolled Student</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {myClasses?.map((item, index) => (
              <tr key={item._id} className={"bg-gray-100 pl-4 text-center"}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item?.className}</td>
                <td className="p-4">{item?.enrolledStudents}</td>
                <td className="p-4">
                  <button className={`btn btn-ghost btn-sm  text-white ${item?.status === 'pending' && 'bg-[#fc6666]'} ${item?.status === 'approved' && 'bg-[#24fff0]'}`}>
                    {item?.status}
                  </button>
                </td>
                <td className="p-4">
                  <button
                    className="btn btn-ghost btn-sm hover:bg-red-700 bg-red-500 text-white"
                  >
                    <FaTrashAlt />
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

export default MyClasses;
