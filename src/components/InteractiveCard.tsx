"use client";

type InteractiveCardProps = {
  children: React.ReactNode;
};

export default function InteractiveCard({ children }: InteractiveCardProps) {
  return (
    <div className="shadow-lg bg-white rounded-lg hover:shadow-2xl hover:bg-neutral-200">
      {children}
    </div>
  );
}
