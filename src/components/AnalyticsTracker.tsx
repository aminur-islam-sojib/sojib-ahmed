"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track if path has changed to avoid duplicate calls
    if (pathname && lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;

      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathname,
            referrer: typeof document !== "undefined" ? document.referrer || "Direct" : "Direct",
          }),
        }).catch((err) => {
          // Silently handle tracking errors
          console.debug("Tracking error:", err);
        });
      } catch (err) {
        console.debug("Tracking error:", err);
      }
    }
  }, [pathname]);

  return null;
}
