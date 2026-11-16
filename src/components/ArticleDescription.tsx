import Reveal from "./Reveal";

export interface ArticleDescriptionProps {
  content: string;
}

export default function ArticleDescription({
  content,
}: ArticleDescriptionProps) {
  return (
    <Reveal delay={180}>
      <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.55] tracking-[-0.01em] text-(--text-2) md:text-[19px]">
        {content}
      </p>
    </Reveal>
  );
}
