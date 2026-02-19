import { useEffect, useState } from "react";
import { IconCheck, IconEdit } from "./icons";
import { cardClass, inputClass, labelClass } from "./styles";

type DisplayNameInputProps = {
  value?: string;
  setDisplayName?: (value: string) => void;
};

const DisplayNameInput = ({
  value = "Guest",
  setDisplayName,
}: DisplayNameInputProps) => {
  const [isDisplayNameLocked, setIsDisplayNameLocked] = useState(true);
  const [draftDisplayName, setDraftDisplayName] = useState(value);

  useEffect(() => {
    if (isDisplayNameLocked) {
      setDraftDisplayName(value);
    }
  }, [value, isDisplayNameLocked]);

  const lockAndCommit = () => {
    const trimmedName = draftDisplayName.trim();
    if (!trimmedName) {
      return;
    }

    setDisplayName?.(trimmedName);
    setDraftDisplayName(trimmedName);
    setIsDisplayNameLocked(true);
  };

  return (
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
          value={draftDisplayName}
          disabled={isDisplayNameLocked}
          onChange={(e) => {
            setDraftDisplayName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisplayNameLocked) {
              e.preventDefault();
              lockAndCommit();
            }
          }}
        />
        <button
          type="button"
          className="inline-flex h-[31px] w-[31px] items-center justify-center rounded-[7px] border border-[#c1cee2] bg-[#e7eefb] text-[#2f456a] disabled:opacity-50"
          aria-label={
            isDisplayNameLocked ? "Edit display name" : "Lock display name"
          }
          onClick={() => {
            if (isDisplayNameLocked) {
              setIsDisplayNameLocked(false);
              return;
            }

            lockAndCommit();
          }}
          disabled={!isDisplayNameLocked && draftDisplayName.trim().length === 0}
        >
          {isDisplayNameLocked ? (
            <IconEdit className="h-[14px] w-[14px]" />
          ) : (
            <IconCheck className="h-[14px] w-[14px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DisplayNameInput;
