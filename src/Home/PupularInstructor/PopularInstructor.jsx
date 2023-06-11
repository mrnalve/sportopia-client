import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Slide } from "react-awesome-reveal";

const PopularInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: popularInstructor = [], loading: isLoading } = useQuery({
    queryKey: ["popularInstructor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/popularInstructor`);
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
    <Slide direction="right">
      <div className="bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)] px-7 py-12">
        <h2 className="text-3xl font-semibold text-white mb-6 text-left">
          <span className="text-[#45A29E]">Popular</span> Instructor
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {popularInstructor.map((instructor) => (
            <div key={popularInstructor._id} className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
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
                  <span className="font-semibold">Instructor:</span>{" "}
                  {instructor?.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default PopularInstructor;
