import { ReactNode } from "react";

export interface ChecklistProps {
  heading: string;
  list: ReactNode[] | string[];
}

export default function NumberedList({ heading, list }: ChecklistProps) {
  return (
    <>
      <p className="mt-5 text-[16px] leading-[1.75] text-(--text-2)">
        {heading}
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-[1.7] text-(--text-2) marker:text-(--text-3) marker:font-mono marker:text-[12px]">
        {list.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ol>
    </>
  );
}
