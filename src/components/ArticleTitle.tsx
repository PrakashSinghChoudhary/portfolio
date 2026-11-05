export interface ArticleTitleProps {
  title: string;
}

export default function ArticleTitle({ title }: ArticleTitleProps) {
  return (
    <h1 className="mt-5 max-w-[16ch] text-[34px] font-semibold leading-[0.95] tracking-[-0.04em] md:text-[48px] lg:text-[56px]">
      {title}
    </h1>
  );
}
