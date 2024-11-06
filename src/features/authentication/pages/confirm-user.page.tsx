import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmUserSchema } from "../schemas";
import { ConfirmUserForm } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useConfirmUser } from "../hooks";
import { useSEO } from "@/seo/hooks";

export function ConfirmUserPage(): JSX.Element {
  useSEO({
    title: "My Mood - Confirm Your Account",
    description:
      "Confirm your account to complete registration and start using My Mood.",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const confirmUserMutation = useConfirmUser();

  const form = useForm<z.infer<typeof confirmUserSchema>>({
    resolver: zodResolver(confirmUserSchema),
    defaultValues: {
      username: state?.user ?? "",
      code: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof confirmUserSchema>
  ): Promise<void> {
    setIsLoading(true);

    try {
      await confirmUserMutation.mutateAsync(values, {
        onSuccess: () => {
          navigate("/log-in", {
            state: { user: values.username },
          });
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ConfirmUserForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
  );
}
