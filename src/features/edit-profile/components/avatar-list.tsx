import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IAvatar } from "../interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IAvatarListProps {
  avatarList: IAvatar[];
  selectedAvatar: string | undefined;
  setSelectedAvatar: (src: string) => void;
}

export function AvatarList({
  avatarList,
  selectedAvatar,
  setSelectedAvatar,
}: Readonly<IAvatarListProps>): JSX.Element {
  return (
    <ScrollArea className="h-[300px] border rounded-lg p-4">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {avatarList.map((avatar, index) => (
          <button
            type="button"
            key={avatar.name}
            className={`p-1 rounded-lg transition-all flex justify-center ${
              selectedAvatar === avatar.src
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedAvatar(avatar.src)}
            id={`avatar-${index}`}
          >
            <Avatar className="w-16 h-16 bg-gray-300">
              <AvatarImage
                src={avatar.src}
                alt={`Avatar option ${avatar.name}`}
                data-testid={`avatar-${avatar.name}`}
              />
              <AvatarFallback className="text-gray-500">
                {avatar.name}
              </AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

