import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Authentication/AuthProvider";

const AddClassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const {
      className,
      instructorName,
      instructorEmail,
      classImage,
      availableSeats,
      price,
    } = data;
    // get class information
    const classInfo = {
      className,
      instructorName,
      instructorEmail,
      availableSeats: parseInt(availableSeats),
      price: parseInt(price),
      classImage
    };
    console.log(classInfo);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)]">
      <div className="w-2/3 mx-4 my-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold geologica text-center text-gray-800">
          Add a Class
        </h2>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="className"
                className="text-sm text-gray-800 font-medium"
              >
                Class name
              </label>
              <input
                type="text"
                id="className"
                {...register("className", { required: true })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.className ? "border-red-500" : ""
                }`}
                placeholder="Enter class name"
              />
              {errors.className && (
                <p className="text-sm text-red-500">Class name is required.</p>
              )}
            </div>
            <div>
              <label
                htmlFor="instructorName"
                className="text-sm text-gray-800 font-medium"
              >
                Instructor name
              </label>
              <input
                type="text"
                id="instructorName"
                {...register("instructorName", { required: true })}
                value={user?.displayName}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg bg-gray-100 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="instructorEmail"
                className="text-sm text-gray-800 font-medium"
              >
                Instructor email
              </label>
              <input
                type="text"
                id="instructorEmail"
                {...register("instructorEmail", { required: true })}
                value={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg bg-gray-100 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="availableSeats"
                className="text-sm text-gray-800 font-medium"
              >
                Available seats
              </label>
              <input
                type="number"
                id="availableSeats"
                {...register("availableSeats", { required: true })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.availableSeats ? "border-red-500" : ""
                }`}
                placeholder="Enter available seats"
              />
              {errors.availableSeats && (
                <p className="text-sm text-red-500">
                  Available seats is required.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm text-gray-800 font-medium"
              >
                Price
              </label>
              <input
                type="number"
                id="number"
                {...register("price", { required: true })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.price ? "border-red-500" : ""
                }`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-sm text-red-500">Price is required.</p>
              )}
            </div>
            <div>
              <label
                htmlFor="classImage"
                className="text-sm roboto font-medium text-gray-700"
              >
                Class Image
              </label>
              <input
                type="file"
                id="classImage"
                {...register("classImage", { required: true })}
                className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring"
              />

              {errors.classImage && (
                <p className="text-red-500">Class Image is required.</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="block w-full px-4 py-2 text-lg font-semibold geologica text-white bg-gradient-to-r from-[#0B0C10] to-[#45A29E] rounded-lg hover:opacity-90 focus:outline-none"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;
