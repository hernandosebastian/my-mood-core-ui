import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignInForm } from "../components/log-in-form";
import signInSchema from "../schemas/log-in-schema";

export function SignInPage(): JSX.Element {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>): void {
    console.log("User signed in with:", values);
  }

  return <SignInForm form={form} onSubmit={onSubmit} />;
}

