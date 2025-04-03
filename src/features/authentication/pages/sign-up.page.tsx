import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "../schemas";
import { SignUpForm } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { signUpToastMessages } from "../messages";
import { StoredCookies, getCookie } from "@/services/cookies";
import { ISignUpDto } from "../dto";

export function SignUpPage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.signUp.title,
    description: authenticationSeoConfig.signUp.description,
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

  async function onSubmit(
    values: z.infer<typeof signUpSchema>,
    captchaToken: string
  ): Promise<void> {
    setIsLoading(true);

    const signUpDto: ISignUpDto = {
      ...values,
      recaptchaToken: captchaToken,
    };

    try {
      await signUpMutation.mutateAsync(signUpDto, {
        onSuccess: () => {
          showSuccessToast(
            signUpToastMessages.success.title,
            signUpToastMessages.success.description
          );
          navigate("/confirmar-usuario", {
            state: { username: values.username },
          });
        },
        onError: (error: Error) => {
          const errorMessage =
            error.message || signUpToastMessages.error.description;
          showErrorToast(signUpToastMessages.error.title, errorMessage);
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <SignUpForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}
