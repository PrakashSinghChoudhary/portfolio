import { ReactNode } from "react";

export interface BulletListProps {
  title: string;
  list: ReactNode[] | string[];
}
export default function BulletList({ title, list }: BulletListProps) {
  return (
    <>
      <h3 className="mt-8 text-[18px] font-semibold tracking-[-0.02em]">
        {title}
      </h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-(--text-2) marker:text-(--text-3)">
        {list.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </>
  );
}
