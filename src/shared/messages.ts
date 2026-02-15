export type PopupToBackgroundMessage = { type: "LIST_MEDIA_SOURCES" };

export type BackgroundToContentMessage = { type: "MEDIA_PROBE" };

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
