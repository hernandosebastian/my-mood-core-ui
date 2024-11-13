import { Button } from "@/components/ui/button";
import { CurrentAvatar, AvatarList, AttributionLink } from "../components";
import { Loading } from "@/components/common/Loading";
import { useState } from "react";
import { useAvatars, useProfile } from "../hooks";

export function EditProfilePage(): JSX.Element {
  const { getMeQuery, currentAvatar, setCurrentAvatar } = useProfile();
  const { avatarList, isImageLoaded, setIsImageLoaded } = useAvatars();
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined
  );

  const handleSave = (): void => {
    setCurrentAvatar(selectedAvatar);
    console.log("Profile updated with new avatar:", selectedAvatar);
  };

  if (getMeQuery.isLoading) {
    return <Loading />;
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
          <CurrentAvatar
            currentAvatar={currentAvatar}
            selectedAvatar={selectedAvatar}
            isImageLoaded={isImageLoaded}
            setIsImageLoaded={setIsImageLoaded}
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Choose a new avatar:
            </h2>
            <AvatarList
              avatarList={avatarList}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              setIsImageLoaded={setIsImageLoaded}
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>

          <AttributionLink />
        </div>
      </main>
    </div>
  );
}

