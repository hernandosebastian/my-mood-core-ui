import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "../schemas";
import { SignUpForm } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { signUpToastMessages } from "../messages";
import { AxiosError } from "axios";

export function SignUpPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.signUp.title,
    description: authenticationSeoConfig.signUp.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();

  const signUpMutation = useSignUp();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>): Promise<void> {
    setIsLoading(true);

    try {
      await signUpMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            signUpToastMessages.success.title,
            signUpToastMessages.success.description
          );
          navigate("/confirm-user", {
            state: { username: values.username },
          });
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;

          showErrorToast(
            signUpToastMessages.error.title,
            errorMessage ?? signUpToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <SignUpForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}
