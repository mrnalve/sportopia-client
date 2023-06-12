import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   get user name , photo or other info
  const updateUser = (userName, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoURL,
    });
  };
  //   login or sign in
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   log out
  const logout = () => {
    return signOut(auth);
  };
  //   user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Get the user and set the token
      if (currentUser) {
        axios.post('https://sportopia-server-side.vercel.app/jwt', {email: currentUser.email})
        .then(data=>{
          localStorage.setItem('access-token', data?.data?.token)
        })
      }
      else{
        localStorage.removeItem('access-token')
      }
      setLoading(false);
      return () => {
        return unsubscribe();
      };
    });
  }, []);
  const authInfo = {
    createUser,
    updateUser,
    login,
    googleSignIn,
    logout,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
