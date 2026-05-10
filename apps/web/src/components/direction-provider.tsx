"use client";

import { DirectionProvider } from "@workspace/ui/components/direction";
import { createContext, useContext, useEffect, useState } from "react";

type Direction = "ltr" | "rtl";

const DirectionContext = createContext<{
  direction: Direction;
  setDirection: (dir: Direction) => void;
}>({ direction: "ltr", setDirection: () => {} });

export function useDir() {
  return useContext(DirectionContext);
}

export function AppDirectionProvider({
  children,
  defaultDirection = "ltr",
}: {
  children: React.ReactNode;
  defaultDirection?: Direction;
}) {
  const [direction, setDirection] = useState<Direction>(defaultDirection);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = direction === "rtl" ? "ar" : "en";
  }, [direction]);

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      <DirectionProvider direction={direction}>{children}</DirectionProvider>
    </DirectionContext.Provider>
  );
}
