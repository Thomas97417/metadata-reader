"use client";

import ImageDetails from "@/components/ImageDetails";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MetadataPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="bg-background relative pt-16">
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 space-y-8"
        >
          {/* Details Section */}
          <div className="pb-16">
            <ImageDetails fileName={fileName} setFileName={setFileName} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
