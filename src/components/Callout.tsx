import { Callout as CalloutType } from "@/types/Callout";

export interface CalloutProps {
  data: CalloutType[];
}

export default function Callout({ data }: CalloutProps) {
  return (
    <div className="mt-6 grid gap-3">
      {data.map((row) => (
        <div
          key={row.k}
          className="flex gap-4 rounded-[10px] border px-4 py-3"
          style={{
            borderColor: row.bad ? "var(--border)" : "var(--text)",
            background: row.bad ? "var(--bg)" : "var(--bg-2)",
          }}
        >
          <span
            className={`mt-0.5 inline-flex h-5 shrink-0 items-center rounded-full border px-2 text-[10px] font-mono tracking-[0.08em] ${row.bad ? "border-[#e7a0a0] bg-[#fff3f3] text-[#9a4a4a]" : "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"}`}
          >
            {row.title}
          </span>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.08em]">
              {row.k}
            </div>
            <div className="mt-1 text-[13px] leading-normal text-(--text-2)">
              {row.d}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
