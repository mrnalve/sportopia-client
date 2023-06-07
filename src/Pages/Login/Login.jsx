import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import google from "../../../public/google.png";
import { AuthContext } from "../../Authentication/AuthProvider";
import { Toaster, toast } from "react-hot-toast";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  // handle show and hide password
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // handle login or submit data
  const onSubmit = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((result) => {
        console.log(result?.user);
        toast.success("Login successfully!");
      })
      .catch((error) => console.log(error?.message));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)] py-20">
      <div className="w-1/4 px-6 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold geologica text-center">Login</h2>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
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
          <div className="mt-4">
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
                {...register("password", { required: true })}
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
              <p className="text-sm text-red-500">Password is required.</p>
            )}
          </div>
          <button
            type="submit"
            className="block w-full px-4 py-2 mt-6 text-lg font-semibold geologica text-white bg-gradient-to-r from-[#0B0C10] to-[#45A29E] rounded-lg hover:opacity-90 focus:outline-none"
          >
            Sign In
          </button>
          <Toaster />
        </form>
        <div className="flex flex-col items-center justify-between mt-4">
          <SocialLogin></SocialLogin>
          <Link
            to="/registration"
            className="text-sm mt-4 text-blue-500 hover:underline"
          >
            Create an account{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
