import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmUserSchema } from "../schemas";
import { ConfirmUserForm } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConfirmUser } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { confirmUserToastMessages } from "../messages";
import { AxiosError } from "axios";
import { StoredCookies, getCookie } from "@/services/cookies";

export function ConfirmUserPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.confirmUser.title,
    description: authenticationSeoConfig.confirmUser.description,
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

  const confirmUserMutation = useConfirmUser();

  const form = useForm<z.infer<typeof confirmUserSchema>>({
    resolver: zodResolver(confirmUserSchema),
    defaultValues: {
      username: state?.username ?? "",
      code: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof confirmUserSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await confirmUserMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            confirmUserToastMessages.success.title,
            confirmUserToastMessages.success.description
          );
          navigate("/iniciar-sesion", {
            state: { username: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          showErrorToast(
            confirmUserToastMessages.error.title,
            errorMessage ?? confirmUserToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ConfirmUserForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
  );
}
