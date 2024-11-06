import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";

interface IConfirmPasswordFormProps {
  form: UseFormReturn<
    {
      username: string;
      newPassword: string;
      code: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof confirmPasswordSchema>) => void;
}

export function ConfirmPasswordForm({
  form,
  onSubmit,
}: Readonly<IConfirmPasswordFormProps>): JSX.Element {
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
        <label htmlFor="newPassword" aria-label="New Password">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          {...form.register("newPassword")}
          placeholder="Enter new password"
          className="border p-2"
        />
        {form.formState.errors.newPassword && (
          <p className="text-red-500">
            {form.formState.errors.newPassword?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="code" aria-label="Code">
          Code
        </label>
        <input
          id="code"
          {...form.register("code")}
          placeholder="Enter 6-digit code"
          className="border p-2"
        />
        {form.formState.errors.code && (
          <p className="text-red-500">{form.formState.errors.code?.message}</p>
        )}
      </div>

      <button type="submit">Confirm Password</button>
    </form>
  );
}

