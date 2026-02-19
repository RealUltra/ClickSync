export type PopupToBackgroundMessage =
  | { type: "LIST_MEDIA_SOURCES" }
  | { type: "CREATE_PARTY" }
  | { type: "JOIN_PARTY"; partyCode: string };

export type BackgroundToContentMessage = { type: "MEDIA_PROBE" };

export type BackgroundToOffscreenMessage =
  | { type: "SERVER_CONNECT" }
  | { type: "SERVER_DISCONNECT" };

export type MediaProbeResponse = { hasVideo: boolean };

export type MediaSourceInfo = {
  tabId: number;
  title: string;
  url: string;
  hostname: string;
};

export type ListMediaSourcesResponse = {
  sources: MediaSourceInfo[];
};
