import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "../schemas";
import { ForgotPasswordForm } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../hooks";

export function ForgotPasswordPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
          navigate("/confirm-password", {
            state: { user: values.username },
          });
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
