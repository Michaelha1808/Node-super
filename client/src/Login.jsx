/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const new_user = params.get("new_user");
    const verify = params.get("verify");

    // ở đây test ui cho trường hợp login
    // trường hợp register tạo ra popup rerify email
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    navigate("/");
  }, [params, navigate]);
  return <div>Login</div>;
}
