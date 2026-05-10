"use client";

import { Button } from "@workspace/ui/components/button";
import { useDir } from "@/components/direction-provider";

export function DirectionToggle() {
  const { direction, setDirection } = useDir();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setDirection(direction === "ltr" ? "rtl" : "ltr")}
      aria-label="Toggle text direction"
    >
      {direction === "ltr" ? "العربية" : "English"}
    </Button>
  );
}
