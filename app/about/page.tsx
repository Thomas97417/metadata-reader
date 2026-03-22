"use client";

import { motion } from "framer-motion";
import {
  HeartIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CommandLineIcon,
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import InfoSection from "@/components/InfoSection";
import TryLinkButton from "@/components/TryLinkButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    number: "1",
    icon: PhotoIcon,
    title: "Drop your image",
    description:
      "Drag and drop or select any AI-generated image. We support PNG, JPEG, and WebP formats.",
  },
  {
    number: "2",
    icon: MagnifyingGlassIcon,
    title: "We read the metadata",
    description:
      "Our engine parses embedded EXIF, PNG tEXt chunks, and XMP data right in your browser. Nothing leaves your device.",
  },
  {
    number: "3",
    icon: EyeIcon,
    title: "See everything",
    description:
      "Prompts, negative prompts, model names, samplers, seeds, CFG scale — all extracted and organized for you.",
  },
];

const supportedTools = [
  {
    icon: CommandLineIcon,
    name: "Stable Diffusion",
    description:
      "Full A1111 and Forge metadata including all generation parameters.",
  },
  {
    icon: CpuChipIcon,
    name: "ComfyUI",
    description: "Complete workflow JSON extraction with node details.",
  },
  {
    icon: SparklesIcon,
    name: "Midjourney",
    description: "Prompt and parameter extraction from embedded metadata.",
  },
  {
    icon: LightBulbIcon,
    name: "DALL-E",
    description: "OpenAI generation metadata and prompt recovery.",
  },
];

const privacyPoints = [
  "Images are processed entirely in your browser",
  "No data is ever sent to our servers",
  "No cookies, no tracking, no analytics on your images",
  "Works fully offline once loaded",
];

const Page = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        {/* Section 1: About Hero */}
        <section className="flex flex-col justify-center items-center py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6 max-w-3xl px-4 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-primary/10 rounded-2xl"
            >
              <HeartIcon className="w-10 h-10 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-bold tracking-tighter text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]"
            >
              What is Metadata Reader?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl"
            >
              We built Metadata Reader because we believe AI artists deserve a
              simple, private way to understand their images. No accounts, no
              uploads to remote servers, no tracking — just you and your images.
            </motion.p>
          </motion.div>
        </section>

        {/* Section 2: How It Works */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Three simple steps to uncover the story behind your images.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="group border-border/50 hover:border-primary/50 transition-colors duration-300 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="relative space-y-3">
                      <span className="text-5xl font-bold text-primary/15 leading-none">
                        {step.number}
                      </span>
                      <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-semibold tracking-tight">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/90 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Supported AI Tools */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]">
                Supported AI Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Works with the most popular AI image generators.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {supportedTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group border-border/50 hover:border-primary/50 transition-colors duration-300 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader className="relative space-y-3 pb-3">
                      <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base font-semibold tracking-tight">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/90 leading-relaxed text-sm">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Key Features */}
        <InfoSection />

        {/* Section 5: Privacy Commitment */}
        <section className="w-full py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto bg-primary/5 rounded-2xl p-8 md:p-12"
            >
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)] mb-8">
                Your Privacy, Our Promise
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  {privacyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/90">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    As AI artists, your prompts are your craft — they represent
                    hours of experimentation and creative insight. We believe
                    that analyzing your own work should never come at the cost of
                    exposing it. That&apos;s why every bit of processing happens
                    locally in your browser, with zero network requests. Your
                    images and their secrets stay exactly where they belong: with
                    you.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Gentle CTA */}
        <section className="py-16 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Ready to try it?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto px-4">
              It takes just a few seconds. Drop an image and see what&apos;s
              hidden inside.
            </p>
            <TryLinkButton />
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Page;
