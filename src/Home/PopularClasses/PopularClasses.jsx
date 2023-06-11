import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";
import { motion } from "framer-motion";
import { Fade, Slide } from "react-awesome-reveal";

const PopularClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: popularClasses = [], loading: isLoading } = useQuery({
    queryKey: ["popularClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/popularClasses`);
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

  return (
    <Slide direction="left">
        <div className="bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)] px-7 py-24">
      <h2 className="text-3xl font-semibold text-white mb-6 text-left">
        <span className="text-[#45A29E]">Popular</span> Classes
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {popularClasses.map((classItem) => (
          <div key={popularClasses._id} className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
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
                <span className="font-semibold">Enrolled Students:</span>{" "}
                {classItem?.enrolledStudents}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Price:</span>${classItem?.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Slide>
  );
};

export default PopularClasses;
