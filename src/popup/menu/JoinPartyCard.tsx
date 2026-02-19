import { useState } from "react";
import { IconArrowRight, IconUsers } from "./icons";
import { buttonClass, inputClass } from "./styles";

type JoinPartyCardProps = {
  onJoinParty?: (partyCode: string) => void;
};

const JoinPartyCard = ({ onJoinParty }: JoinPartyCardProps) => {
  const [partyCode, setPartyCode] = useState("");

  return (
    <div className="flex min-h-0 flex-1 basis-0 w-full flex-col items-center justify-center gap-[14px] rounded-[12px] border border-[#c6d1e2] bg-[#fdfefe] p-3 text-center text-[#0f172a]">
      <span className="text-base leading-[1.08] font-bold">Join Party</span>

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
          value={partyCode}
          onChange={(e) => setPartyCode(e.target.value.toUpperCase())}
        />
        <button
          type="button"
          className={`${buttonClass} col-[6] inline-flex h-[31px] w-[31px] items-center justify-center p-0`}
          aria-label="Join party"
          onClick={() => onJoinParty?.(partyCode)}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export default JoinPartyCard;
