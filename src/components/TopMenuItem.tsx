import Link from "next/link";

type TopMenuItemProps = {
  title: string;
  icon?: string;
  pageRef: string;
};

export default function TopMenuItem({
  title,
  icon,
  pageRef,
}: TopMenuItemProps) {
  return (
    <Link
      href={pageRef}
      className="flex flex-row items-center justify-start gap-4 h-full w-full px-6 hover:bg-[#009078] group"
    >
      <span
        className="material-symbols-outlined flex-shrink-0 text-center"
        style={{ fontSize: "48px", minWidth: "48px", textAlign: "center" }}
      >
        {icon}
      </span>
      <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2 whitespace-nowrap text-2xl">
        {title}
      </span>
    </Link>
  );
}
