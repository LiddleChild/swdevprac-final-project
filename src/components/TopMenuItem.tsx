import Link from "next/link";

type ItemProps = {
  icon?: string;
  title: string;
};

const Item = ({ icon, title }: ItemProps) => {
  return (
    <>
      <span
        className="material-symbols-outlined flex-shrink-0 text-center"
        style={{ fontSize: "48px", minWidth: "48px", textAlign: "center" }}
      >
        {icon}
      </span>
      <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2 whitespace-nowrap text-2xl">
        {title}
      </span>
    </>
  );
};

type TopMenuItemProps =
  | ItemProps &
      (
        | {
            pageRef: string;
            onClick?: never;
          }
        | {
            pageRef?: never;
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
          }
      );

export default function TopMenuItem({ icon, title, pageRef, onClick }: TopMenuItemProps) {
  if (pageRef)
    return (
      <Link
        href={pageRef}
        className="flex flex-row items-center justify-start gap-4 h-full w-full px-6 hover:bg- group"
      >
        <Item icon={icon} title={title} />
      </Link>
    );
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-start gap-4 h-full w-full px-6 hover:bg- group"
    >
      <Item icon={icon} title={title} />
    </button>
  );
}
