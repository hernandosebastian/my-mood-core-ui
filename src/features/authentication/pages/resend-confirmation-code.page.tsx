import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resendConfirmationCodeSchema } from "../schemas";
import { ResendConfirmationCodeForm } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResendConfirmationCode } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { authenticationSeoConfig } from "@/seo/config";
import { useToast } from "@/hooks";
import { resendConfirmationCodeToastMessages } from "../messages";

export function ResendConfirmationCodePage(): JSX.Element {
  useSEO({
    title: authenticationSeoConfig.resendConfirmationCode.title,
    description: authenticationSeoConfig.resendConfirmationCode.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();

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
          navigate("/confirm-user", {
            state: { user: values.username },
          });
        },
        onError: () => {
          showErrorToast(
            resendConfirmationCodeToastMessages.error.title,
            resendConfirmationCodeToastMessages.error.description
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
