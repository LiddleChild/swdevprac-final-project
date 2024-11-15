import Link from "next/link";

type TopMenuItemProps = {
  title: string;
  icon?: string;
  pageRef: string;
};

export default function TopMenuItem({ title, icon, pageRef }: TopMenuItemProps) {
  return (
    <Link
      href={pageRef}
      className="flex flex-row items-center justify-center gap-1 h-full px-6 hover:bg-gray-200 whitespace-nowrap"
    >
      {title}
      {!!icon && <span className="material-symbols-outlined"> {icon} </span>}
    </Link>
  );
}
