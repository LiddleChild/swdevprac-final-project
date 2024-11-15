"use client";

type InteractiveCardProps = {
  children: React.ReactNode;
};

export default function InteractiveCard({ children }: InteractiveCardProps) {
  const onCardMouseAction = (event: React.SyntheticEvent) => {
    const defaultClass = ["shadow-lg", "bg-white", "rounded-lg"];
    const hoveringClass = ["shadow-2xl", "rounded-lg", "bg-neutral-200"];

    if (event.type === "mouseover") {
      event.currentTarget.classList.remove(...defaultClass);
      event.currentTarget.classList.add(...hoveringClass);
    } else {
      event.currentTarget.classList.add(...defaultClass);
      event.currentTarget.classList.remove(...hoveringClass);
    }
  };

  return (
    <div
      className="shadow-lg bg-white rounded-lg"
      onMouseOver={onCardMouseAction}
      onMouseOut={onCardMouseAction}
    >
      {children}
    </div>
  );
}
