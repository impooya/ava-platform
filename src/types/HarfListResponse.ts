export interface Segment {
  start: string; // Format: "0:00:0.150"
  end: string; // Format: "0:00:7.980"
  text: string; // The text spoken in the segment
}

export interface FileData {
  id: number; // Unique identifier for the video
  url: string; // URL to the video file
  media_url: string; // URL to the video file
  duration: string; // Duration of the video in "0:01:8.000" format
  processed: string; // Timestamp of when the video was processed
  segments: Segment[]; // Array of segments containing start, end, and text
  filename: string; // Name of the video file
}
