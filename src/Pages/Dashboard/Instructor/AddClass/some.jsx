import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Authentication/AuthProvider";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission and create the class in the database
    // You can make an API request here to store the class data
    console.log(data);
  };

  return (
    <div className="w-3/5 mx-auto bg-gray-800 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Add a Class</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10">
        <div className="mb-4 w-1/2">
          <label
            htmlFor="className"
            className="block text-white text-sm font-medium mb-2"
          >
            Class Name
          </label>
          <input
            id="className"
            {...register("className", { required: "Class name is required" })}
            type="text"
            className={`form-input w-full ${
              errors.className ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">
              {errors.className.message}
            </p>
          )}
        </div>
        <div className="mb-4 w-1/2">
          <label
            htmlFor="instructorName"
            className="block text-white text-sm font-medium mb-2"
          >
            Instructor Name
          </label>
          <input
            id="instructorName"
            value={user?.displayName}
            type="text"
            className="form-input w-full border-gray-500 bg-gray-300 cursor-not-allowed"
            readOnly
          />
        </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="instructorEmail"
            className="block text-white text-sm font-medium mb-2"
          >
            Instructor Email
          </label>
          <input
            id="instructorEmail"
            value={user?.email}
            type="text"
            className="form-input border-gray-500 bg-gray-300 cursor-not-allowed"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="availableSeats"
            className="block text-white text-sm font-medium mb-2"
          >
            Available Seats
          </label>
          <input
            id="availableSeats"
            {...register("availableSeats", {
              required: "Available seats is required",
            })}
            type="number"
            className={`form-input ${
              errors.availableSeats ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.availableSeats && (
            <p
              className="text-red-500 text-sm
            mt-1"
            >
              {errors.availableSeats.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-white text-sm font-medium mb-2"
          >
            Price
          </label>
          <input
            id="price"
            {...register("price", { required: "Price is required" })}
            type="number"
            className={`form-input ${
              errors.price ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="classImage"
            className="block text-white text-sm font-medium mb-2"
          >
            Class Image
          </label>
          <input
            id="classImage"
            {...register("classImage", { required: "Class Image is required" })}
            type="file"
            className={`form-input ${
              errors.classImage ? "border-red-500" : "border-gray-500"
            }`}
          />
          {errors.classImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classImage.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddClass;
