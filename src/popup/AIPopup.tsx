import { useMemo, useState } from "react";
import "./AIPopup.css";

type Screen = "menu" | "join" | "party";
type Tab = "party" | "controls";

type Member = {
  id: string;
  name: string;
  joinedOrder: number;
  isHost?: boolean;
  isYou?: boolean;
};

type MediaSource = {
  id: number;
  title: string;
  domain: string;
};

const mockSources: MediaSource[] = [
  { id: 101, title: "YouTube - LoFi Mix", domain: "youtube.com" },
  { id: 102, title: "Netflix - Episode 4", domain: "netflix.com" },
  { id: 103, title: "Prime Video - Movie", domain: "amazon.com" },
  { id: 104, title: "Vimeo - Showcase Reel", domain: "vimeo.com" },
  { id: 105, title: "Twitch - Live Stream", domain: "twitch.tv" },
  { id: 106, title: "Hulu - Season 2", domain: "hulu.com" },
  { id: 107, title: "Disney+ - Pixar", domain: "disneyplus.com" },
  { id: 108, title: "Max - Documentary", domain: "max.com" },
  { id: 109, title: "Plex - Local Library", domain: "plex.tv" },
  { id: 110, title: "ESPN - Match Replay", domain: "espn.com" },
  { id: 111, title: "Coursera - Lecture", domain: "coursera.org" },
  { id: 112, title: "Udemy - Course Module", domain: "udemy.com" },
];

function makeCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="5" width="4" height="14" fill="currentColor" />
      <rect x="13" y="5" width="4" height="14" fill="currentColor" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.5 6.5 7 12l5.5 5.5 1.5-1.5-4-4 4-4zM17 6.5 11.5 12 17 17.5l1.5-1.5-4-4 4-4z" fill="currentColor" />
    </svg>
  );
}

function IconForward() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.5 6.5 17 12l-5.5 5.5-1.5-1.5 4-4-4-4zM7 6.5 12.5 12 7 17.5l-1.5-1.5 4-4-4-4z" fill="currentColor" />
    </svg>
  );
}

function IconVolume() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9zm12 3a4 4 0 0 0-2-3.5v7a4 4 0 0 0 2-3.5zm0-7.5v2.2a6.5 6.5 0 0 1 0 10.6v2.2a8.5 8.5 0 0 0 0-15z" fill="currentColor" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8 14 8l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2L10 8z" fill="currentColor" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.3 12.1a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm6 0a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" fill="currentColor" />
      <path d="M3.7 18.3c.2-2.4 2.4-4.2 5.6-4.2s5.4 1.8 5.6 4.2v.9H3.7Zm12.1.9c.1-1.8 1.6-3.2 4-3.2.2 0 .4 0 .5.1v3.1Z" fill="currentColor" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9.6 16.2-3.8-3.8-1.4 1.4 5.2 5.2L20 8.6l-1.4-1.4z" fill="currentColor" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 16.9 4.1 3.1 11-11.1L15 4.8zM3 21l4.8-1.3L4.3 17zM16.1 3.7l4.2 4.2 1-1a1.6 1.6 0 0 0 0-2.3L19.5 2.8a1.6 1.6 0 0 0-2.3 0z" fill="currentColor" />
    </svg>
  );
}

export default function AIPopup() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [tab, setTab] = useState<Tab>("party");

  const [isHost, setIsHost] = useState(false);
  const [partyCode, setPartyCode] = useState(makeCode);
  const [selectedSource, setSelectedSource] = useState<MediaSource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [displayName, setDisplayName] = useState("Guest");
  const [isDisplayNameLocked, setIsDisplayNameLocked] = useState(true);

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

  function createParty() {
    setIsHost(true);
    setPartyCode(makeCode());
    setSelectedSource(null);
    setIsPlaying(false);
    setVolume(70);
    setScreen("party");
    setTab("party");
  }

  function openJoin() {
    setIsHost(false);
    setScreen("join");
    setTab("party");
  }

  function joinParty() {
    setIsHost(false);
    setScreen("party");
    setTab("party");
  }

  return (
    <main className={`ai-popup ${screen === "menu" ? "ai-popup--menu" : ""}`} aria-label="ClickSync popup preview">
      <header className="ai-header">
        <h1>ClickSync</h1>
      </header>

      {screen === "menu" && (
        <section className="ai-screen ai-screen--grow ai-screen--menu" aria-label="Main menu">
          <div className="ai-card">
            <p className="ai-label">Display Name</p>
            <div className="ai-name-lock-row">
              <input
                className="ai-input"
                placeholder="Your name"
                value={displayName}
                disabled={isDisplayNameLocked}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <button
                type="button"
                className="ai-name-lock-btn"
                aria-label={isDisplayNameLocked ? "Edit display name" : "Lock display name"}
                onClick={() => setIsDisplayNameLocked((prev) => !prev)}
                disabled={!isDisplayNameLocked && displayName.trim().length === 0}
              >
                {isDisplayNameLocked ? <IconEdit /> : <IconCheck />}
              </button>
            </div>
          </div>

          <div className="ai-menu-stack">
            <button type="button" className="ai-menu-primary" onClick={createParty}>
              <span className="ai-menu-primary__label">Create Party</span>
              <span className="ai-menu-primary__icon" aria-hidden="true">
                <IconSpark />
              </span>
            </button>

            <button type="button" className="ai-menu-secondary-action" onClick={openJoin}>
              <span className="ai-menu-secondary-action__label">Join Party</span>
              <span className="ai-menu-secondary-action__icon" aria-hidden="true">
                <IconUsers />
              </span>
            </button>
          </div>
        </section>
      )}

      {screen === "join" && (
        <section className="ai-screen" aria-label="Join party screen">
          <button type="button" className="ai-link" onClick={() => setScreen("menu")}>
            Back
          </button>

          <div className="ai-card">
            <p className="ai-label">Party Code</p>
            <input className="ai-input" placeholder="Enter code" />
          </div>

          <button type="button" className="ai-btn" onClick={joinParty}>
            Join Party
          </button>
        </section>
      )}

      {screen === "party" && (
        <section
          className={`ai-screen ai-screen--grow ${tab === "controls" ? "ai-screen--controls-active" : ""}`}
          aria-label="Party room"
        >
          <div className="ai-tabs" role="tablist" aria-label="Party tabs">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "party"}
              className={`ai-tab ${tab === "party" ? "ai-tab--active" : ""}`}
              onClick={() => setTab("party")}
            >
              Party
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "controls"}
              className={`ai-tab ${tab === "controls" ? "ai-tab--active" : ""}`}
              onClick={() => setTab("controls")}
              disabled={!isHost && !controlsEnabled}
            >
              Controls
            </button>
          </div>

          {tab === "party" && (
            <>
              <div className="ai-card">
                <p className="ai-label">Party Code</p>
                <div className="ai-code-row">
                  <code className="ai-code">{partyCode}</code>
                  {isHost && (
                    <button
                      type="button"
                      className="ai-btn ai-btn--ghost"
                      onClick={() => setPartyCode(makeCode())}
                    >
                      Regenerate
                    </button>
                  )}
                </div>
              </div>

              <div className="ai-card ai-card--grow">
                <p className="ai-label">Members</p>
                <ul className="ai-members" aria-label="Members list">
                  {members
                    .slice()
                    .sort((a, b) => a.joinedOrder - b.joinedOrder)
                    .map((member) => (
                      <li
                        key={member.id}
                        className={`ai-member ${member.isHost ? "ai-member--host" : ""}`}
                      >
                        <span className="ai-member-name">{member.name}</span>
                        <div className="ai-member-tags">
                          {member.isHost && <span className="ai-tag">Leader</span>}
                          {member.isYou && <span className="ai-tag ai-tag--you">You</span>}
                          {isHost && !member.isYou && !member.isHost && (
                            <button type="button" className="ai-kick-btn">
                              Kick
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="ai-party-actions">
                <button
                  type="button"
                  className="ai-btn ai-btn--danger"
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
                <div className="ai-player ai-controls-player" aria-label="Media controls">
                  <div className="ai-progress-wrap">
                    <span>00:41</span>
                    <input type="range" min="0" max="100" value="35" readOnly />
                    <span>03:20</span>
                  </div>

                  <div className="ai-player-row">
                    <button type="button" className="ai-icon-btn" aria-label="Back 10 seconds">
                      <IconBack />
                    </button>
                    <button
                      type="button"
                      className="ai-icon-btn ai-icon-btn--primary"
                      aria-label={isPlaying ? "Pause" : "Play"}
                      onClick={() => setIsPlaying((prev) => !prev)}
                    >
                      {isPlaying ? <IconPause /> : <IconPlay />}
                    </button>
                    <button type="button" className="ai-icon-btn" aria-label="Forward 10 seconds">
                      <IconForward />
                    </button>
                  </div>

                  <div className="ai-volume-row">
                    <span className="ai-volume-icon" aria-hidden="true">
                      <IconVolume />
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      aria-label="Volume"
                    />
                    <span className="ai-volume-value">{volume}%</span>
                  </div>
                </div>
              )}

              <div className={`ai-card ${selectedSource ? "ai-controls-source" : "ai-card--grow"}`}>
                <p className="ai-label">Media Source</p>

                {selectedSource ? (
                  <div className="ai-source-status">
                    <div>
                      <p className="ai-source-title">{selectedSource.title}</p>
                      <p className="ai-source-domain">{selectedSource.domain}</p>
                    </div>
                    {isHost && (
                      <button type="button" className="ai-btn ai-btn--ghost" onClick={() => setSelectedSource(null)}>
                        Unselect
                      </button>
                    )}
                  </div>
                ) : isHost ? (
                  <div className="ai-source-scroll">
                    <ul className="ai-source-list" aria-label="Media source tabs">
                      {mockSources.map((source) => (
                        <li key={source.id}>
                          <button
                            type="button"
                            className="ai-source-item"
                            onClick={() => setSelectedSource(source)}
                          >
                            <span className="ai-source-item-title">{source.title}</span>
                            <span className="ai-source-item-domain">{source.domain}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="ai-empty">Waiting for host to select a media source.</p>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
}
