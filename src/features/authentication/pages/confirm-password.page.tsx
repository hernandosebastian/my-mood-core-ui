import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";
import { ConfirmPasswordForm } from "../components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmPassword } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { confirmPasswordToastMessages } from "../messages";
import { AxiosError } from "axios";

export function ConfirmPasswordPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.confirmPassword.title,
    description: authenticationSeoConfig.confirmPassword.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showSuccessToast, showErrorToast } = useToast();

  const confirmPasswordMutation = useConfirmPassword();

  const form = useForm<z.infer<typeof confirmPasswordSchema>>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      username: state?.username ?? "",
      newPassword: "",
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
          navigate("/log-in", {
            state: { user: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          showErrorToast(
            confirmPasswordToastMessages.error.title,
            errorMessage ?? confirmPasswordToastMessages.error.description
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
