import { TableOfContent } from "@/types/TableOfContent";

export interface ArticleAsideProps {
  tableOfContent: TableOfContent[];
  tags: string[];
}
export default function ArticleAside({
  tableOfContent,
  tags,
}: ArticleAsideProps) {
  return (
    <div className="col-span-12 lg:col-span-4 lg:pl-12 mt-8 lg:mt-2">
      <div className="rounded-xl border bg-(--bg-2) p-4 border-(--border)">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-(--text-3)">
            IN THIS ARTICLE
          </span>
          <span className="text-[10px] font-mono text-(--text-3)">
            {tableOfContent.length} SECTIONS
          </span>
        </div>
        <div className="mt-3 space-y-2.5 text-[12px] leading-[1.4] text-(--text-2)">
          {tableOfContent.map((t: TableOfContent) => (
            <div className="flex gap-2" key={t.id}>
              <span className="text-(--text-3)">→</span> {t.label}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-1 text-[10px] font-mono tracking-[0.06em] text-(--text-2) border-(--border)"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
