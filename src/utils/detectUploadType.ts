export function detectUploadType(item: {
  url?: string;
  filename?: string;
}): "link" | "voice" | "file" {
  const fileUrl = item.url || item.filename || "";
  const extension = fileUrl.split(".").pop()?.toLowerCase();

  if (!extension) return "link";

  const audioExtensions = ["mp3", "wav", "ogg", "m4a"];
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "zip",
    "rar",
  ];
  const videoExtensions = ["mp4", "mov", "avi", "mkv"];

  if (audioExtensions.includes(extension)) return "voice";
  if (
    documentExtensions.includes(extension) ||
    videoExtensions.includes(extension)
  )
    return "file";

  return "link";
}
