import type { Segment } from "@/types/HarfListResponse";
import { toast } from "sonner";

// Helper function to format segments for copying
const formatSegmentsForCopy = (segments: Segment[]): string => {
  return segments
    .map((segment, index) => {
      return `${index + 1}. [${segment.start} - ${segment.end}] ${
        segment.text
      }`;
    })
    .join("\n");
};

// Copy segments to clipboard function
export const copySegmentsToClipboard = async (
  segments: Segment[],
  filename: string
) => {
  try {
    const formattedSegments = formatSegmentsForCopy(segments);
    const copyText = `فایل: ${filename}\n\nمتن گفتاری:\n${formattedSegments}`;

    await navigator.clipboard.writeText(copyText);
    toast.success("متن گفتاری کپی شد");
  } catch (error) {
    toast.error("خطا در کپی کردن متن");
    console.error("Failed to copy segments:", error);
  }
};
