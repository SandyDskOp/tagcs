// ./Hooks/useAuth.js
import { useEffect, useState } from "react";
import useClient from "./useClient";

const useAuth = () => {
  const authClient = useClient();
  const [auth, setAuth] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await authClient.get("/user/profile");
        if (result?.status) {
          setAuth(result.user);
        }
      } catch (err) {
        console.error("Auth fetch error:", err);
      } finally {
        setIsPending(false); // Ensure this only happens after request completes
      }
    };

    getUserData();
  }, []);

  return { isPending, auth };
};

export default useAuth;
