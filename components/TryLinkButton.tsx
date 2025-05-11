"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const TryLinkButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg relative overflow-hidden group hover:cursor-pointer"
        asChild
      >
        <Link href="/metadata">
          <span className="relative z-10 flex items-center gap-2">
            Try Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default TryLinkButton;
