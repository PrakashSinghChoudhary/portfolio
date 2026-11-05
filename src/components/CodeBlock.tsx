export interface CodeBlockProps {
  filename: string;
  code: string;
  highlight?: number[];
  langLabel?: string;
}

export default function CodeBlock({
  filename,
  code,
  highlight,
  langLabel,
}: CodeBlockProps) {
  const lines = code.trimEnd().split("\n");

  return (
    <div className="relative overflow-hidden rounded-xl border my-8 bg-(--code-bg) border-(--code-border)">
      <div className="flex items-center justify-between border-b px-4 py-2.5 border-(--code-border)">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.25 w-2.25 rounded-full bg-[#2a2a2a]" />
            <span className="h-2.25 w-2.25 rounded-full bg-[#2a2a2a]" />
            <span className="h-2.25 w-2.25 rounded-full bg-[#2a2a2a]" />
          </div>
          <span className="ml-2 text-[11px] font-mono tracking-[0.04em] text-[#8a8a8a]">
            {filename}
          </span>
          {langLabel && (
            <span className="rounded bg-[#1d1d1d] px-1.5 py-0.5 text-[10px] font-mono tracking-[0.06em] text-[#6a6a6a]">
              {langLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[10px] font-mono text-[#4a4a4a]">
            UTF-8 • {lines.length} LOC
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[44px_1fr] text-[13px] leading-[1.85]">
        <div className="select-none border-r py-4 text-right pr-3 font-mono text-[11px] text-[#3a3a3a] leading-[1.85] border-(--code-border)">
          {lines.map((_, i) => (
            <div
              key={i}
              className={
                highlight?.includes(i + 1)
                  ? "text-[#c2d94c] bg-[#c2d94c]/10 -mr-3 pr-3"
                  : ""
              }
            >
              {i + 1}
            </div>
          ))}
        </div>
        <pre className="overflow-x-auto py-4 pl-4 pr-6 font-mono text-[#c8c8c8]">
          <code>
            {lines.map((line, idx) => {
              const n = idx + 1;
              const isH = highlight?.includes(n);
              return (
                <div
                  key={n}
                  className={
                    isH
                      ? "bg-[#c2d94c]/[0.07] -ml-4 pl-4 border-l-2 border-[#c2d94c]/60"
                      : ""
                  }
                >
                  {renderLine(line)}
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}

function renderLine(line: string) {
  if (line.trim().startsWith("//")) {
    return <span className="text-[#5a5a5a]">{line}</span>;
  }
  return (
    <span>
      {line
        .replace(/('.*?'|".*?"|`.*?`)/g, "§$1§")
        .split("§")
        .map((part, i) => {
          if (i % 2 === 1) {
            return (
              <span key={i} className="text-[#c2d94c]/80">
                {part}
              </span>
            );
          }
          return (
            <span key={i}>
              {part
                .split(
                  /(\b(?:import|export|const|let|function|return|if|else|useEffect|useState|useMemo|useRef|type|interface|extends|from|as|async|await)\b)/g,
                )
                .map((p, j) =>
                  /\b(import|export|const|let|function|return|if|else|useEffect|useState|useMemo|useRef|type|interface|extends|from|as|async|await)\b/.test(
                    p,
                  ) ? (
                    <span key={j} className="text-[#8a8a8a]">
                      {p}
                    </span>
                  ) : p.match(/[<>{}()\[\];=:]/) ? (
                    <span key={j} className="text-[#5e5e5e]">
                      {p}
                    </span>
                  ) : (
                    p
                  ),
                )}
            </span>
          );
        })}
    </span>
  );
}
