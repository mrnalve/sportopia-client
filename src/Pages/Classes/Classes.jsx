import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: classes = [],
    loading: isLoading,
    refetch,
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

  // handle select button
  const handleSelect = (classItem, user) => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Login Now?",
        text: "You have to login first!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
        return;
      });
      return;
    }
    const selectedClassInfo = {
      itemId: classItem?._id,
      image: classItem?.image,
      className: classItem?.className,
      sportsCategory: classItem?.sportsCategory,
      availableSeats: classItem?.availableSeats,
      price: classItem?.price,
      userEmail: user?.email,
    };
    axiosSecure.post("/selectClass", selectedClassInfo).then((data) => {
      console.log("after selecting new classes", data.data);
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Class added Successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
                <span className="font-semibold">Price:</span>${classItem?.price}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleSelect(classItem, user)}
                disabled={
                  classItem?.availableSeats == 0 ||
                  loggedUser?.role === "admin" ||
                  loggedUser?.role === "instructor"
                }
                className={`${
                  loggedUser.role === "admin" ||
                  loggedUser.role === "instructor"
                    ? "bg-gray-500 text-gray-400"
                    : classItem?.availableSeats == 0
                    ? "bg-red-600 text-white"
                    : "bg-[#45A29E] hover:bg-[#00756f] text-white cursor-pointer"
                } border-none px-4 py-2 rounded-lg mr-2 font-medium`}
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
