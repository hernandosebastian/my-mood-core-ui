import { useState, useEffect } from "react";
import { loadAvatars } from "../utils";
import { IAvatar } from "../interfaces";

export interface IUseAvatars {
  avatarList: IAvatar[];
  isImageLoaded: boolean;
}

export function useAvatars(): IUseAvatars {
  const [avatarList, setAvatarList] = useState<IAvatar[]>([]);
  const [isImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAvatars = async (): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const avatars: Record<string, () => Promise<any>> = import.meta.glob(
        "/assets/avatars/Multiavatar-*.png"
      );

      const avatarPaths = await loadAvatars(avatars);
      setAvatarList(avatarPaths);
    };

    fetchAvatars();
  }, []);

  return { avatarList, isImageLoaded };
}
