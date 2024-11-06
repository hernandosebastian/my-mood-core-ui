import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import resendConfirmationCodeSchema from "../schemas/resend-confirmation-code.schemas";

interface IResendConfirmationCodeFormProps {
  form: UseFormReturn<
    {
      username: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof resendConfirmationCodeSchema>) => void;
}

export function ResendConfirmationCodeForm({
  form,
  onSubmit,
}: Readonly<IResendConfirmationCodeFormProps>): JSX.Element {
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

      <button type="submit">Resend Confirmation Code</button>
    </form>
  );
}

