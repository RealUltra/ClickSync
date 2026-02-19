import { useEffect, useState } from "react";
import DisplayNameInput from "./DisplayNameInput";
import JoinPartyCard from "./JoinPartyCard";
import CreatePartyCard from "./CreatePartyCard";

function createParty() {
  chrome.runtime.sendMessage({ type: "CREATE_PARTY" });
}

function joinParty(partyCode: string) {
  chrome.runtime.sendMessage({ type: "JOIN_PARTY", partyCode });
}

const MenuScreen = () => {
  const [displayName, setDisplayName] = useState("Guest");

  useEffect(() => {
    if (!chrome.storage?.sync) return;

    chrome.storage.sync
      .get(["displayName"])
      .then((result: { displayName?: string }) => {
        setDisplayName(result.displayName ?? displayName);
      });
  }, []);

  useEffect(() => {
    if (!chrome.storage?.sync) return;
    chrome.storage.sync.set({ displayName });
  }, [displayName]);

  return (
    <section className="flex h-full min-h-0 flex-1 flex-col gap-3 p-3">
      <DisplayNameInput value={displayName} setDisplayName={setDisplayName} />

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <CreatePartyCard onCreateParty={createParty} />
        <JoinPartyCard onJoinParty={joinParty} />
      </div>
    </section>
  );
};

export default MenuScreen;
