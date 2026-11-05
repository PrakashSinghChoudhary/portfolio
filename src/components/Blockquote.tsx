export interface BlockquoteProps {
  name: string;
  content: string;
}

export default function Blockquote({ name, content }: BlockquoteProps) {
  return (
    <blockquote className="mt-8 border-l-2 pl-5 py-1 border-(--border-strong)">
      <p className="text-[18px] leading-[1.6] tracking-[-0.01em] text-(--text) font-medium">
        {content}
      </p>
      <footer className="mt-2 text-[11px] font-mono tracking-[0.08em] text-(--text-3)">
        {name}
      </footer>
    </blockquote>
  );
}
