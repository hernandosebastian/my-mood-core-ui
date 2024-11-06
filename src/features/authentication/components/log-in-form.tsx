import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { logInSchema } from "../schemas";

interface ILogInFormProps {
  form: UseFormReturn<
    {
      username: string;
      password: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof logInSchema>) => void;
}

export function LogInForm({
  form,
  onSubmit,
}: Readonly<ILogInFormProps>): JSX.Element {
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

      <button type="submit">Log In</button>
    </form>
  );
}

