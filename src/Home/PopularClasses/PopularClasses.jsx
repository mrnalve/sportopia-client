import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PopularClasses = () => {
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

  return (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
