import TryLinkButton from "./TryLinkButton";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center py-24 lg:py-36 xl:py-48">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="font-bold tracking-tighter text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Unveil AI Image Secrets
          </h1>
          <p className="max-w-[600px] text-lg leading-6 ">
            Lightning-fast metadata extraction for AI-generated images. Decode
            locale data, creation details, and more in seconds.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <TryLinkButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
