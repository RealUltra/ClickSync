import type { MediaProbeResponse, MediaSourceInfo } from "../shared/messages";

function isWebUrl(url?: string): boolean {
  return !!url && (url.startsWith("http://") || url.startsWith("https://"));
}

async function tryProbeOnce(tabId: number): Promise<boolean> {
  try {
    const res = (await chrome.tabs.sendMessage(tabId, {
      type: "MEDIA_PROBE",
    })) as MediaProbeResponse | undefined;

    return res?.hasVideo === true;
  } catch {
    return false;
  }
}

async function probeTab(tabId: number): Promise<boolean> {
  return await tryProbeOnce(tabId);
}

export async function listMediaSources(): Promise<MediaSourceInfo[]> {
  const tabs = await chrome.tabs.query({});
  const candidates = tabs.filter((tab) => tab.id && isWebUrl(tab.url));

  const results = await Promise.allSettled(
    candidates.map(async (tab) => {
      const hasVideo = await probeTab(tab.id!);
      if (!hasVideo) return null;

      const hostname = new URL(tab.url!).hostname;

      return {
        tabId: tab.id!,
        title: tab.title ?? "Untitled",
        url: tab.url!,
        hostname,
      } as MediaSourceInfo;
    }),
  );

  const fulfilled = results.filter(
    (res): res is PromiseFulfilledResult<MediaSourceInfo | null> =>
      res.status === "fulfilled",
  );

  const sources = fulfilled
    .map((res) => res.value)
    .filter((res): res is MediaSourceInfo => res !== null);

  return sources;
}
