import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PersonIcon, Pencil1Icon } from "@radix-ui/react-icons";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface ICurrentAvatarProps {
  currentAvatar: string | undefined;
  tempAvatarUrl: string | undefined;
  onAvatarChange: (file: File) => void;
}

export function CurrentAvatar({
  currentAvatar,
  tempAvatarUrl,
  onAvatarChange,
}: Readonly<ICurrentAvatarProps>): JSX.Element {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group cursor-pointer">
        <Avatar className="w-44 h-44 bg-background-primary">
          <AvatarImage
            data-testid="current-avatar"
            src={tempAvatarUrl ?? currentAvatar}
            alt="Current profile picture"
          />
          <AvatarFallback>
            <PersonIcon className="w-20 h-20 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2 shadow-md">
          <Pencil1Icon className="w-4 h-4 text-background" />
        </div>

        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center">
          <span className="text-white text-sm font-medium">Cambiar avatar</span>
        </div>

        <input
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          data-testid="avatar-input"
        />
      </div>
    </div>
  );
}
