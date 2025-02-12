import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "../schemas";
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
import { Icons } from "@/components/ui/Icons";

interface ISignUpFormProps {
  form: UseFormReturn<
    {
      username: string;
      nickname: string;
      avatarSrc: string;
      password: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof signUpSchema>) => void;
  isLoading: boolean;
}

export function SignUpForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<ISignUpFormProps>): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  const handleRedirectToLogIn = (): void => {
    navigate("/log-in");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Sign Up
          </h1>
          <p className="text-sm text-muted-foreground text-text-secondary">
            Create your account by entering a email and password.
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
                      className="text-text-secondary border-text-secondary"
                      id="username"
                      placeholder="Enter your email"
                      data-testid="sign-up-username-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the email to create your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">Nickname</FormLabel>
                  <FormControl>
                    <Input
                      className="text-text-secondary border-text-secondary"
                      id="nickname"
                      placeholder="Enter your nickname"
                      data-testid="sign-up-nickname-input"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Enter the nickname to identify yourself.
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
                      className="text-text-secondary border-text-secondary"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      data-testid="sign-up-password-input"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              id="sign-up-button"
              data-testid="sign-up-submit-button"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            id="redirect-to-log-in"
            type="button"
            className="text-text-secondary group hover:text-text-primary transition-colors"
            onClick={handleRedirectToLogIn}
            data-testid="sign-up-redirect-to-log-in"
          >
            Already have an account?{" "}
            <span className="underline underline-offset-4 text-text-secondary group-hover:text-accent-primary transition-colors">
              Log In
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
