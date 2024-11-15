import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ICurrentAvatarProps {
  currentAvatar: string | undefined;
  selectedAvatar: string | undefined;
  isImageLoaded: boolean;
}

export function CurrentAvatar({
  currentAvatar,
  selectedAvatar,
}: Readonly<ICurrentAvatarProps>): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg text-gray-800">Current Avatar</h2>
      <Avatar className="w-32 h-32 bg-gray-300">
        <AvatarImage
          src={selectedAvatar ?? currentAvatar}
          alt="Current profile picture"
        />
      </Avatar>
    </div>
  );
}

