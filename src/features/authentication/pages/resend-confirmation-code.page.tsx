import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resendConfirmationCodeSchema } from "../schemas";
import { ResendConfirmationCodeForm } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResendConfirmationCode } from "../hooks";

export function ResendConfirmationCodePage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
          navigate("/confirm-user", {
            state: { user: values.username },
          });
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
