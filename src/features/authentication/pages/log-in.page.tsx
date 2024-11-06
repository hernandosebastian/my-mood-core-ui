import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInSchema } from "../schemas";
import { LogInForm } from "../components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMe, useLogIn } from "../hooks";
import { useSEO } from "@/hooks";

export function LogInPage(): JSX.Element {
  useSEO({
    title: "My Mood - Log In",
    description:
      "Log in to your My Mood account to track your mood and well-being.",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();

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
          navigate("/");
          getMeQuery.refetch();
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <LogInForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}
