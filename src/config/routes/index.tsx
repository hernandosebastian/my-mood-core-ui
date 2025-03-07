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
    <Route path="/iniciar-sesion" element={<LogInPage />} />
    <Route path="/registrarse" element={<SignUpPage />} />
    <Route path="/olvidar-contraseña" element={<ForgotPasswordPage />} />
    <Route
      path="/reenviar-codigo-confirmacion"
      element={<ResendConfirmationCodePage />}
    />
    <Route path="/confirmar-contraseña" element={<ConfirmPasswordPage />} />
    <Route path="/confirmar-usuario" element={<ConfirmUserPage />} />
  </>
);

export const RoutesList = (
  <>
    {authRoutes}
    <Route path="/" element={<Homepage />} />
    <Route
      path="/registro"
      element={<AuthenticationGuard Component={TrackPage} />}
    />
    <Route
      path="/estadisticas"
      element={<AuthenticationGuard Component={StatsPage} />}
    />
    <Route
      path="/editar-perfil"
      element={<AuthenticationGuard Component={EditProfilePage} />}
    />
    <Route path="*" element={<NotFoundPage />} />
  </>
);
