import TryLinkButton from "./TryLinkButton";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center py-36 lg:py-48 xl:py-60 2xl:py-72">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="font-bold tracking-tighter text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary/35">
            Unveil AI Image Secrets
          </h1>
          <p className="max-w-[600px] text-lg leading-6 ">
            Unlock hidden details in your AI-generated images. This free
            metadata reader extracts prompts and generation info.
          </p>
          <span className="max-w-[600px] text-lg leading-6">
            Fast, easy, and built for AI creators.
          </span>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <TryLinkButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
