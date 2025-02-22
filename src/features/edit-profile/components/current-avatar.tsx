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
      <Avatar className="w-44 h-44 bg-background-primary">
        <AvatarImage
          data-testid="current-avatar"
          src={selectedAvatar ?? currentAvatar}
          alt="Current profile picture"
        />
      </Avatar>
    </div>
  );
}
