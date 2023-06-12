import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaChalkboardTeacher, FaShieldAlt, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Authentication/AuthProvider";
import { Circles } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Slide } from "react-awesome-reveal";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  // load user data
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["getUsers", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getUsers?email=${user?.email}`);
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

  // handle make admin
  const handleMakeAdmin = (user) => {
    fetch(`https://sportopia-server-side.vercel.app/users/admin/${user?._id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is an Admin Now!`);
          queryClient.invalidateQueries("manageClasses");
        }
      });
  };
  // handle make Instructor
  const handleMakeInstructor = (user) => {
    fetch(`https://sportopia-server-side.vercel.app/users/instructor/${user?._id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${user?.name} is an Instructor Now!`);
          queryClient.invalidateQueries("manageClasses");
        }
      });
  };

  return (
    <div className="w-full px-4">
      <Slide>
        <h2 className="text-3xl font-semibold text-white mb-6 text-left my-4 ml-10">
          <span className="text-[#45A29E]">All</span> Users
        </h2>
      </Slide>
      <div className="overflow-x-auto">
        <table className="table-auto w-11/12 m-auto rounded-xl">
          <thead>
            <tr className="bg-gray-800 text-white text-center">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Admin Role</th>
              <th className="p-4">Instructor Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={"bg-gray-100 pl-4 text-center"}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      disabled={user.role === "instructor"}
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-sm hover:bg-[#00f4e4] bg-[#66FCF1] text-white"
                    >
                      <FaShieldAlt />
                    </button>
                  )}
                </td>
                <td className="p-4">
                  {user.role === "instructor" ? (
                    "instructor"
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        disabled={user.role === "admin"}
                        className="btn btn-ghost btn-sm hover:bg-[#00f4e4] bg-[#66FCF1] text-white"
                      >
                        <FaChalkboardTeacher />
                      </button>
                    </>
                  )}
                </td>
                <td className="p-4">
                  <button
                    //   onClick={() => handleDelete(user)}
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

export default ManageUsers;
