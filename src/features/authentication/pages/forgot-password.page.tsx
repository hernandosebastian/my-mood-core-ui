import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "../schemas";
import { ForgotPasswordForm } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { forgotPasswordToastMessages } from "../messages";
import { AxiosError } from "axios";
import { StoredCookies, getCookie } from "@/services/cookies";

export function ForgotPasswordPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.forgotPassword.title,
    description: authenticationSeoConfig.forgotPassword.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();
  const username = getCookie(StoredCookies.USERNAME) || "";
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
  const isLogged = username && accessToken;

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof forgotPasswordSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await forgotPasswordMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            forgotPasswordToastMessages.success.title,
            forgotPasswordToastMessages.success.description
          );
          navigate("/confirmar-contraseña", {
            state: { username: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage =
            error.message || forgotPasswordToastMessages.error.description;

          showErrorToast(forgotPasswordToastMessages.error.title, errorMessage);
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ForgotPasswordForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
  );
}
