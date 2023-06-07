import React, { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  // registration
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   get user name , photo or other info
  const updateUser = (userName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoURL
    });
  };
//   user state

  const authInfo = {
    createUser,
    updateUser,
    user: "alve",
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
