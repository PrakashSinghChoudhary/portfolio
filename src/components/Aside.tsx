import { TableOfContent } from "@/types/TableOfContent";

export interface AsideProps {
  tableOfContent: TableOfContent[];
  activeId: string;
  setActiveId: (id: string) => void;
}
export default function Aside({
  tableOfContent,
  activeId,
  setActiveId,
}: AsideProps) {
  return (
    <aside className="col-span-12 lg:col-span-4 lg:pl-10 pb-12 lg:pb-0 order-first lg:order-last">
      <div className="lg:sticky lg:top-21 border-b lg:border-b-0 pb-6 lg:pb-0 border-(--border)">
        <div className="hidden lg:block">
          <h4 className="text-[11px] font-semibold tracking-[0.12em] text-(--text-3) mt-4">
            ON THIS PAGE
          </h4>
          <nav className="mt-4 space-y-1 border-l pl-4 border-(--border)">
            {tableOfContent.map((item) => {
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setActiveId(item.id);
                  }}
                  className={`group flex items-center gap-3 py-1.5 text-[13px] leading-[1.4] transition-colors ${active ? "text-(--text) font-medium" : "text-(--text-3) hover:text-(--text-2)"}`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-[0.08em] ${active ? "text-(--text)" : "text-(--text-3)"}`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`${active ? "underline decoration-(--border-strong) underline-offset-4" : ""}`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="ml-auto h-1 w-1 rounded-full bg-(--text)" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-8">
            <div className="text-[11px] font-mono tracking-[0.08em] text-(--text-3)">
              PROGRESS
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-(--bg-2)">
              <div
                className="h-full bg-(--text) transition-all"
                style={{
                  width: `${((tableOfContent.findIndex((t) => t.id === activeId) + 1) / tableOfContent.length) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1.5 text-[10px] font-mono text-(--text-3)">
              {tableOfContent.findIndex((t) => t.id === activeId) + 1} /{" "}
              {tableOfContent.length}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {tableOfContent.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(t.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-mono tracking-[0.06em] ${
                  activeId === t.id
                    ? "bg-(--text) text-(--bg) border-(--text)"
                    : "bg-(--bg) text-(--text-3) border-(--border)"
                }`}
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
