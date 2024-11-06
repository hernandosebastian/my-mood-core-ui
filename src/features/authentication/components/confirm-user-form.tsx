import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { confirmUserSchema } from "../schemas";
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

interface IConfirmUserFormProps {
  form: UseFormReturn<
    {
      username: string;
      code: string;
    },
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof confirmUserSchema>) => void;
}

export function ConfirmUserForm({
  form,
  onSubmit,
}: Readonly<IConfirmUserFormProps>): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  const handleRedirectToResendCode = (): void => {
    navigate("/resend-confirmation-code"); // Redirigir al endpoint de reenvío de código
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Confirm User
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the username and confirmation code to confirm your account.
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
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the username to confirm your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      id="code"
                      placeholder="Enter 6-digit code"
                      {...field}
                      maxLength={6}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the 6-digit code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Confirm
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
            onClick={handleRedirectToResendCode}
          >
            Didn&apos;t receive the code?{" "}
            <span className="underline underline-offset-4">Resend it</span>
          </button>
        </div>
      </div>
    </div>
  );
}

