export interface CodeBlockProps {
  filename: string;
  code: string;
  highlight?: number[];
  langLabel?: string;
  className?: string;
}

export default function CodeBlock({
  filename,
  code,
  highlight,
  langLabel,
  className = "my-8",
}: CodeBlockProps) {
  const lines = code.trimEnd().split("\n");

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-(--code-bg) border-(--code-border) ${className}`}
    >
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

const TOKEN_REGEX =
  /(\/\/[^\n]*|#[^\n]*)|('(?:\\.|[^'])*'|"(?:\\.|[^"])*"|`(?:\\.|[^`])*`)|(@\w+)|(\b(?:import|export|from|as|class|interface|type|extends|implements|new|this|super|private|public|protected|static|readonly|constructor|override|abstract|const|let|var|function|return|if|else|switch|case|default|break|continue|try|catch|finally|throw|async|await|typeof|instanceof|keyof|in|http|upstream|server|listen|server_name|location|proxy_pass|proxy_set_header|proxy_http_version|ssl_certificate|ssl_certificate_key|keepalive|weight|max_fails|fail_timeout|backup)\b)|(\b(?:string|number|boolean|void|any|unknown|never|null|undefined|Promise|Record|Array|Map|Set|Date|Object|Function)\b)|(\b(?:true|false)\b|\b\d+(?:\.\d+)?\b)|(\b[A-Z][a-zA-Z0-9_]*\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|([{}()\[\];,.:?])|([=<>!&|+*\/%-]+)|(\s+)|([^\s]+)/g;

function renderLine(line: string) {
  if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
    return <span className="text-[#6e7681] italic">{line}</span>;
  }

  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  const elements: React.ReactNode[] = [];
  let key = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [
      full,
      comment,
      str,
      decorator,
      keyword,
      builtinType,
      literal,
      customType,
      fnCall,
      ,
      punct,
      op,
      space,
    ] = match;

    if (space) {
      elements.push(<span key={key++}>{full}</span>);
    } else if (comment) {
      elements.push(
        <span key={key++} className="text-[#6e7681] italic">
          {full}
        </span>,
      );
    } else if (str) {
      elements.push(
        <span key={key++} className="text-[#c2d94c]">
          {full}
        </span>,
      );
    } else if (decorator) {
      elements.push(
        <span key={key++} className="text-[#d2a8ff]">
          {full}
        </span>,
      );
    } else if (keyword) {
      elements.push(
        <span key={key++} className="text-[#ff7b72]">
          {full}
        </span>,
      );
    } else if (builtinType || customType) {
      elements.push(
        <span key={key++} className="text-[#79c0ff]">
          {full}
        </span>,
      );
    } else if (literal) {
      elements.push(
        <span key={key++} className="text-[#ffab70]">
          {full}
        </span>,
      );
    } else if (fnCall) {
      elements.push(
        <span key={key++} className="text-[#d2a8ff]">
          {full}
        </span>,
      );
    } else if (punct || op) {
      elements.push(
        <span key={key++} className="text-[#7d8590]">
          {full}
        </span>,
      );
    } else {
      elements.push(
        <span key={key++} className="text-[#e6edf3]">
          {full}
        </span>,
      );
    }
  }

  return <span>{elements}</span>;
}
