import { useState } from "react";
import { useDispatch } from "react-redux";
import { ApiResponse, FetchPostHook } from "../types/http_methods";
import api from "./Api";
import { setLoading } from "../redux-store/features/global/loading";
import { setAlert } from "../redux-store/features/custom-alert/customAlert";

const useFetch_POST = (): FetchPostHook => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  // Method for POST request
  const postData = async (url: string, payload: any): Promise<void> => {
    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const response: ApiResponse = await api.post(url, payload);
      setData(response?.data);
      setError(null); // Clear previous errors
      dispatch(setAlert({ message: "Data posted successfully", type: "success" }));
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 404) {
          // Handle 404 error
          dispatch(setAlert({ message: "Resource not found", type: "error" }));
          setError(new Error("Resource not found"));
        } else if (error.response.status >= 500) {
          // Handle 5xx errors
          dispatch(setAlert({ message: "Server error, please try again later", type: "error" }));
          setError(new Error("Server error, please try again later"));
        } else {
          // Handle other HTTP errors
          dispatch(setAlert({ message: "An unexpected error occurred", type: "error" }));
          setError(new Error("An unexpected error occurred"));
        }
      } else {
        // Network or other errors
        dispatch(setAlert({ message: "Network error, please check your connection", type: "error" }));
        setError(new Error("Network error, please check your connection"));
      }
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return { isLoading, error, data, postData };
};

export default useFetch_POST;
