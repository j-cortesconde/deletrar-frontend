import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useErrorHandler(...errors) {
  const navigate = useNavigate();

  const [error1, error2, error3] = errors;

  useEffect(() => {
    const rearrayedErrors = [error1, error2, error3];
    rearrayedErrors.forEach((error) => {
      if (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Hubo un error inesperado.");
        }
        navigate(-1);
      }
    });
  }, [error1, error2, error3, navigate]);
}
