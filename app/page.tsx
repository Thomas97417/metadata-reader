import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import TryLinkButton from "@/components/TryLinkButton";

const page = () => {
  return (
    <div className=" flex flex-col gap-8 m-4">
      <Hero />
      <InfoSection />
      <div className="justify-center flex">
        <TryLinkButton />
      </div>
    </div>
  );
};

export default page;
