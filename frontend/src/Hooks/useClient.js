import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToaster from "./useToaster";
import { useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { LOGOUT } from "../Redux/Slices/AuthSlice";

const useClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();

  const client = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api/v1",
    });

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        toaster.fire({ status: "err", message: message });
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        const result = response.data;
        if (!result.status) {
          toaster.fire({ success: false, message: response.message });
        }
        return result;
      },
      (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;

        toaster.fire({ status: "error", message: message });

        return Promise.reject(error);
      }
    );

    return instance;
  }, [dispatch, navigate, toaster]);

  const authClient = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/api/v1",
    });

    instance.interceptors.request.use(
      (config) => {
        const token = Cookies.get("authToken");
        if (!token) {
          dispatch(LOGOUT());
          navigate("/");
          return Promise.reject(new axios.Cancel("Using as guest"));
        }
    
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    

    instance.interceptors.response.use(
      (response) => {
        const result = response.data;
        if (!result.status) {
          toaster.fire({ success: false, message: "Toast Here 2" });
        }
        return result;
      },
      (error) => {
        const status = error?.response?.status || error.status;
        const message = error?.response?.data?.message || error.message;
        console.log(error);

        if (status === 401) {
          dispatch(LOGOUT());
          navigate("/");
        } else if(status==500){
          toaster.fire({ status: "error", message: message });
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [dispatch, navigate, toaster]);

  return [client, authClient];
};

export default useClient;
