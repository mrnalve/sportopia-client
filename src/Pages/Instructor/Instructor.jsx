import React, { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

const Instructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: instructors = [],
    refetch,
    loading: isLoading,
    error,
  } = useQuery({
    queryKey: ["instructor"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/instructor`);
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

  return isLoading || loading ? (
    <div className="relative h-[80vh] top-1/2 left-1/2">
      <Circles
      height="80"
      width="80"
      color="#66FCF1"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    </div>
  ) : (
    <div className="bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)] px-7 py-12">
      <h2 className="text-3xl font-semibold text-white mb-6 text-left">
        <span className="text-[#45A29E]">All</span> Instructors
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {instructors.map((instructor) => (
          <div className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <img
                src={instructor?.image}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              {instructor?.name}
            </h2>
            <div className="mt-4">
              <p className="text-gray-300">
                <span className="font-semibold">Instructor Email:</span>{" "}
                {instructor?.email}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span>{" "}
                {instructor?.email}
              </p>
            </div>
            <div className="mt-6">
              <button className="btn bg-[#45A29E] hover:bg-[#00756f] border-none text-white px-4 py-2 rounded-lg mr-2">
                See Classes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
