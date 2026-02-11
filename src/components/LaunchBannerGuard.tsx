"use client";

import { usePathname } from "next/navigation";
import { LaunchBanner } from "@/components/LaunchBanner";

export function LaunchBannerGuard() {
  const pathname = usePathname();

  // Hide banner in admin and all subroutes
  if (pathname.startsWith("/revtogo-admin")) {
    return null;
  }

  return <LaunchBanner />;
}
