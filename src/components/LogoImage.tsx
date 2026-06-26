"use client";

import { useState } from "react";

interface Props {
  className?: string;
  fallbackClass?: string;
}

export default function LogoImage({ className = "", fallbackClass = "text-2xl" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`flex items-center justify-center text-gold font-bold ${fallbackClass}`}>
        س
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/saray-mill-logo.png"
      alt="Saray Mill"
      className={`w-full h-full object-cover ${className}`}
      onError={(e) => {
        console.error("Logo failed to load:", (e.target as HTMLImageElement).src);
        setFailed(true);
      }}
      onLoad={(e) => {
        console.log("Logo loaded successfully:", (e.target as HTMLImageElement).src);
      }}
    />
  );
}
