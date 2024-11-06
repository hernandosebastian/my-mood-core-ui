import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInSchema } from "../schemas";
import { LogInForm } from "../components";

export function LogInPage(): JSX.Element {
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof logInSchema>): void {
    console.log("User signed in with:", values);
  }

  return <LogInForm form={form} onSubmit={onSubmit} />;
}

