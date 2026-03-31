import piexif from "piexifjs";

export async function cleanImage(file: File): Promise<Blob> {
  if (file.type === "image/jpeg") {
    return stripJpegMetadata(file);
  }
  if (file.type === "image/png") {
    return stripPngMetadata(file);
  }
  return cleanViaCanvas(file);
}

async function stripJpegMetadata(file: File): Promise<Blob> {
  const dataUrl = await fileToDataUrl(file);
  const cleaned = piexif.remove(dataUrl);
  return dataUrlToBlob(cleaned);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

async function stripPngMetadata(file: File): Promise<Blob> {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const chunks: Uint8Array[] = [buffer.slice(0, 8)]; // PNG signature
  let offset = 8;

  while (offset < buffer.length) {
    const length =
      (buffer[offset] << 24) |
      (buffer[offset + 1] << 16) |
      (buffer[offset + 2] << 8) |
      buffer[offset + 3];
    const chunkType = String.fromCharCode(
      buffer[offset + 4],
      buffer[offset + 5],
      buffer[offset + 6],
      buffer[offset + 7],
    );
    const totalChunkSize = 4 + 4 + length + 4; // length + type + data + CRC

    // Keep chunk if first letter is uppercase (critical chunk)
    if (chunkType[0] === chunkType[0].toUpperCase()) {
      chunks.push(buffer.slice(offset, offset + totalChunkSize));
    }

    offset += totalChunkSize;
  }

  return new Blob(chunks, { type: "image/png" });
}

function cleanViaCanvas(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      const mimeType =
        file.type === "image/png"
          ? "image/png"
          : file.type === "image/webp"
            ? "image/webp"
            : "image/jpeg";
      const quality = mimeType === "image/png" ? undefined : 0.95;

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(img.src);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        mimeType,
        quality,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}
