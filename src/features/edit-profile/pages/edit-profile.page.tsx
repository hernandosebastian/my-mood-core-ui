import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/components/common/Loading";
import { EditProfileForm } from "../components";
import { useProfile } from "../hooks";
import { useToast } from "@/hooks";
import { useUpdateProfile, useUploadAvatar } from "../hooks";
import { useSEO } from "@/seo/hooks";
import { editProfileSeoConfig } from "@/seo/config";
import { z } from "zod";
import { editProfileSchema } from "../schemas/";
import { editProfileToastMessages } from "../messages";
import { AxiosError } from "axios";

export function EditProfilePage(): JSX.Element {
  useSEO({
    title: editProfileSeoConfig.title,
    description: editProfileSeoConfig.description,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newAvatarFile, setNewAvatarFile] = useState<File | undefined>(
    undefined
  );
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | undefined>(
    undefined
  );

  const { getMeQuery, currentAvatar } = useProfile();
  const { showSuccessToast, showErrorToast } = useToast();
  const updateProfileMutation = useUpdateProfile();
  const uploadAvatarMutation = useUploadAvatar();
  const navigate = useNavigate();

  useEffect(() => {
    return (): void => {
      if (tempAvatarUrl) {
        URL.revokeObjectURL(tempAvatarUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getMeQuery.isLoading) return <Loading />;

  const handleAvatarChange = (file: File): void => {
    if (tempAvatarUrl) {
      URL.revokeObjectURL(tempAvatarUrl);
    }
    const newTempUrl = URL.createObjectURL(file);
    setTempAvatarUrl(newTempUrl);
    setNewAvatarFile(file);
  };

  async function onSubmit(
    values: z.infer<typeof editProfileSchema>
  ): Promise<void> {
    setIsLoading(true);
    let hasUpdates = false;

    try {
      if (newAvatarFile) {
        await uploadAvatarMutation.mutateAsync(newAvatarFile);
        hasUpdates = true;
      }

      const hasNicknameChange =
        values.nickname !== getMeQuery.data?.user.nickname;

      if (hasNicknameChange) {
        await updateProfileMutation.mutateAsync({ nickname: values.nickname });
        hasUpdates = true;
      }

      if (!hasUpdates) {
        return;
      }

      showSuccessToast(
        editProfileToastMessages.success.title,
        editProfileToastMessages.success.description
      );

      if (hasNicknameChange) {
        navigate("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as { message?: string })
        ?.message;
      showErrorToast(
        editProfileToastMessages.error.title,
        errorMessage ?? editProfileToastMessages.error.description
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <EditProfileForm
            isLoading={isLoading}
            currentAvatar={currentAvatar}
            tempAvatarUrl={tempAvatarUrl}
            initialNickname={getMeQuery.data?.user.nickname ?? ""}
            initialAvatarSrc={getMeQuery.data?.user.avatarSrc ?? ""}
            onSubmit={onSubmit}
            onAvatarChange={handleAvatarChange}
          />
        </div>
      </main>
    </div>
  );
}
