import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logInSchema } from "../schemas";
import { SignInForm } from "../components";

export function SignInPage(): JSX.Element {
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

  return <SignInForm form={form} onSubmit={onSubmit} />;
}

