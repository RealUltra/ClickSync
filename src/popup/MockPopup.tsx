import { useEffect, useMemo, useState } from "react";
import type { MediaSourceInfo } from "../shared/messages";
import { listMediaSources } from "./utils";

type Screen = "menu" | "party";
type Tab = "party" | "controls";

type Member = {
  id: string;
  name: string;
  joinedOrder: number;
  isHost?: boolean;
  isYou?: boolean;
};

type IconProps = {
  className?: string;
};

function makeCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function IconPlay({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
    </svg>
  );
}

function IconPause({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="5" width="4" height="14" fill="currentColor" />
      <rect x="13" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  );
}

function IconBack({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.5 6.5 7 12l5.5 5.5 1.5-1.5-4-4 4-4zM17 6.5 11.5 12 17 17.5l1.5-1.5-4-4 4-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconForward({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11.5 6.5 17 12l-5.5 5.5-1.5-1.5 4-4-4-4zM7 6.5 12.5 12 7 17.5l-1.5-1.5 4-4-4-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconVolume({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 9v6h4l5 4V5L8 9zm12 3a4 4 0 0 0-2-3.5v7a4 4 0 0 0 2-3.5zm0-7.5v2.2a6.5 6.5 0 0 1 0 10.6v2.2a8.5 8.5 0 0 0 0-15z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconSpark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8 14 8l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2L10 8z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconUsers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.3 12.1a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm6 0a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"
        fill="currentColor"
      />
      <path
        d="M3.7 18.3c.2-2.4 2.4-4.2 5.6-4.2s5.4 1.8 5.6 4.2v.9H3.7Zm12.1.9c.1-1.8 1.6-3.2 4-3.2.2 0 .4 0 .5.1v3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9.6 16.2-3.8-3.8-1.4 1.4 5.2 5.2L20 8.6l-1.4-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconEdit({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4 16.9 4.1 3.1 11-11.1L15 4.8zM3 21l4.8-1.3L4.3 17zM16.1 3.7l4.2 4.2 1-1a1.6 1.6 0 0 0 0-2.3L19.5 2.8a1.6 1.6 0 0 0-2.3 0z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconArrowRight({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ width: "24px", height: "24px", display: "block" }}
    >
      <path d="M2 1.5v13l11.5-6.5z" fill="currentColor" />
    </svg>
  );
}

export default function MockPopup() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [tab, setTab] = useState<Tab>("party");

  const [isHost, setIsHost] = useState(false);
  const [partyCode, setPartyCode] = useState(makeCode);
  const [selectedSource, setSelectedSource] = useState<MediaSourceInfo | null>(
    null,
  );
  const [mediaSources, setMediaSources] = useState<MediaSourceInfo[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [displayName, setDisplayName] = useState("Guest");
  const [isDisplayNameLocked, setIsDisplayNameLocked] = useState(true);
  const [joinCode, setJoinCode] = useState("");

  const members = useMemo<Member[]>(() => {
    if (isHost) {
      return [
        { id: "1", name: "You", joinedOrder: 1, isHost: true, isYou: true },
        { id: "2", name: "Noah", joinedOrder: 2 },
        { id: "3", name: "Ava", joinedOrder: 3 },
        { id: "4", name: "Liam", joinedOrder: 4 },
      ];
    }

    return [
      { id: "1", name: "Mia", joinedOrder: 1, isHost: true },
      { id: "2", name: "You", joinedOrder: 2, isYou: true },
      { id: "3", name: "Noah", joinedOrder: 3 },
      { id: "4", name: "Ava", joinedOrder: 4 },
    ];
  }, [isHost]);

  const controlsEnabled = selectedSource !== null;

  const cardClass =
    "rounded-[8px] border border-[#c6d1e2] bg-[#f9fbff] p-2 flex flex-col gap-[6px]";
  const labelClass =
    "m-0 text-[11px] uppercase tracking-[0.04em] text-[#54627d] font-bold";
  const inputClass =
    "h-[31px] rounded-[7px] border border-[#c6d1e2] bg-[#fdfefe] px-[10px] text-[12px] text-[#0f172a] outline-none placeholder:text-[#7f8ca3]";
  const buttonClass =
    "h-[31px] rounded-[7px] border-0 bg-[#2457d6] px-3 text-[12px] font-bold text-[#f7faff]";

  function createParty() {
    setIsHost(true);
    setPartyCode(makeCode());
    setSelectedSource(null);
    setIsPlaying(false);
    setVolume(70);
    setScreen("party");
    setTab("party");
  }

  function joinParty() {
    setIsHost(false);
    setSelectedSource(mediaSources[0] ?? null);
    setScreen("party");
    setTab("party");
  }

  useEffect(() => {
    if (screen !== "party" || tab !== "controls" || !isHost) {
      return;
    }

    void (async () => {
      const sources = await listMediaSources();
      setMediaSources(sources);
    })();
  }, [isHost, screen, tab]);

  return (
    <main
      className="flex h-[460px] w-[360px] flex-col overflow-hidden bg-[#eef2f8] p-[10px] text-[#0f172a] box-border [font-family:'Segoe_UI',Tahoma,sans-serif]"
      aria-label="ClickSync popup preview"
    >
      <header
        className={`mx-[-10px] mt-[-10px] flex items-center justify-center border-b border-[#becade] bg-[linear-gradient(180deg,#edf2fb_0%,#dde6f4_100%)] px-3 pt-[10px] pb-[9px] shadow-[inset_0_-1px_0_rgba(255,255,255,0.75)] ${screen === "menu" ? "mb-[2px]" : "mb-3"}`}
      >
        <h1 className="m-0 border-b-2 border-[#b8c7df] pb-1 text-2xl leading-none font-bold tracking-[-0.02em] text-[#10203d] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
          ClickSync
        </h1>
      </header>

      {screen === "menu" && (
        <section
          className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden pt-2 pb-[2px]"
          aria-label="Main menu"
        >
          <div className={cardClass}>
            <p className={labelClass}>Display Name</p>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <input
                className={`${inputClass} disabled:opacity-100 ${
                  isDisplayNameLocked
                    ? "font-bold !text-[#0f172a] !bg-[#dfe5ee] [-webkit-text-fill-color:#0f172a]"
                    : "font-normal !text-[#0f172a] !bg-[#fdfefe] [-webkit-text-fill-color:#0f172a]"
                }`}
                placeholder="Your name"
                value={displayName}
                disabled={isDisplayNameLocked}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <button
                type="button"
                className="inline-flex h-[31px] w-[31px] items-center justify-center rounded-[7px] border border-[#c1cee2] bg-[#e7eefb] text-[#2f456a] disabled:opacity-50"
                aria-label={
                  isDisplayNameLocked
                    ? "Edit display name"
                    : "Lock display name"
                }
                onClick={() => setIsDisplayNameLocked((prev) => !prev)}
                disabled={
                  !isDisplayNameLocked && displayName.trim().length === 0
                }
              >
                {isDisplayNameLocked ? (
                  <IconEdit className="h-[14px] w-[14px]" />
                ) : (
                  <IconCheck className="h-[14px] w-[14px]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-[10px]">
            <button
              type="button"
              className="flex min-h-0 flex-1 basis-0 flex-col items-center justify-center gap-3 rounded-[12px] border border-[#c6d1e2] bg-[#fdfefe] p-3 text-center text-[#0f172a]"
              onClick={createParty}
            >
              <span className="text-base leading-[1.1] font-bold">
                Create Party
              </span>
              <span
                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#e6edf8] text-[#33455f]"
                aria-hidden="true"
              >
                <IconSpark className="h-4 w-4" />
              </span>
            </button>

            <div className="flex min-h-0 flex-1 basis-0 flex-col items-center justify-center gap-[14px] rounded-[12px] border border-[#c6d1e2] bg-[#fdfefe] p-3 text-center text-[#0f172a]">
              <span className="text-base leading-[1.08] font-bold">
                Join Party
              </span>

              <div className="grid w-full [grid-template-columns:48px_auto_8px_minmax(0,1fr)_8px_auto_48px] items-center">
                <span
                  className="col-[2] inline-flex h-[31px] w-[31px] justify-self-end rounded-[8px] bg-[#e6edf8] text-[#33455f]"
                  aria-hidden="true"
                >
                  <IconUsers className="m-auto h-4 w-4" />
                </span>
                <input
                  className={`${inputClass} col-[4] min-w-0`}
                  placeholder="Enter code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className={`${buttonClass} col-[6] inline-flex h-[31px] w-[31px] items-center justify-center p-0`}
                  aria-label="Join party"
                  onClick={joinParty}
                >
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {screen === "party" && (
        <section
          className={`flex min-h-0 flex-1 flex-col overflow-hidden ${tab === "controls" ? "gap-3" : "gap-2"}`}
          aria-label="Party room"
        >
          <div
            className="grid grid-cols-2 gap-2"
            role="tablist"
            aria-label="Party tabs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === "party"}
              className={`h-[31px] rounded-[7px] border border-[#c6d1e2] bg-[#fdfefe] text-[12px] font-semibold text-[#0f172a] ${tab === "party" ? "!border-[#1f4bc8] !bg-[#2457d6] !text-[#f7faff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" : ""}`}
              onClick={() => setTab("party")}
            >
              Party
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "controls"}
              className={`h-[31px] rounded-[7px] border border-[#c6d1e2] bg-[#fdfefe] text-[12px] font-semibold text-[#0f172a] disabled:bg-[#e8edf5] disabled:text-[#7f8ba0] ${tab === "controls" ? "!border-[#1f4bc8] !bg-[#2457d6] !text-[#f7faff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" : ""}`}
              onClick={() => setTab("controls")}
              disabled={!isHost && !controlsEnabled}
            >
              Controls
            </button>
          </div>

          {tab === "party" && (
            <>
              <div className={cardClass}>
                <p className={labelClass}>Party Code</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[14px] font-bold tracking-[0.08em]">
                    {partyCode}
                  </code>
                  {isHost && (
                    <button
                      type="button"
                      className="h-[31px] rounded-[7px] border border-[#c7d3e5] bg-[#e8eef8] px-3 text-[12px] font-bold text-[#2a3850]"
                      onClick={() => setPartyCode(makeCode())}
                    >
                      Regenerate
                    </button>
                  )}
                </div>
              </div>

              <div className={`${cardClass} flex-1 min-h-0`}>
                <p className={labelClass}>Members</p>
                <ul
                  className="m-0 flex min-h-0 flex-1 list-none flex-col gap-[6px] overflow-y-auto pr-[2px] p-0"
                  aria-label="Members list"
                >
                  {members
                    .slice()
                    .sort((a, b) => a.joinedOrder - b.joinedOrder)
                    .map((member) => (
                      <li
                        key={member.id}
                        className="flex min-h-[30px] items-center justify-between gap-2 rounded-[7px] border border-[#c6d1e2] bg-[#fdfefe] px-[7px] py-[5px]"
                      >
                        <span className="text-[12px] font-semibold">
                          {member.name}
                        </span>
                        <div className="flex items-center gap-[6px]">
                          {member.isHost && (
                            <span className="inline-flex h-5 items-center gap-[5px] rounded-full border border-[#9fb7ef] bg-[linear-gradient(180deg,#e8f0ff_0%,#d7e5ff_100%)] px-2 text-[10px] leading-none font-bold tracking-[0.02em] text-[#1f459e]">
                              <span className="h-[5px] w-[5px] rounded-full bg-current opacity-80" />
                              Leader
                            </span>
                          )}
                          {member.isYou && (
                            <span className="inline-flex h-5 items-center rounded-full border border-[#c3cede] bg-[linear-gradient(180deg,#f3f6fc_0%,#e6ecf5_100%)] px-2 text-[10px] leading-none font-bold tracking-[0.02em] text-[#3e4f67]">
                              You
                            </span>
                          )}
                          {isHost && !member.isYou && !member.isHost && (
                            <button
                              type="button"
                              className="h-6 rounded-[6px] border border-[#d7bdc3] bg-[#f8eff1] px-2 text-[11px] font-bold text-[#96434d]"
                            >
                              Kick
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex">
                <button
                  type="button"
                  className="h-[31px] w-full rounded-[7px] border-0 bg-[#a52330] text-[12px] font-bold text-[#fff6f7]"
                  onClick={() => setScreen("menu")}
                >
                  {isHost ? "Disband Party" : "Leave Party"}
                </button>
              </div>
            </>
          )}

          {tab === "controls" && (
            <>
              {controlsEnabled && (
                <div
                  className="flex min-h-0 flex-1 flex-col justify-between gap-2 rounded-[10px] bg-[#111b2d] p-[10px] text-[#dfe7f6]"
                  aria-label="Media controls"
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-[11px]">
                    <span>00:41</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="35"
                      readOnly
                      className="w-full"
                    />
                    <span>03:20</span>
                  </div>

                  <div className="grid flex-1 grid-cols-3 items-stretch gap-[6px]">
                    <button
                      type="button"
                      className="inline-flex aspect-square h-auto w-[90%] max-h-full self-center justify-self-center items-center justify-center rounded-full border border-[#31425e] bg-[#1d2a40] text-[#cfdaf0]"
                      aria-label="Back 10 seconds"
                    >
                      <IconBack className="h-[44%] w-[44%]" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex aspect-square h-auto w-[90%] max-h-full self-center justify-self-center items-center justify-center rounded-full border border-[#2b5fd8] bg-[#2b5fd8] text-[#edf3ff]"
                      aria-label={isPlaying ? "Pause" : "Play"}
                      onClick={() => setIsPlaying((prev) => !prev)}
                    >
                      {isPlaying ? (
                        <IconPause className="h-[44%] w-[44%]" />
                      ) : (
                        <IconPlay className="h-[44%] w-[44%]" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex aspect-square h-auto w-[90%] max-h-full self-center justify-self-center items-center justify-center rounded-full border border-[#31425e] bg-[#1d2a40] text-[#cfdaf0]"
                      aria-label="Forward 10 seconds"
                    >
                      <IconForward className="h-[44%] w-[44%]" />
                    </button>
                  </div>

                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                    <span
                      className="flex items-center text-[#cfdaf0]"
                      aria-hidden="true"
                    >
                      <IconVolume className="h-[14px] w-[14px]" />
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      aria-label="Volume"
                      className="w-full"
                    />
                    <span className="min-w-[34px] text-right text-[11px] text-[#cfdaf0]">
                      {volume}%
                    </span>
                  </div>
                </div>
              )}

              <div
                className={`${cardClass} ${selectedSource ? "flex-none" : "flex-1 min-h-0"}`}
              >
                <p className={labelClass}>Media Source</p>

                {selectedSource ? (
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="m-0 text-[13px] font-bold">
                        {selectedSource.title}
                      </p>
                      <p className="mt-[2px] mb-0 text-[11px] text-[#54627d]">
                        {selectedSource.hostname}
                      </p>
                    </div>
                    {isHost && (
                      <button
                        type="button"
                        className="h-[31px] rounded-[7px] border border-[#c7d3e5] bg-[#e8eef8] px-3 text-[12px] font-bold text-[#2a3850]"
                        onClick={() => setSelectedSource(null)}
                      >
                        Unselect
                      </button>
                    )}
                  </div>
                ) : isHost ? (
                  <div className="min-h-0 flex-1 overflow-y-auto pr-[2px]">
                    <ul
                      className="m-0 flex list-none flex-col gap-[6px] p-0"
                      aria-label="Media source tabs"
                    >
                      {mediaSources.map((source) => (
                        <li key={source.tabId}>
                          <button
                            type="button"
                            className="flex w-full flex-col gap-[2px] rounded-[7px] border border-[#c6d1e2] bg-[#fdfefe] p-[7px] text-left"
                            onClick={() => setSelectedSource(source)}
                          >
                            <span className="text-[12px] font-bold text-[#0f172a]">
                              {source.title}
                            </span>
                            <span className="text-[11px] text-[#54627d]">
                              {source.hostname}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="m-0 text-[12px] text-[#54627d]">
                    Waiting for host to select a media source.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
}

