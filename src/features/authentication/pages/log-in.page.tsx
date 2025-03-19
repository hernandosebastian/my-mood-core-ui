import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInSchema } from "../schemas";
import { LogInForm } from "../components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMe, useLogIn } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { logInToastMessages } from "../messages";
import { AxiosError } from "axios";
import { StoredCookies, getCookie } from "@/services/cookies";

export function LogInPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.logIn.title,
    description: authenticationSeoConfig.logIn.description,
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

  const logInMutation = useLogIn();
  const getMeQuery = useGetMe();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      username: state?.username ?? "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof logInSchema>): Promise<void> {
    setIsLoading(true);

    try {
      await logInMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            logInToastMessages.success.title,
            logInToastMessages.success.description
          );
          navigate("/");
          getMeQuery.refetch();
        },
        onError: (error: AxiosError) => {
          const userRegisteredButNotConfirmed = error.response?.status === 403;
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          if (userRegisteredButNotConfirmed) {
            navigate("/confirmar-usuario", {
              state: { username: values.username },
            });
          }

          showErrorToast(
            logInToastMessages.error.title,
            errorMessage ?? logInToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <LogInForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}
