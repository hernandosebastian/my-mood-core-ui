import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
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
import { env } from "@/config/env";
import { recaptchaMessages } from "../messages";

interface ISignUpFormProps {
  form: UseFormReturn<
    {
      username: string;
      nickname: string;
      password: string;
      confirmPassword: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
  onSubmit: (
    values: z.infer<typeof signUpSchema>,
    captchaToken: string
  ) => void;
  isLoading: boolean;
}

export function SignUpForm({
  form,
  onSubmit,
  isLoading,
}: Readonly<ISignUpFormProps>): JSX.Element {
  const navigate = useNavigate();
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  
  const isTestMode = (): boolean => {
    return import.meta.env.VITE_APP_MODE === "automated_tests";
  };
  
  const MOCK_CAPTCHA_TOKEN = "test-captcha-token";
  
  const getCaptchaToken = async (): Promise<string> => {
    if (isTestMode()) {
      return MOCK_CAPTCHA_TOKEN;
    }
    
    const currentRecaptchaRef = recaptchaRef?.current;
    if (!currentRecaptchaRef) {
      throw new Error("ReCAPTCHA reference not available");
    }
    
    const token = await currentRecaptchaRef.executeAsync() || "";
    currentRecaptchaRef.reset();
    
    if (!token) {
      throw new Error(recaptchaMessages.error.title);
    }
    
    return token;
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const result = await form.trigger();
    if (!result) {
      return;
    }

    try {
      const captchaToken = await getCaptchaToken();
      onSubmit(form.getValues(), captchaToken);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleRedirectToLogIn = (): void => {
    navigate("/iniciar-sesion");
  };

  return (
    <div className="lg:p-8 text-black">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Regístrate
          </h1>
          <p className="text-sm text-muted-foreground text-text-secondary">
            Crea tu cuenta ingresando un correo electrónico y una contraseña.
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
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      placeholder="Ingresa tu correo electrónico"
                      data-testid="sign-up-username-input"
                      {...field}
                      disabled={isLoading}
                      className="border-border-secondary/75"
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Ingresa el correo electrónico para crear tu cuenta.
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
                  <FormLabel className="text-text-primary">Apodo</FormLabel>
                  <FormControl>
                    <Input
                      id="nickname"
                      placeholder="Ingresa tu apodo"
                      data-testid="sign-up-nickname-input"
                      {...field}
                      disabled={isLoading}
                      className="border-border-secondary/75"
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Ingresa el apodo con el que te identificarás.
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
                  <FormLabel className="text-text-primary">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      data-testid="sign-up-password-input"
                      {...field}
                      disabled={isLoading}
                      className="border-border-secondary/75"
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Ingresa la contraseña para acceder a tu cuenta.
                  </FormDescription>
                  <ul className="text-xs text-text-secondary space-y-1 mt-2 list-inside">
                    <li className="list-disc">Mínimo 8 caracteres</li>
                    <li className="list-disc">Al menos una letra mayúscula</li>
                    <li className="list-disc">Al menos una letra minúscula</li>
                    <li className="list-disc">Al menos un número</li>
                    <li className="list-disc">
                      Al menos un carácter especial (!, @, #, $, etc.)
                    </li>
                  </ul>
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
                    Confirmar Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      data-testid="sign-up-confirm-password-input"
                      {...field}
                      disabled={isLoading}
                      className="border-border-secondary/75"
                    />
                  </FormControl>
                  <FormDescription className="text-text-secondary">
                    Vuelve a ingresar tu contraseña para confirmarla.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isTestMode() && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={env.recaptcha.siteKey}
              />
            )}

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
              Regístrate
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          <button
            id="redirect-to-log-in"
            type="button"
            className="text-text-secondary group hover:text-text-primary transition-colors bg-inherit hover:bg-inherit"
            onClick={handleRedirectToLogIn}
            data-testid="sign-up-redirect-to-log-in"
          >
            ¿Ya tienes una cuenta?{" "}
            <span className="underline underline-offset-4 text-text-secondary group-hover:text-accent-primary transition-colors">
              Inicia sesión
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
