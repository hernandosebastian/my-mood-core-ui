import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";
import { ConfirmPasswordForm } from "../components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmPassword } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { confirmPasswordToastMessages } from "../messages";
import { AxiosError } from "axios";
import { StoredCookies, getCookie } from "@/services/cookies";

export function ConfirmPasswordPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.confirmPassword.title,
    description: authenticationSeoConfig.confirmPassword.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showSuccessToast, showErrorToast } = useToast();
  const username = getCookie(StoredCookies.USERNAME) || "";
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
  const isLogged = username && accessToken;

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const confirmPasswordMutation = useConfirmPassword();

  const form = useForm<z.infer<typeof confirmPasswordSchema>>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      username: state?.username ?? "",
      newPassword: "",
      confirmPassword: "",
      code: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof confirmPasswordSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await confirmPasswordMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            confirmPasswordToastMessages.success.title,
            confirmPasswordToastMessages.success.description
          );
          navigate("/iniciar-sesion", {
            state: { username: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage =
            error.message || confirmPasswordToastMessages.error.description;

          showErrorToast(
            confirmPasswordToastMessages.error.title,
            errorMessage
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ConfirmPasswordForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}
