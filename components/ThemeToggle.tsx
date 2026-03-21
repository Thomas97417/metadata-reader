"use client";

import { cn } from "@/lib/utils";
import { Moon, Settings2, Sun } from "lucide-react";
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
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden hover:cursor-pointer text-primary hover:text-primary/80 dark:hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/10 border-primary hover:border-primary/80 dark:hover:border-primary/80 border-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
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
              {themeOption === "light" && <Sun className="h-4 w-4" />}
              {themeOption === "dark" && <Moon className="h-4 w-4" />}
              {themeOption === "system" && <Settings2 className="h-4 w-4" />}
            </span>
            {themeOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
