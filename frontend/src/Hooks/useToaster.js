import { useDispatch } from "react-redux";
import { FIRETOASTER } from "../Redux/Slices/ToasterSlice";

const useToaster = () => {
  const dispatch = useDispatch();

  const fireToast = (data) => {
    dispatch(FIRETOASTER(data));
  };

  const toaster = {
    fire: fireToast,
  };
  return toaster;
};

export default useToaster;
