import { AuthenticationGuard } from "@/features/authentication/guard";
import {
  ConfirmPasswordPage,
  ConfirmUserPage,
  ForgotPasswordPage,
  LogInPage,
  ResendConfirmationCodePage,
  SignUpPage,
} from "@/features/authentication/pages";
import { EditProfilePage } from "@/features/edit-profile/pages";
import { Homepage } from "@/features/homepage/pages";
import { NotFoundPage } from "@/features/not-found/pages";
import { StatsPage } from "@/features/stats/pages";
import { TrackPage } from "@/features/track/pages";
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
    <Route path="/" element={<Homepage />} />
    <Route
      path="/track"
      element={<AuthenticationGuard Component={TrackPage} />}
    />
    <Route
      path="/stats"
      element={<AuthenticationGuard Component={StatsPage} />}
    />
    <Route
      path="/edit-profile"
      element={<AuthenticationGuard Component={EditProfilePage} />}
    />
    <Route path="*" element={<NotFoundPage />} />
  </>
);
