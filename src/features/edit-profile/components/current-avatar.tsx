import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ICurrentAvatarProps {
  currentAvatar: string | undefined;
  selectedAvatar: string | undefined;
  isImageLoaded: boolean;
  setIsImageLoaded: (value: boolean) => void;
}

export function CurrentAvatar({
  currentAvatar,
  selectedAvatar,
  isImageLoaded,
  setIsImageLoaded,
}: Readonly<ICurrentAvatarProps>): JSX.Element {
  const handleImageLoad = (): void => {
    setIsImageLoaded(true);
  };

  const handleImageError = (): void => {
    setIsImageLoaded(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg text-gray-800">Current Avatar</h2>
      <Avatar className="w-32 h-32 bg-gray-300">
        {isImageLoaded ? (
          <AvatarImage
            src={selectedAvatar ?? currentAvatar}
            alt="Current profile picture"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <AvatarFallback className="text-gray-500">User</AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}

