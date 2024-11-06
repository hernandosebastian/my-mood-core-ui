import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import forgotPasswordSchema from "../schemas/forgot-password.schema";

interface IForgotPasswordFormProps {
  form: UseFormReturn<
    {
      username: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof forgotPasswordSchema>) => void;
}

export function ForgotPasswordForm({
  form,
  onSubmit,
}: Readonly<IForgotPasswordFormProps>): JSX.Element {
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

      <button type="submit">Reset Password</button>
    </form>
  );
}

