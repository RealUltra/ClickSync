import type { PopupToBackgroundMessage } from "../shared/messages";
import { listMediaSources } from "./list-media-sources";

chrome.runtime.onMessage.addListener(
  (
    message: PopupToBackgroundMessage,
    _sender,
    sendResponse: (res: { sources: unknown[] }) => void,
  ) => {
    if (message.type === "LIST_MEDIA_SOURCES") {
      (async () => {
        const sources = await listMediaSources();
        sendResponse({ sources });
      })();

      return true;
    }
  },
);
