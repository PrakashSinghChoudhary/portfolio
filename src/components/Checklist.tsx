export interface ChecklistProps {
  list: string[];
}

export default function Checklist({ list }: ChecklistProps) {
  return (
    <div className={`mt-4 rounded-xl border bg-(--bg) p-5 border-(--border)`}>
      <ul className="space-y-3 text-[14px] leading-[1.6] text-(--text-2)">
        {list.map((t: string, i: number) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full border border-(--border-strong)" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
