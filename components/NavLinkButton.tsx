"use client";

import { Button } from "@/components/ui/button";
import {
  RectangleGroupIcon,
  PhotoIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavLink {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const allLinks: NavLink[] = [
  { href: "/", icon: RectangleGroupIcon, label: "Home" },
  { href: "/extract", icon: PhotoIcon, label: "Extract" },
  { href: "/clean", icon: ArchiveBoxXMarkIcon, label: "Clean" },
];

export function NavLinkButton() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-1">
        {allLinks.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/15"
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
