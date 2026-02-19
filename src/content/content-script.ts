import type {
  BackgroundToContentMessage,
  MediaProbeResponse,
} from "../shared/messages";

let video: HTMLVideoElement | null = null;

function findVideo() {
  const videos = [...document.querySelectorAll("video")];
  if (!videos.length) return null;

  return videos.sort(
    (a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight,
  )[0];
}

function attachToVideo() {
  video = findVideo();
}

// Initial check
attachToVideo();

const observer = new MutationObserver(() => {
  attachToVideo();
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

    // Just in case the video element exists but isn't attached
    attachToVideo();

    console.log(`video = ${video !== null}`);

    if (video !== null) {
      sendResponse({ hasVideo: true });
    }
  },
);
