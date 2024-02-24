import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";
import VerifyForgotPasswordToken from "./VerifyForgotPasswordToken";
import ResetPassword from "./ResetPassword";
import Chat from "./chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login/oauth",
    element: <Login />,
  },
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "forgot-password",
    element: <VerifyForgotPasswordToken />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

export default router;
