import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { CurrentAvatar } from "./current-avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { editProfileSchema } from "../schemas";

interface IEditProfileFormProps {
  isLoading: boolean;
  currentAvatar: string | undefined;
  tempAvatarUrl: string | undefined;
  initialNickname: string;
  initialAvatarSrc: string;
  onSubmit: (values: z.infer<typeof editProfileSchema>) => void;
  onAvatarChange: (file: File) => void;
}

export function EditProfileForm({
  isLoading,
  currentAvatar,
  tempAvatarUrl,
  initialNickname,
  initialAvatarSrc,
  onSubmit,
  onAvatarChange,
}: Readonly<IEditProfileFormProps>): JSX.Element {
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: initialNickname,
      avatarSrc: initialAvatarSrc,
    },
  });

  useEffect(() => {
    if (tempAvatarUrl) {
      form.setValue("avatarSrc", tempAvatarUrl);
    }
  }, [tempAvatarUrl, form]);

  const handleAvatarChange = (file: File): void => {
    form.setValue("avatarFile", file, {
      shouldValidate: true,
    });
    onAvatarChange(file);
  };

  return (
    <div className="lg:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-center gap-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="avatarFile"
            render={() => (
              <FormItem>
                <FormControl>
                  <CurrentAvatar
                    currentAvatar={currentAvatar}
                    tempAvatarUrl={tempAvatarUrl}
                    onAvatarChange={handleAvatarChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="text-lg text-text-primary">
                  Nickname
                </FormLabel>
                <FormControl>
                  <Input
                    id="nickname"
                    data-testid="edit-profile-nickname"
                    placeholder="Enter your nickname"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            id="edit-profile-submit-button"
            data-testid="edit-profile-submit-button"
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}{" "}
            Done
          </Button>
        </form>
      </Form>
    </div>
  );
}
