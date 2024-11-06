import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { confirmUserSchema } from "../schemas";

interface IConfirmUserFormProps {
  form: UseFormReturn<
    {
      username: string;
      code: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof confirmUserSchema>) => void;
}

export function ConfirmUserForm({
  form,
  onSubmit,
}: Readonly<IConfirmUserFormProps>): JSX.Element {
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

      <button type="submit">Confirm</button>
    </form>
  );
}

