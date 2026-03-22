"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Link from "next/link";

export function AboutLinkButton() {
  const { setTheme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="default"
        size="default"
        className="bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden group hover:cursor-pointer"
        asChild
      >
        <Link
          href="/about"
          className="w-full h-full flex items-center justify-center"
        >
          <span className="relative z-10 flex items-center gap-2">
            About
            <InformationCircleIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </Button>
    </motion.div>
  );
}
