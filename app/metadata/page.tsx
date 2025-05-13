"use client";

import ImageDetails from "@/components/ImageDetails";
import { motion } from "framer-motion";

export default function MetadataPage() {
  return (
    <div className="bg-background relative pt-16">
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 space-y-8"
        >
          {/* Details Section */}
          <div className="pb-16">
            <ImageDetails />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
