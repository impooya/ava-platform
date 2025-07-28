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
    const copyToClipboard = async (text: string) => {
      if (!text) return;

      try {
        // Try using the modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }

        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
          textArea.remove();
          return true;
        } catch (err) {
          console.log(err);
          textArea.remove();
          return false;
        }
      } catch (err) {
        console.error("Failed to copy text:", err);
        return false;
      }
    };

    await copyToClipboard(copyText);
    toast.success("متن گفتاری کپی شد");
  } catch (error) {
    toast.error("خطا در کپی کردن متن");
    console.error("Failed to copy segments:", error);
  }
};
