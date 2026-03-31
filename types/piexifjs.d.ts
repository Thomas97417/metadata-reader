declare module "piexifjs" {
  const piexif: {
    remove(jpeg: string): string;
    load(jpeg: string): Record<string, unknown>;
    dump(exifObj: Record<string, unknown>): string;
    insert(exifBytes: string, jpeg: string): string;
  };
  export default piexif;
}
