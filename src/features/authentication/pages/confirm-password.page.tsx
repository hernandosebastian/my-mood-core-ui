import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";
import { ConfirmPasswordForm } from "../components";

export function ConfirmPasswordPage(): JSX.Element {
  const form = useForm<z.infer<typeof confirmPasswordSchema>>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      username: "",
      newPassword: "",
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof confirmPasswordSchema>): void {
    console.log("Password confirmed for:", values);
  }

  return <ConfirmPasswordForm form={form} onSubmit={onSubmit} />;
}
