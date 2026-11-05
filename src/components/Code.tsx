export interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  return (
    <code className="rounded bg-(--bg) px-1 py-0.5 font-mono text-[11px] border border-(--border)">
      {code}
    </code>
  );
}
