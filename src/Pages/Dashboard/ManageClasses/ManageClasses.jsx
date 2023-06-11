import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const ManageClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    data: manageClasses = [],
    refetch,
    loading: isLoading,
    error,
  } = useQuery({
    queryKey: ["manageClasses"],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/manageClasses?email=${user?.email}`
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
  if (error) return "An error has occurred: " + error.message;

  //   handle approve
  const handleApprove = (classItem) => {
    fetch(`http://localhost:5000/approve/${classItem?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Approved Successfully!");
        console.log(data);
        refetch();
      });
  };
  //   handle Deny
  const handleDeny = (classItem) => {
    fetch(`http://localhost:5000/deny/${classItem?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Denied Successfully!");
        console.log(data);
        refetch();
      });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-white mb-6 text-left">
        <span className="text-[#45A29E]">Manage</span> Classes
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {manageClasses.map((classes) => (
          <div className="bg-gradient-to-r from-[#0B0C10] to-[#616161] rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <img
                src={classes?.image}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              {classes?.className}
            </h2>
            <div className="mt-4">
              <p className="text-gray-300">
                <span className="font-semibold">Instructor:</span>{" "}
                {classes?.instructorName}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span> {classes?.email}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Available Seats:</span>{" "}
                {classes?.availableSeats}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Price:</span> {classes?.price}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Status:</span> {classes?.status}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleApprove(classes)}
                disabled={
                  classes.status === "approve" || classes.status === "denied"
                }
                className={` ${
                  classes.status === "approve" || classes.status === "denied"
                    ? "bg-gray-500 text-gray-400"
                    : "bg-[#45A29E] hover:bg-[#00756f] text-white"
                } border-none  px-4 py-2 rounded-lg mr-2`}
              >
                Approve
              </button>
              <Toaster />
              <button
                onClick={() => handleDeny(classes)}
                disabled={
                  classes.status === "approve" || classes.status === "denied"
                }
                className={` ${
                  classes.status === "approve" || classes.status === "denied"
                    ? "bg-gray-500 text-gray-400"
                    : "bg-[#EF476F] hover:bg-[#b01237] text-white"
                } border-none px-4 py-2 rounded-lg mr-2`}
              >
                Deny
              </button>
              <button className="bg-[#4B5563] hover:bg-[#2b3038] text-white px-4 py-2 rounded-lg mt-2">
              <Link  to={`/dashboard/feedbackPage?classes=${btoa(
                        JSON.stringify(classes)
                      )}`}>Send Feedback</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
