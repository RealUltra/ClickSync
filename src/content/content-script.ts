import type {
  BackgroundToContentMessage,
  MediaProbeResponse,
} from "../shared/messages";

let hasVideo = false;

function computeHasVideo() {
  hasVideo = document.querySelector("video") !== null;
}

// Initial check
computeHasVideo();

const observer = new MutationObserver(() => {
  computeHasVideo();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

chrome.runtime.onMessage.addListener(
  (
    message: BackgroundToContentMessage,
    _sender,
    sendResponse: (response: MediaProbeResponse) => void,
  ) => {
    if (message.type !== "MEDIA_PROBE") return;

    console.log("GOT A MEDIA PROBE!");

    // Just in case
    computeHasVideo();

    console.log(`hasVideo = ${hasVideo}`);

    if (hasVideo) {
      sendResponse({ hasVideo: true });
    }
  },
);
