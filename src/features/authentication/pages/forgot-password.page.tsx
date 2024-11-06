import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import forgotPasswordSchema from "../schemas/forgot-password.schema";
import { ForgotPasswordForm } from "../components/forgot-password-form";

export function ForgotPasswordPage(): JSX.Element {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>): void {
    console.log("Password reset requested for:", values);
  }

  return <ForgotPasswordForm form={form} onSubmit={onSubmit} />;
}

