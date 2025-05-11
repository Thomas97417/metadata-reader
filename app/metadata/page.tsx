"use client";

import ImageDetails from "@/components/ImageDetails";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MetadataPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="bg-background relative pt-16">
      {/* Decorative background elements */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 left-0 w-1/2 h-1/2 bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 space-y-8"
        >
          {/* Upload Section */}
          {/* <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm">
            <ImageUploader setFileName={setFileName} />
          </div> */}

          {/* Details Section */}
          <div className="pb-16">
            <ImageDetails fileName={fileName} setFileName={setFileName} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
