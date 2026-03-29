import * as exifr from "exifr";

/**
 * Parse metadata from a WebP file by reading its RIFF container.
 * Extracts EXIF and XMP chunks, then uses exifr for EXIF parsing.
 */
export async function parseWebpMetadata(
  file: File
): Promise<Record<string, any> | null> {
  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  // Validate RIFF header
  if (buffer.byteLength < 12) return null;
  const riff = getString(dataView, 0, 4);
  const webp = getString(dataView, 8, 4);
  if (riff !== "RIFF" || webp !== "WEBP") return null;

  let metadata: Record<string, any> = {};
  let offset = 12;

  while (offset < buffer.byteLength - 8) {
    const chunkId = getString(dataView, offset, 4);
    const chunkSize = dataView.getUint32(offset + 4, true); // little-endian
    const chunkDataOffset = offset + 8;

    if (chunkId === "EXIF") {
      try {
        // EXIF chunk may start with "Exif\0\0" prefix (6 bytes) or directly with TIFF header
        let exifBuffer = buffer.slice(chunkDataOffset, chunkDataOffset + chunkSize);
        const exifView = new DataView(exifBuffer);

        // Check for "Exif\0\0" prefix and skip it
        if (
          chunkSize > 6 &&
          getString(exifView, 0, 4) === "Exif" &&
          exifView.getUint8(4) === 0 &&
          exifView.getUint8(5) === 0
        ) {
          exifBuffer = exifBuffer.slice(6);
        }

        const parsed = await exifr.parse(exifBuffer, {
          tiff: true,
          xmp: true,
          icc: false,
          iptc: true,
          jfif: false,
          ihdr: false,
          exif: true,
          gps: true,
          interop: true,
          translateKeys: true,
          translateValues: true,
          reviveValues: true,
          mergeOutput: true,
          userComment: true,
        });

        if (parsed) {
          metadata = { ...metadata, ...parsed };

          // A1111 Stable Diffusion stores generation params in UserComment
          if (parsed.UserComment || parsed.userComment) {
            const userComment = parsed.UserComment || parsed.userComment;
            const commentStr =
              typeof userComment === "string"
                ? userComment
                : decodeUserComment(userComment);

            if (commentStr && looksLikeSDParams(commentStr)) {
              metadata.parameters = commentStr;
            }
          }
        }
      } catch (e) {
        console.warn("Failed to parse WebP EXIF chunk:", e);
      }
    }

    if (chunkId === "XMP ") {
      try {
        const xmpBytes = new Uint8Array(
          buffer,
          chunkDataOffset,
          chunkSize
        );
        const xmpString = new TextDecoder("utf-8").decode(xmpBytes);
        const xmpMetadata = parseXmpString(xmpString);
        if (xmpMetadata && Object.keys(xmpMetadata).length > 0) {
          metadata = { ...metadata, ...xmpMetadata };
        }
        metadata._xmpRaw = xmpString;
      } catch (e) {
        console.warn("Failed to parse WebP XMP chunk:", e);
      }
    }

    // Chunks are padded to even size
    offset = chunkDataOffset + chunkSize + (chunkSize % 2);
  }

  return Object.keys(metadata).length > 0 ? metadata : null;
}

function getString(view: DataView, offset: number, length: number): string {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(view.getUint8(offset + i));
  }
  return str;
}

/**
 * Decode EXIF UserComment which may be encoded with a character code prefix.
 */
function decodeUserComment(data: any): string {
  if (typeof data === "string") return data;
  if (data instanceof Uint8Array || ArrayBuffer.isView(data)) {
    const bytes = new Uint8Array(data.buffer || data);
    // UserComment starts with 8-byte character code
    // ASCII: "ASCII\0\0\0", Unicode: "UNICODE\0", JIS: "JIS\0\0\0\0\0"
    if (bytes.length > 8) {
      const prefix = new TextDecoder("ascii").decode(bytes.slice(0, 8));
      const payload = bytes.slice(8);
      if (prefix.startsWith("ASCII")) {
        return new TextDecoder("ascii").decode(payload).replace(/\0+$/, "");
      }
      if (prefix.startsWith("UNICODE")) {
        return new TextDecoder("utf-16").decode(payload).replace(/\0+$/, "");
      }
      // Default: try UTF-8
      return new TextDecoder("utf-8").decode(payload).replace(/\0+$/, "");
    }
    return new TextDecoder("utf-8").decode(bytes).replace(/\0+$/, "");
  }
  return String(data);
}

/**
 * Check if a string looks like Stable Diffusion generation parameters.
 */
function looksLikeSDParams(str: string): boolean {
  return str.includes("Steps:") || str.includes("Negative prompt:");
}

/**
 * Basic XMP string parser — extracts key attributes and description fields.
 */
function parseXmpString(xmp: string): Record<string, any> {
  const result: Record<string, any> = {};

  // Extract common description attributes
  const attrPatterns = [
    { regex: /tiff:Software="([^"]*)"/, key: "Software" },
    { regex: /tiff:ImageWidth="([^"]*)"/, key: "ImageWidth" },
    { regex: /tiff:ImageLength="([^"]*)"/, key: "ImageHeight" },
    { regex: /exif:UserComment="([^"]*)"/, key: "UserComment" },
    { regex: /dc:description[^>]*>([^<]+)/i, key: "Description" },
    { regex: /xmp:CreatorTool="([^"]*)"/, key: "CreatorTool" },
    { regex: /photoshop:Source="([^"]*)"/, key: "Source" },
  ];

  for (const { regex, key } of attrPatterns) {
    const match = xmp.match(regex);
    if (match?.[1]) {
      result[key] = match[1];
    }
  }

  // Check for SD parameters in XMP UserComment
  if (result.UserComment && looksLikeSDParams(result.UserComment)) {
    result.parameters = result.UserComment;
  }

  // Check for ComfyUI prompt in XMP
  const promptMatch = xmp.match(/prompt="([^"]*)"/) || xmp.match(/<prompt>([^<]*)<\/prompt>/);
  if (promptMatch?.[1]) {
    try {
      // Try to decode HTML entities and parse
      const decoded = promptMatch[1]
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
      JSON.parse(decoded); // Validate it's JSON (ComfyUI format)
      result.prompt = decoded;
    } catch {
      // Not valid JSON, store as-is if non-empty
      if (promptMatch[1].trim()) {
        result.prompt = promptMatch[1];
      }
    }
  }

  return result;
}

/**
 * Check if a file is a WebP image.
 */
export function isWebpFile(file: File): boolean {
  return (
    file.type === "image/webp" ||
    file.name.toLowerCase().endsWith(".webp")
  );
}
