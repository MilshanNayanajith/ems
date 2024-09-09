import { useState } from "react";
import { ApiResponse, FetchGetHook } from "../types/http_methods";
import api from "./Api";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux-store/features/global/loading";
import { setAlert } from "../redux-store/features/custom-alert/customAlert";

const useFetch_GET = (): FetchGetHook => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  // Method for GET data
  const getData = async (url: string): Promise<void> => {
    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const response: ApiResponse = await api.get(url);
      setData(response?.data);
      setError(null); // Clear previous errors
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 404) {
          // Handle 404 error
          dispatch(
            setAlert({ message: "Resource not found", type: "error" })
          );
          setError(new Error("Resource not found"));
        } else if (error.response.status >= 500) {
          // Handle 5xx errors
          dispatch(
            setAlert({ message: "Server error, please try again later", type: "error" })
          );
          setError(new Error("Server error, please try again later"));
        } else {
          // Handle other HTTP errors
          dispatch(
            setAlert({ message: "An unexpected error occurred", type: "error" })
          );
          setError(new Error("An unexpected error occurred"));
        }
      } else {
        // Network or other errors
        setError(new Error("Network error, please check your connection"));
      }
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return { isLoading, error, data, getData };
};

export default useFetch_GET;
