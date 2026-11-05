import Code from "./Code";

export interface NoteProps {
  note: string;
}

export default function Note({ note }: NoteProps) {
  return (
    <div className="mt-8 rounded-[10px] border border-l-[3px] border-(--border) border-l-(--text) bg-(--bg-2) px-4 py-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em]">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-(--text) text-[10px] text-(--bg)">
          !
        </span>
        NOTE • RULE OF THUMB
      </div>
      <p className="mt-2 text-[13px] leading-[1.6] text-(--text-2)">{note}</p>
    </div>
  );
}
