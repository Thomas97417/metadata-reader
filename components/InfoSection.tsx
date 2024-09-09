import { BrainCircuit, Rocket, ShieldCheck } from "lucide-react";
import { InfoCard } from "./InfoCard";

const features = [
  {
    icon: BrainCircuit,
    title: "Made for AI Enthusiasts",
    description: "Extracts prompts from your AI generated images.",
    content:
      "Extracts prompts and generation data when your web ui is running or not launched. Works with A1111 and ComfyUI for now.",
  },
  {
    icon: Rocket,
    title: "Instant Results",
    description: "Get immediate results when you need them.",
    content: "This platform extracts metadata from your images in real-time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and Private",
    description: "Your data stays on your device.",
    content:
      "The images are processed on your device and no data is sent to any server.",
  },
];

export default function InfoSection() {
  return (
    <section className="w-full py-4">
      <div className="container px-4 md:px-6">
        <h1 className="font-bold tracking-tighter text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary/35 text-center mb-12">
          Key Features
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <InfoCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
