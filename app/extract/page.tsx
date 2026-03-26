"use client";

import ImageDetails from "@/components/ImageDetails";
import { motion } from "framer-motion";

export default function ExtractPage() {
  return (
    <div className="bg-background relative">
      <div className="relative z-10 container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4"
        >
          <ImageDetails />
        </motion.div>
      </div>
    </div>
  );
}
