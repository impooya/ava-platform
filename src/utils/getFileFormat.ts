export function getFileFormat(urlOrFilename: string): string {
  try {
    const pathname = new URL(urlOrFilename).pathname;
    const extension = pathname.split(".").pop()?.toLowerCase();
    return extension || "unknown";
  } catch {
    const extension = urlOrFilename.split(".").pop()?.toLowerCase();
    return extension || "unknown";
  }
}
