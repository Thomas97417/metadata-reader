type ImageDetailsProps = {
  metadata: any;
  imageUrl: string | null;
  fileName: string | null;
};

export default function ImageDetails({
  metadata,
  imageUrl,
  fileName,
}: ImageDetailsProps) {
  console.log(metadata);
  return (
    <div className="flex w-full">
      {imageUrl && (
        <div className="w-1/2 flex flex-col">
          <img
            src={imageUrl}
            alt="uploaded"
            className="w-80 h-80 object-cover rounded-md"
          />
          <p className="text-sm font-light ">
            <span className="text-md font-semibold">Filename:</span> {fileName}
          </p>
        </div>
      )}
      {metadata !== null && (
        <div className="w-1/2">
          <p className="font-bold text-lg">Metadata:</p>
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap">
            {metadata !== undefined
              ? JSON.stringify(metadata, null, 2)
              : "This image has no metadata."}
          </pre>
        </div>
      )}
    </div>
  );
}
