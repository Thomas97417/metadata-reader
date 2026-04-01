"use client";

import { cn } from "@/lib/utils";
import { Cog6ToothIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        disabled
      >
        <span className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const Icon =
    theme === "system"
      ? Cog6ToothIcon
      : resolvedTheme === "dark"
        ? MoonIcon
        : SunIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/15 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Icon className="h-[1.2rem] w-[1.2rem]" />
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
