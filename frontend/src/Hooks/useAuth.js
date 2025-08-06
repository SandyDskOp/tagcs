// ./Hooks/useAuth.js
import { useEffect, useState } from "react";
import useClient from "./useClient";
import { useDispatch } from "react-redux";
import {LOGIN} from "../Redux/Slices/AuthSlice"

const useAuth = () => {
  const [client,authClient] = useClient();
  const [auth, setAuth] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await authClient.get("/user/profile");
        if (result?.status) {
          setAuth(result.user);
          dispatch(LOGIN(result.user))
        }
      } catch (err) {
        console.error("Auth fetch error:", err);
      } finally {
        setIsPending(false); 
      }
    };

    getUserData();
  }, []);

  return { isPending, auth };
};

export default useAuth;
