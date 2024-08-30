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
  return (
    <div className="flex flex-col w-full mx-auto">
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="uploaded"
            className="w-80 h-80 object-cover mx-auto rounded-md"
          />
          <div className="mx-auto">
            <h2 className="text-sm font-light ">Filename: {fileName}</h2>
          </div>
        </div>
      )}
      {metadata && (
        <div className="mt-4">
          <h3 className="font-bold">Metadata:</h3>
          <pre className="max-w-full overflow-x-auto ">
            {metadata !== (null || undefined)
              ? JSON.stringify(metadata, null, 2)
              : "No metadata on this file"}
          </pre>
        </div>
      )}
    </div>
  );
}
