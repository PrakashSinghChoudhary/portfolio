export interface AuthorProps {
  name?: string;
  description?: string;
  date: string;
}

export default function Author({
  name = "Prakash Choudhary",
  description = "Software Engineer • Writing about JS, Backend and System Design",
  date,
}: AuthorProps) {
  return (
    <div className="mt-8 flex items-center gap-4 border-t pt-6 border-(--border)">
      <div className="h-9 w-9 rounded-full border bg-(--bg-2) flex items-center justify-center font-mono text-[12px] font-semibold border-(--border)">
        PC
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] font-[550] tracking-[-0.01em]">
          {name}
        </span>
        <span className="text-[11px] font-mono text-(--text-3)">
          {description}
        </span>
      </div>
      <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] font-mono text-(--text-3)">
        <span className="h-px w-8 bg-(--border-strong)" />
        UPDATED {date}
      </div>
    </div>
  );
}
