import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import resendConfirmationCodeSchema from "../schemas/resend-confirmation-code.schemas";
import { ResendConfirmationCodeForm } from "../components/resend-confirmation-code-form";

export function ResendConfirmationCodePage(): JSX.Element {
  const form = useForm<z.infer<typeof resendConfirmationCodeSchema>>({
    resolver: zodResolver(resendConfirmationCodeSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(
    values: z.infer<typeof resendConfirmationCodeSchema>
  ): void {
    console.log("Resending confirmation code for:", values);
  }

  return <ResendConfirmationCodeForm form={form} onSubmit={onSubmit} />;
}

