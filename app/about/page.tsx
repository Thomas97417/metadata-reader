import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import TryLinkButton from "@/components/TryLinkButton";

const Page = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <InfoSection />
        <section className="py-20 flex justify-center items-center">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/30 [text-shadow:_0_1px_10px_rgba(var(--primary),0.2)]">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto px-4">
              Start extracting metadata from your AI-generated images now.
            </p>
            <TryLinkButton />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
