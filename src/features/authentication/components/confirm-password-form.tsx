import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { confirmPasswordSchema } from "../schemas";
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

interface IConfirmPasswordFormProps {
  form: UseFormReturn<
    {
      username: string;
      newPassword: string;
      confirmPassword: string;
      code: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof confirmPasswordSchema>) => void;
  isLoading: boolean;
}

export function ConfirmPasswordForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<IConfirmPasswordFormProps>): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  const handleRedirectToForgotPassword = (): void => {
    navigate("/forgot-password");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Confirm Password
          </h1>
          <p className="text-sm text-muted-foreground text-text-secondary">
            Enter your email and confirmation code to reset your password.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      data-testid="confirm-password-username-input"
                      placeholder="Enter your email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the email associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="newPassword"
                      type="password"
                      data-testid="confirm-password-new-password-input"
                      placeholder="Enter your new password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter your new password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      data-testid="confirm-password-confirm-password-input"
                      placeholder="Confirm your new password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Confirm your new password.
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
                  <FormLabel className="text-text-primary">Code</FormLabel>
                  <FormControl data-testid="confirm-password-code-input">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                        />
                        <InputOTPSlot
                          index={1}
                        />
                        <InputOTPSlot
                          index={2}
                        />
                        <InputOTPSlot
                          index={3}
                        />
                        <InputOTPSlot
                          index={4}
                        />
                        <InputOTPSlot
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the 6-digit code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              data-testid="confirm-password-submit-button"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Confirm Password
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            id="redirect-to-forgot-password"
            type="button"
            className="text-text-secondary group hover:text-text-primary transition-colors bg-inherit hover:bg-inherit"
            onClick={handleRedirectToForgotPassword}
            data-testid="confirm-password-redirect-to-forgot-password-button"
          >
            Didn&apos;t receive a code?{" "}
            <span className="underline underline-offset-4 text-text-secondary group-hover:text-accent-primary transition-colors">
              Request a new one
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
