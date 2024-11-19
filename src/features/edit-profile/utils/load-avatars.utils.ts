import { IAvatar } from "../interfaces";

export const loadAvatars = async (
  avatars: Record<string, () => Promise<{ default: string }>>
): Promise<IAvatar[]> => {
  return await Promise.all(
    Object.entries(avatars).map(async ([path, resolver]) => {
      const avatarModule = await resolver();
      const avatarUrl = avatarModule.default;
      const fileName = path.split("/").pop()?.replace(".png", "") ?? "Unknown";

      return { name: fileName, src: avatarUrl };
    })
  );
};

