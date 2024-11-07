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
import { Icons } from "@/components/ui/Icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
  isLoading: boolean;
}

export function ConfirmUserForm({
  form,
  onSubmit,
  isLoading,
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
    navigate("/resend-confirmation-code");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Confirm User
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the email and confirmation code to confirm your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Enter your email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the email to confirm your account.
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
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Enter the 6-digit code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Confirm
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            id="redirect-to-resend-code"
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
