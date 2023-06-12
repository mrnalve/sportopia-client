import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
    baseURL: 'https://sportopia-server-side.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    useEffect(() => {
        // Intercept requests
        axiosSecure.interceptors.request.use(req => {
            const token = localStorage.getItem('access-token')
            if (token) {
                req.headers.Authorization = `bearer ${token}`
            }
            return req;
        },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Intercept response
        axiosSecure.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    toast.error(error?.response?.data?.error)
                    // TODO
                    // await logout()
                }
                return Promise.reject(error);
            }
        );
    }, [navigate, logout])
    return [axiosSecure];
};

export default useAxiosSecure;