import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

const Classes = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: classes = [],
    loading: isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
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

  // get logged user
  const { data: loggedUser = [] } = useQuery({
    queryKey: ["singleUser", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/singleUser?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(loggedUser);
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
        <span className="text-[#45A29E]">All</span> Classes
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {classes.map((classItem) => (
          <div className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <img
                src={classItem?.image}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              {classItem?.className}
            </h2>
            <div className="mt-4">
              <p className="text-gray-300">
                <span className="font-semibold">Instructor:</span>{" "}
                {classItem?.instructorName}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Available Seats:</span>{" "}
                {classItem?.availableSeats}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Price:</span> {classItem?.price}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleApprove(classItem)}
                disabled={
                  classItem?.availableSeats <= 0 ||
                  loggedUser?.role === "admin" ||
                  loggedUser?.role === "instructor"
                }
                className={`${
                  loggedUser.role === "admin" ||
                  loggedUser.role === "instructor"
                    ? "bg-gray-500 text-gray-400"
                    : "bg-[#45A29E] hover:bg-[#00756f] text-white cursor-pointer"
                } border-none  px-4 py-2 rounded-lg mr-2 font-medium`}
              >
                Select Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
