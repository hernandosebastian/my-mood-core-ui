import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";
import { ConfirmPasswordForm } from "../components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmPassword } from "../hooks";

export function ConfirmPasswordPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();

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
          navigate("/log-in", {
            state: { user: values.username },
          });
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
