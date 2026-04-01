"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./button";

const CleanLinkButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        size="lg"
        className="bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 relative overflow-hidden group hover:cursor-pointer tracking-tight transition-shadow duration-300"
        asChild
      >
        <Link href="/clean">
          <span className="relative z-10 flex items-center gap-2">
            Clean Now
            <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default CleanLinkButton;
