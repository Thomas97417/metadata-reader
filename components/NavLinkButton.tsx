"use client";

import { Button } from "@/components/ui/button";
import {
  RectangleGroupIcon,
  PhotoIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/clean", icon: SparklesIcon, label: "Clean" },
];

export function NavLinkButton() {
  const pathname = usePathname();

  const links = allLinks.filter((link) => link.href !== pathname);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-1">
        {links.map((link) => (
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
