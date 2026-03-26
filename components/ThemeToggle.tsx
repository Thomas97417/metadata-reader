"use client";

import { cn } from "@/lib/utils";
import { Cog6ToothIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/15"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["light", "dark", "system"].map((themeOption) => (
          <DropdownMenuItem
            key={themeOption}
            onClick={() => setTheme(themeOption)}
            className={cn(
              "hover:bg-background hover:text-primary text-sm capitalize",
              "transition-colors duration-200",
              "flex items-center gap-2",
            )}
          >
            <span>
              {themeOption === "light" && <SunIcon className="h-4 w-4" />}
              {themeOption === "dark" && <MoonIcon className="h-4 w-4" />}
              {themeOption === "system" && (
                <Cog6ToothIcon className="h-4 w-4" />
              )}
            </span>
            {themeOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
