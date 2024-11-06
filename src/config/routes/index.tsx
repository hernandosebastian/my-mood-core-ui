import {
  ConfirmPasswordPage,
  ConfirmUserPage,
  ForgotPasswordPage,
  LogInPage,
  ResendConfirmationCodePage,
  SignUpPage,
} from "@/features/authentication/pages";
import { Route } from "react-router-dom";

const authRoutes = (
  <>
    <Route path="/log-in" element={<LogInPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route
      path="/resend-confirmation-code"
      element={<ResendConfirmationCodePage />}
    />
    <Route path="/confirm-password" element={<ConfirmPasswordPage />} />
    <Route path="/confirm-user" element={<ConfirmUserPage />} />
  </>
);

export const RoutesList = (
  <>
    {authRoutes}
    <Route path="*" element={<></>} />
  </>
);
