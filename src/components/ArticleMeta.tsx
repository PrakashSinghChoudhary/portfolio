export interface ArticleMetaProps {
  date: string;
  text: string;
  timeToRead: string;
}
export default function ArticleMeta({
  date,
  text,
  timeToRead,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
      <span className="text-(--text-3) tracking-[0.08em]">{date}</span>
      <span className="h-3 w-px bg-(--border-strong)" />
      <span className="inline-flex h-5 items-center rounded-sm border bg-(--bg) px-2 text-[10px] font-medium tracking-[0.08em] text-(--text-2) border-(--border)">
        {text}
      </span>
      <span className="h-3 w-px bg-(--border-strong)" />
      <span className="text-(--text-3)">{timeToRead}</span>
    </div>
  );
}
