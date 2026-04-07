"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 hidden sm:block"
    >
      {/* Popover card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-18 right-0 w-72 rounded-2xl bg-card border border-border shadow-xl p-5 origin-bottom-right"
            role="dialog"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 size-7 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close"
            >
              <XMarkIcon className="size-4" />
            </button>

            {/* Content */}
            <div className="pr-6">
              <p className="font-semibold text-foreground text-sm mb-2">
                We&apos;d love to hear from you
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                Encountered a bug, having difficulties, or have ideas for
                improvements? Don&apos;t hesitate to reach out!
              </p>
            </div>

            <a
              href="mailto:contact@metadata-reader.com?subject=Feedback%20-%20Metadata%20Reader"
              className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <EnvelopeIcon className="size-4" />
              Send us an email
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <div className="relative">
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/30 pointer-events-none"
          animate={{ scale: [1, 1.25, 1.5], opacity: [0, 0.4, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.15, 1],
          }}
        />
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl cursor-pointer transition-shadow"
          aria-label="Contact us"
        >
          <ChatBubbleLeftEllipsisIcon className="size-6" />
        </motion.button>
      </div>
    </div>
  );
}
