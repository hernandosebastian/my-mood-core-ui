import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import signUpSchema from "../schemas/sign-up.schema";
import { SignUpForm } from "../components/sign-up-form";

export function SignUpPage(): JSX.Element {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>): void {
    console.log(values);
  }

  return <SignUpForm form={form} onSubmit={onSubmit} />;
}

