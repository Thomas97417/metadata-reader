"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ImageContextProvider } from "@/context/image-context";
import { CleanContextProvider } from "@/context/clean-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ImageContextProvider>
        <CleanContextProvider>{children}</CleanContextProvider>
      </ImageContextProvider>
    </ThemeProvider>
  );
};
