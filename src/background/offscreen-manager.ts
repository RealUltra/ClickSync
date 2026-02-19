import type { BackgroundToOffscreenMessage } from "../shared/messages";

const OFFSCREEN_URL = "offscreen.html";

export async function ensureOffscreen(): Promise<void> {
  const hasDoc = await chrome.offscreen.hasDocument?.();
  if (hasDoc) return;

  await chrome.offscreen.createDocument({
    url: OFFSCREEN_URL,
    reasons: [chrome.offscreen.Reason.WORKERS],
    justification: "Keep websocket client alive for party management",
  });
}

export async function sendToOffscreen(
  message: BackgroundToOffscreenMessage,
): Promise<void> {
  await ensureOffscreen();
  await chrome.runtime.sendMessage(message);
}
