import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordSchema } from "../schemas";
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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await form.trigger();

    if (result) {
      setIsLoading(true);
      onSubmit(form.getValues());
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your username to reset your password.
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the username associated with your account to reset
                    your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

