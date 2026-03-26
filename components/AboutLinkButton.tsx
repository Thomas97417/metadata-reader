"use client";

import { Button } from "@/components/ui/button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function AboutLinkButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:cursor-pointer text-muted-foreground hover:text-foreground hover:bg-primary/15"
      asChild
    >
      <Link href="/about">
        <InformationCircleIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">About</span>
      </Link>
    </Button>
  );
}
