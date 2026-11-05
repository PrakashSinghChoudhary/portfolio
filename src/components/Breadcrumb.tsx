import Link from "next/link";
import LeftArrow from "./LeftArrow";
import { Fragment } from "react/jsx-runtime";

export interface BreadcrumbItem {
  link: string;
  text: string;
}

export interface BreadcrumbProps {
  data: BreadcrumbItem[];
}

export default function Breadcrumb({ data }: BreadcrumbProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.08em] text-(--text-3)">
        {data.map((d: BreadcrumbItem) =>
          d.link === "" ? (
            <Fragment key={d.link}>
              <span className="text-(--border-strong)">/</span>
              <span className="text-(--text-2)">{d.text}</span>
            </Fragment>
          ) : d.link === data[0].link ? (
            <Fragment key={d.link}>
              <Link href={d.link} className="group breadcrumb-links">
                <LeftArrow />
                {d.text}
              </Link>
            </Fragment>
          ) : (
            <Fragment key={d.link}>
              <span className="text-(--border-strong)">/</span>
              <Link href={d.link} className="group breadcrumb-links">
                {d.text}
              </Link>
            </Fragment>
          ),
        )}
      </div>
    </>
  );
}
