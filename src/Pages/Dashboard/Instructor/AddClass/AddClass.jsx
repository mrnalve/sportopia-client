import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Authentication/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddClassForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const imageHostingToken = import.meta.env.VITE_Image_Upload_Token;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

  const onSubmit = (data) => {
    const {
      className,
      instructorName,
      instructorEmail,
      sportsCategory,
      availableSeats,
      price,
    } = data;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imageURL = imgResponse.data.display_url;
          // get class information
          const newClass = {
            className,
            instructorName,
            instructorEmail,
            sportsCategory,
            availableSeats: parseInt(availableSeats),
            price: parseInt(price),
            image: imageURL,
            enrolledStudents: parseInt(0),
            status: "pending",
          };
          // post method to send data in database
          fetch("http://localhost:5000/addClass", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify(newClass),
          }).then((data) => {
            console.log(data);
            if (data) {
              console.log("success");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
            }
          });
        }
      });
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
                className="text-sm text-gray-800 font-medium"
                htmlFor="sportsCategory"
              >
                Sports Category
              </label>
              <select
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.price ? "border-red-500" : ""
                }`}
                id="sportsCategory"
                {...register("sportsCategory", { required: true })}
              >
                <option value="">Select</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
                <option value="cricket">Cricket</option>
                <option value="football">Football</option>
                <option value="volleyball">Volleyball</option>
                <option value="badminton">Badminton</option>
                <option value="other">Other</option>
              </select>
              {errors.sportsCategory && (
                <span className="error">Sports Category is required</span>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="text-sm roboto font-medium text-gray-700"
              >
                Class Image
              </label>
              <input
                type="file"
                id="image"
                {...register("image", { required: true })}
                className=" border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring"
              />

              {errors.image && (
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
