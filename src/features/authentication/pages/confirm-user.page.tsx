import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmUserSchema } from "../schemas";
import { ConfirmUserForm } from "../components";

export function ConfirmUserPage(): JSX.Element {
  const form = useForm<z.infer<typeof confirmUserSchema>>({
    resolver: zodResolver(confirmUserSchema),
    defaultValues: {
      username: "",
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof confirmUserSchema>): void {
    console.log("User confirmed with:", values);
  }

  return <ConfirmUserForm form={form} onSubmit={onSubmit} />;
}

