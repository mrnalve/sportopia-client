import React, { useContext } from "react";
import google from "../../../public/google.png";
import { AuthContext } from "../../Authentication/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // handle google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result?.user;
        const userInfo = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
        };
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
            }
          });
      })
      .catch((error) => console.log(error?.message));
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center py-3 px-3 w-full rounded-full bg-gray-100 hover:bg-gray-300 focus:outline-none"
    >
      <img className="w-6 h-6" src={google} alt="" />
      <span className="geologica font-normal pl-3">Google</span>
    </button>
  );
};

export default SocialLogin;
