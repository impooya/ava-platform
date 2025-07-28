import type { Segment } from "@/types/HarfListResponse";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const formatSegmentsForDownload = (segments: Segment[]): string => {
  return segments
    .map((segment) => {
      return `${segment.text}`;
    })
    .join("\n");
};

export function downloadDocx(segments: Segment[], filename = "document.docx") {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: formatSegmentsForDownload(segments),
                font: "Arial",
                size: 24, // 12pt
              }),
            ],
            alignment: "right",
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, filename);
  });
}
