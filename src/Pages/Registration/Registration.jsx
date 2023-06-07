import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import google from "../../../public/google.png";
import { AuthContext } from "../../Authentication/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Registration = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //   handle show and hide password
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    // call the create user function for registration
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUser(data.name, data.photoUrl)
          .then(() => {
            const userInfo = { name: data.name, email: data.email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  toast.success("Sign Up successfully!");
                  navigate("/");
                  reset();
                }
              });
          })
          .catch((error) => console.log(error?.message));
      })
      .catch((error) => console.log(error?.message));
  };

  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)] py-20">
      <div className="md:w-2/4 w-4/5 mx-2 md:mx-0 px-6 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold geologica text-center">
          Registration
        </h2>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* name and email */}
          <div className="md:flex w-full space-x-2">
            {/* name field */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="name"
                className="text-sm roboto font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">Name is required.</p>
              )}
            </div>
            {/* email field */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="email"
                className="text-sm roboto font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500">Email is required.</p>
              )}
            </div>
          </div>
          {/* password and confirm password */}
          <div className="md:flex w-full space-x-2 my-4">
            {/* password field */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="password"
                className="text-sm roboto font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                  })}
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  Password must be at least 6 characters long and contain at
                  least one uppercase letter, one lowercase letter, one digit,
                  and one special character.
                </p>
              )}
            </div>
            {/* confirm password field */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="confirmPassword"
                className="text-sm roboto font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password,
                })}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match.</p>
              )}
            </div>
          </div>
          {/* photo url and gender filed */}
          <div className="md:flex w-full space-x-2">
            {/* photo url filed */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="photoUrl"
                className="text-sm roboto font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                {...register("photoUrl")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
                placeholder="Enter your photo URL"
              />
            </div>
            {/* gender filed */}
            <div className="md:w-1/2 my-2 md:my-0">
              <label
                htmlFor="gender"
                className="text-sm roboto font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {/* address field */}
          <div className="mt-4">
            <label
              htmlFor="address"
              className="text-sm roboto font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring"
              rows="4"
              placeholder="Enter your address"
            ></textarea>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-6 text-lg font-semibold geologica text-white bg-gradient-to-r from-[#0B0C10] to-[#45A29E] rounded-lg hover:opacity-90 focus:outline-none"
          >
            Register
          </button>
          <Toaster />
        </form>
        <div className="flex flex-col items-center justify-between mt-4">
          <SocialLogin></SocialLogin>
          <Link
            to="/login"
            className="text-sm mt-4 text-blue-500 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
