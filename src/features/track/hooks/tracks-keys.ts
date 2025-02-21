export const tracksKeys = {
  all: [{ entity: "tracks" }] as const,
  lists: () => [{ ...tracksKeys.all[0], scope: "list" }] as const,
  list: (month: string, year: string) =>
    [{ ...tracksKeys.lists()[0], month, year }] as const,
  yearList: (year: string) =>
    [{ ...tracksKeys.lists()[0], scope: "yearList", year }] as const,
  tracks: () => [{ ...tracksKeys.all[0], scope: "track" }] as const,
  track: (id: number) => [{ ...tracksKeys.tracks()[0], id }] as const,
};
