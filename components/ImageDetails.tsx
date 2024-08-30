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

  const parametersSections = metadata?.paramaters?.split("\n") || [];

  return (
    <div className="flex w-full">
      {imageUrl && (
        <div className="w-1/2 flex flex-col">
          <img
            src={imageUrl}
            alt="uploaded"
            className="w-96 h-96 object-cover rounded-md"
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
          {parametersSections.length > 0 && (
            <div className="mt-4">
              <p className="font-bold text-lg">Parameters:</p>
              {parametersSections.map((section: any, index: any) => (
                <p key={index} className="whitespace-pre-wrap">
                  {section}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
