import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/common/Loading";
import { EditProfileForm } from "../components";
import { useAvatars, useProfile } from "../hooks";
import { useToast } from "@/hooks";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { useSEO } from "@/seo/hooks";
import { EditProfileSeoConfig } from "@/seo/config/edit-profile.config";
import { z } from "zod";
import { editProfileSchema } from "../schemas/";
import { editProfileToastMessages } from "../messages";
import { AxiosError } from "axios";

export function EditProfilePage(): JSX.Element {
  useSEO({
    title: EditProfileSeoConfig.title,
    description: EditProfileSeoConfig.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined
  );

  const { getMeQuery, currentAvatar } = useProfile();
  const { avatarList, isImageLoaded } = useAvatars();
  const { showSuccessToast, showErrorToast } = useToast();
  const updateProfileMutation = useUpdateProfile();
  const navigate = useNavigate();

  if (getMeQuery.isLoading) return <Loading />;

  async function onSubmit(
    values: z.infer<typeof editProfileSchema>
  ): Promise<void> {
    setIsLoading(true);

    if (values.nickname === getMeQuery.data?.user.nickname) {
      const { nickname, ...valuesWithoutNickname } = values;
      values = valuesWithoutNickname;
    }

    try {
      await updateProfileMutation.mutateAsync(values, {
        onSuccess: () => {
          showSuccessToast(
            editProfileToastMessages.success.title,
            editProfileToastMessages.success.description
          );
          navigate("/");
        },
        onError: (error: AxiosError) => {
          const errorMessage = (error.response?.data as { message?: string })
            ?.message;
          showErrorToast(
            editProfileToastMessages.error.title,
            errorMessage ?? editProfileToastMessages.error.description
          );
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <EditProfileForm
            isLoading={isLoading}
            currentAvatar={currentAvatar}
            selectedAvatar={selectedAvatar}
            avatarList={avatarList}
            isImageLoaded={isImageLoaded}
            initialNickname={getMeQuery.data?.user.nickname ?? ""}
            initialAvatarSrc={getMeQuery.data?.user.avatarSrc ?? ""}
            onSubmit={onSubmit}
            setSelectedAvatar={setSelectedAvatar}
          />
        </div>
      </main>
    </div>
  );
}

