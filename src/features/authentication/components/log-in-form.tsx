import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { logInSchema } from "../schemas";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";

interface ILogInFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<{ username: string; password: string }, any, undefined>;
  onSubmit: (values: z.infer<typeof logInSchema>) => void;
  isLoading: boolean;
}

export function LogInForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<ILogInFormProps>): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  const handleRedirectToSignUp = (): void => {
    navigate("/sign-up");
  };

  const handleRedirectToForgotPassword = (): void => {
    navigate("/forgot-password");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Log In
          </h1>
          <p className="text-sm text-muted-foreground text-text-secondary">
            Enter your email and password to access your account
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
                      placeholder="Enter your email"
                      data-testid="log-in-username-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the email to access your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      data-testid="log-in-password-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the password to access your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleRedirectToForgotPassword}
                className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              id="log-in-button"
              data-testid="log-in-submit-button"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin text-text-primary" />
              ) : null}
              Log In
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            id="sign-up-button"
            type="button"
            className="text-text-secondary group hover:text-text-primary transition-colors"
            onClick={handleRedirectToSignUp}
            data-testid="log-in-redirect-to-sign-up-button"
          >
            Don&apos;t have an account?{" "}
            <span className="underline underline-offset-4 text-text-secondary group-hover:text-accent-primary transition-colors">
              Sign Up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
