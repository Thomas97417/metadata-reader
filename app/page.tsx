"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import TryLinkButton from "@/components/ui/buttons/try-link-button";
import CleanLinkButton from "@/components/ui/buttons/clean-link-button";
import { steps, supportedTools, benefits, cleanSteps } from "@/data/homeData";

/* ── Page ───────────────────────────────────────────────────────── */

export default function Page() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex flex-col justify-center items-center py-20 lg:py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-bold tracking-tighter text-5xl sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-6"
            >
              Understand your
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                AI images
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl mb-10"
            >
              A private, browser-based tool that extracts prompts, models, and
              generation parameters from any AI-generated image.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <TryLinkButton />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>No data ever leaves your browser</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Three simple steps to uncover the story behind your images.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-12 lg:space-y-20">
              {steps.map((step, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    {/* Illustration */}
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <step.Illustration />
                    </div>

                    {/* Text */}
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <span className="text-5xl font-bold text-primary/25 leading-none">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Built for AI Artists (merged section) ────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30">
                Built for AI Artists
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI image generators embed hidden metadata inside every image —
                prompts, models, seeds, and full generation settings. Extracting
                this data lets you reproduce results, learn from other artists,
                and understand exactly how an image was created. We support the
                most popular tools.
              </p>
            </motion.div>

            {/* Compatibility grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
            >
              {supportedTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`relative flex gap-4 p-5 sm:p-6 rounded-2xl border bg-card transition-colors ${
                    tool.comingSoon
                      ? "border-border/30 opacity-60"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  {tool.comingSoon && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Soon
                    </span>
                  )}
                  <div
                    className={`p-2.5 rounded-xl h-fit shrink-0 ${
                      tool.comingSoon
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <span
                      className={`text-sm font-medium block ${
                        tool.comingSoon
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {tool.name}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Benefits */}
            <div className="space-y-12 lg:space-y-20">
              {benefits.map((benefit, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    {/* Illustration */}
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <benefit.Illustration />
                    </div>

                    {/* Text */}
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Protect Your Privacy ────────────────────────────── */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                Protect Your Privacy
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Strip all metadata from your images before sharing them online.
              </p>
            </motion.div>

            <div className="space-y-12 lg:space-y-20">
              {cleanSteps.map((step, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                      isReversed ? "md:direction-rtl" : ""
                    }`}
                  >
                    <div className={isReversed ? "md:order-2" : "md:order-1"}>
                      <step.Illustration />
                    </div>
                    <div
                      className={`space-y-4 ${
                        isReversed ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <span className="text-5xl font-bold text-green-500/25 leading-none">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Ready to try it?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose the tool you need — extract hidden metadata or strip it
                all away. Both run entirely in your browser.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Extract card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0 }}
                className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Extract Metadata
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Drop an image and instantly see prompts, models, seeds, and
                  every generation parameter hidden inside.
                </p>
                <TryLinkButton />
              </motion.div>

              {/* Clean card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card hover:border-green-500/30 transition-colors"
              >
                <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Clean Metadata
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Strip all EXIF, GPS, and generation data from your images
                  before sharing.
                </p>
                <CleanLinkButton />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
