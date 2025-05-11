"use client";

import { motion } from "framer-motion";
import { FileCode, Image, Sparkles } from "lucide-react";
import TryLinkButton from "./TryLinkButton";

const Hero = () => {
  return (
    <div className="relative flex flex-col justify-center items-center py-24 lg:py-32 xl:py-40 2xl:py-48 min-h-[80vh] bg-gradient-to-b from-background to-background/80 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col justify-center space-y-6 max-w-4xl px-4 text-center z-10"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bold tracking-tighter text-5xl sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]"
          >
            Unveil AI Image Secrets
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Unlock hidden details in your AI-generated images. This free
              metadata reader extracts prompts and generation info.
            </p>
            <div className="flex justify-center gap-8 text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                <span>AI Image Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                <span>Prompt Extraction</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center pt-6"
        >
          <TryLinkButton />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
