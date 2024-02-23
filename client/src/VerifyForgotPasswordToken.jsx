import { useEffect, useState } from "react";
import useQueryParams from "./useQueryParams";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyForgotPasswordToken() {
  const { token } = useQueryParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    if (token) {
      axios
        .post(
          `/users/verify-forgot-password`,
          { forgot_password_token: token },
          {
            baseURL: import.meta.env.VITE_API_URL,
            signal: controller.signal,
          }
        )
        .then(() => {
          navigate("/reset-password", {
            state: { forgot_password_token: token },
          });
        })
        .catch((err) => {
          setMessage(err.message.data.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [token, navigate]);
  return <div>{message}</div>;
}
