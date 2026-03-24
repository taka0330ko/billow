import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CTAButton({ children, className }: Props) {
  return (
    <span
      className={`group shadow-md hover:shadow-lg  bg-black relative max-w-50 inline-flex justify-center items-center overflow-hidden px-4 py-3 2 h-full w-full rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40  ${className ?? ""}`}
    >
        <span className="orb orb-1"></span>
        <span className="orb orb-2"></span>
      <span className="relative z-10 text-white transition-colors duration-200 group-hover:text-(--blue-100)">{children}</span>
    </span>
  );
}
