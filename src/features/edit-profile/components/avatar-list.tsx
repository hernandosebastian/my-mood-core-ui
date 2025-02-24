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
    <ScrollArea className="h-[300px] border rounded-lg p-4 border-border-primary">
      <div className="grid grid-cols-3 gap-4 min-[400px]:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {avatarList.map((avatar, index) => (
          <button
            type="button"
            key={avatar.name}
            className={`p-1 rounded-lg transition-all flex justify-center ${
              selectedAvatar === avatar.src
                ? "bg-background-secondary border-border-primary border-2"
                : "hover:bg-border-primary hover:border-border-primary border-background-primary border-2"
            }`}
            onClick={() => setSelectedAvatar(avatar.src)}
            id={`avatar-${index}`}
          >
            <Avatar className="w-16 h-16 bg-gray-300">
              <AvatarImage
                src={avatar.src}
                alt={`Avatar option ${avatar.name}`}
                data-testid={`avatar-${avatar.name}`}
                className="bg-background-secondary"
              />
              <AvatarFallback className="rounded-lg bg-text-primary text-text-secondary">
                {avatar.name}
              </AvatarFallback>
            </Avatar>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
