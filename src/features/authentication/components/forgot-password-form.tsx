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
  isLoading: boolean;
}

export function ForgotPasswordForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<IForgotPasswordFormProps>): JSX.Element {
  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const result = await form.trigger();

    if (result) {
      onSubmit(form.getValues());
    }
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Olvidé mi Contraseña
          </h1>
          <p className="text-sm text-muted-foreground text-text-secondary">
            Ingresa tu correo electrónico para restablecer tu contraseña.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-primary">
                    Correo Electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-text-secondary border-text-secondary"
                      id="username"
                      data-testid="forgot-password-username-input"
                      placeholder="Ingresa tu correo electrónico"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Ingresa el correo asociado a tu cuenta para restablecer tu
                    contraseña.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              data-testid="forgot-password-submit-button"
            >
              {isLoading ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Restablecer Contraseña
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
