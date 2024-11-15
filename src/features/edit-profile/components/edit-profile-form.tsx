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
import { AvatarList } from "./avatar-list";
import { CurrentAvatar } from "./current-avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IAvatar } from "../interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { editProfileSchema } from "../schemas";

interface IEditProfileFormProps {
  isLoading: boolean;
  currentAvatar: string | undefined;
  selectedAvatar: string | undefined;
  avatarList: IAvatar[];
  isImageLoaded: boolean;
  initialNickname: string;
  initialAvatarSrc: string;
  onSubmit: (values: z.infer<typeof editProfileSchema>) => void;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function EditProfileForm({
  isLoading,
  currentAvatar,
  selectedAvatar,
  avatarList,
  isImageLoaded,
  initialNickname,
  initialAvatarSrc,
  onSubmit,
  setSelectedAvatar,
}: Readonly<IEditProfileFormProps>): JSX.Element {
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: initialNickname,
      avatarSrc: initialAvatarSrc,
    },
  });

  useEffect(() => {
    if (selectedAvatar) {
      form.setValue("avatarSrc", selectedAvatar);
    }
  }, [selectedAvatar, form]);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const result = await form.trigger();
    if (result) {
      onSubmit(form.getValues());
    }
  };

  return (
    <div className="lg:p-8 text-black">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <CurrentAvatar
            currentAvatar={currentAvatar}
            selectedAvatar={selectedAvatar}
            isImageLoaded={isImageLoaded}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Choose a new avatar:
            </h2>
            <AvatarList
              avatarList={avatarList}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
            />
          </div>
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-gray-800 mb-4">
                  Nickname
                </FormLabel>
                <FormControl>
                  <Input
                    id="nickname"
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

