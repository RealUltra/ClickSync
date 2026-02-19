import type { PopupToBackgroundMessage } from "../shared/messages";
import { listMediaSources } from "./list-media-sources";
import { sendToOffscreen } from "./offscreen-manager";

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

    if (message.type === "CREATE_PARTY") {
      console.log("Creating party...");
      sendToOffscreen({ type: "SERVER_CONNECT" });
      return true;
    }

    if (message.type === "JOIN_PARTY") {
      console.log("Joining party with code:", message.partyCode);
      sendToOffscreen({ type: "SERVER_CONNECT" });
      return true;
    }
  },
);
