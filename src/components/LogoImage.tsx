"use client";

import { useState } from "react";

interface Props {
  className?: string;
  fallbackClass?: string;
  priority?: boolean;
}

export default function LogoImage({
  className = "",
  fallbackClass = "text-2xl",
  priority = false,
}: Props) {
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
      loading={priority ? "eager" : "lazy"}
      // @ts-expect-error fetchpriority is valid HTML but not yet in React types
      fetchpriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      onError={() => setFailed(true)}
    />
  );
}
