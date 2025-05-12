"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Rocket, ShieldCheck } from "lucide-react";
import { InfoCard } from "./InfoCard";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart AI Detection",
    description: "Built for AI art enthusiasts",
    content:
      "Automatically detects and extracts prompts from popular AI art tools like Stable Diffusion, ComfyUI, Midjourney, and DALL-E. Works with or without the web UI running.",
  },
  {
    icon: Rocket,
    title: "Lightning Fast",
    description: "Results in milliseconds",
    content:
      "Get instant access to your image metadata with our optimized extraction engine. No waiting, no uploads needed - everything happens right on your device.",
  },
  {
    icon: ShieldCheck,
    title: "100% Private",
    description: "Your data stays local",
    content:
      "We process everything locally on your device. No cloud processing, no data collection, and no privacy concerns. Your images and prompts remain completely private.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function InfoSection() {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="font-bold tracking-tighter text-4xl sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our metadata reader the perfect tool for AI
            artists
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="h-full"
            >
              <InfoCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
