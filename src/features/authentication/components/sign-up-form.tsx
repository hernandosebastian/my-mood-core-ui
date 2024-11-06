import { UseFormReturn } from "react-hook-form";
import signUpSchema from "../schemas/sign-up.schema";
import { z } from "zod";

interface ISignUpFormProps {
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof signUpSchema>) => void;
}

export function SignUpForm({
  form,
  onSubmit,
}: Readonly<ISignUpFormProps>): JSX.Element {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username" aria-label="Username">
          Username
        </label>
        <input
          id="username"
          {...form.register("username")}
          placeholder="Enter your username"
          className="border p-2"
        />
        {form.formState.errors.username && (
          <p className="text-red-500">
            {form.formState.errors.username?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" aria-label="Password">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...form.register("password")}
          placeholder="Enter your password"
          className="border p-2"
        />
        {form.formState.errors.password && (
          <p className="text-red-500">
            {form.formState.errors.password?.message}
          </p>
        )}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

