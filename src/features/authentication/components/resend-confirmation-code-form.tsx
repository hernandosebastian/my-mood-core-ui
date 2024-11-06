import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { resendConfirmationCodeSchema } from "../schemas";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  const handleRedirectToSignIn = (): void => {
    navigate("/sign-in");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Resend Confirmation Code
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username to resend the confirmation code.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the username to which you want to resend the
                    confirmation code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Resend Confirmation Code
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
            onClick={handleRedirectToSignIn}
          >
            Already have an account?{" "}
            <span className="underline underline-offset-4">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

