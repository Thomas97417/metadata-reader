"use client";

import { Button } from "@/components/ui/button";
import { RectangleGroupIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinkButton() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/15"
      asChild
    >
      <Link href={isHome ? "/extract" : "/"}>
        {isHome ? (
          <PhotoIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <RectangleGroupIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">{isHome ? "Extract" : "About"}</span>
      </Link>
    </Button>
  );
}
