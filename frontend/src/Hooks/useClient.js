import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToaster from "./useToaster"
import { useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie"

const useClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();

  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api/v1",
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        const token = Cookies.get("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        toaster.fire("Request Error: " + error.message);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        const result = response.data;
        if (!result.status) {
          toaster.fire({success:false,message:response.message});
        }
        return result;
      },
      (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;

        if (status === 401) {
          toaster.fire("Session expired. Logging out...");
          dispatch(LOGOUT());
          navigate("/");
        } else {
          toaster.fire({status:"error",message:error.message});
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [dispatch, navigate, toaster]);

  return client;
};

export default useClient