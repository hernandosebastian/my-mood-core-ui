import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resendConfirmationCodeSchema } from "../schemas";
import { ResendConfirmationCodeForm } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResendConfirmationCode } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { resendConfirmationCodeToastMessages } from "../messages";
import { AxiosError } from "axios";
import { StoredCookies, getCookie } from "@/services/cookies";

export function ResendConfirmationCodePage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.resendConfirmationCode.title,
    description: authenticationSeoConfig.resendConfirmationCode.description,
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

  const resendConfirmationCodeMutation = useResendConfirmationCode();

  const form = useForm<z.infer<typeof resendConfirmationCodeSchema>>({
    resolver: zodResolver(resendConfirmationCodeSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof resendConfirmationCodeSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await resendConfirmationCodeMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            resendConfirmationCodeToastMessages.success.title,
            resendConfirmationCodeToastMessages.success.description
          );
          navigate("/confirmar-usuario", {
            state: { username: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage =
            error.message ||
            resendConfirmationCodeToastMessages.error.description;

          showErrorToast(
            resendConfirmationCodeToastMessages.error.title,
            errorMessage
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ResendConfirmationCodeForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}
