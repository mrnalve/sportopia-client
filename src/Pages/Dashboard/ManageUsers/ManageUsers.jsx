import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaChalkboardTeacher, FaShieldAlt, FaTrashAlt } from "react-icons/fa";

const ManageUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/getUsers");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  console.log(users);
  return (
    <div className="w-full px-4">
      <h3 className="text-3xl font-semibold my-2 text-center text-white">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-11/12 m-auto rounded-xl">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
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
              <tr key={user._id} className={"bg-gray-100 pl-4"}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      // onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-sm hover:bg-[#00f4e4] bg-[#66FCF1] text-white"
                    >
                      <FaShieldAlt />
                    </button>
                  )}
                </td>
                <td className="p-4">
                  {user.role === "admin" ? (
                    "instructor"
                  ) : (
                    <button
                      // onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-sm hover:bg-[#00f4e4] bg-[#66FCF1] text-white"
                    >
                      <FaChalkboardTeacher />
                    </button>
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
