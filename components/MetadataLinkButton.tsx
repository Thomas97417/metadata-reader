"use client";

import { FileTerminal } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MetadataLinkButton() {
  const { setTheme } = useTheme();

  return (
    <Link href="/metadata">
      <Button variant="outline" size="icon">
        <FileTerminal className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    </Link>
  );
}
