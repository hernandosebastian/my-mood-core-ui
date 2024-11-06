import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInSchema } from "../schemas";
import { LogInForm } from "../components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMe, useLogIn } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { logInToastMessages } from "../messages";

export function LogInPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.logIn.title,
    description: authenticationSeoConfig.logIn.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showSuccessToast, showErrorToast } = useToast();

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
        onError: () => {
          showErrorToast(
            logInToastMessages.error.title,
            logInToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <LogInForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}
