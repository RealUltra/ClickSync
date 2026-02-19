import { IconSpark } from "./icons";

type CreatePartyCardProps = {
  onCreateParty?: () => void;
};

const CreatePartyCard = ({ onCreateParty }: CreatePartyCardProps) => {
  return (
    <button
      type="button"
      className="flex min-h-0 flex-1 basis-0 w-full flex-col items-center justify-center gap-3 rounded-[12px] border border-[#c6d1e2] bg-[#fdfefe] p-3 text-center text-[#0f172a]"
      onClick={() => onCreateParty?.()}
    >
      <span className="text-base leading-[1.1] font-bold">Create Party</span>
      <span
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[#e6edf8] text-[#33455f]"
        aria-hidden="true"
      >
        <IconSpark className="h-4 w-4" />
      </span>
    </button>
  );
};

export default CreatePartyCard;
