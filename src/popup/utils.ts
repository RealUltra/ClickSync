import type {
  ListMediaSourcesResponse,
  MediaSourceInfo,
} from "../shared/messages";

export async function listMediaSources(): Promise<MediaSourceInfo[]> {
  return await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "LIST_MEDIA_SOURCES" },
      (response: ListMediaSourcesResponse) => {
        resolve(response?.sources ?? []);
      },
    );
  });
}
