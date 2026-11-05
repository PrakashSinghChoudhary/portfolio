import { TableOfContent } from "@/types/TableOfContent";

export default function Pointer({ id, num, label }: TableOfContent) {
  return (
    <>
      <h2
        id={id}
        className="scroll-mt-24 mt-14 flex items-baseline gap-3 border-t pt-10 text-[26px] font-semibold tracking-[-0.03em] md:text-[30px] border-(--border)"
      >
        <span className="font-mono text-[12px] tracking-[0.12em] text-(--text-3)">
          {num}
        </span>
        {label}
      </h2>
    </>
  );
}
