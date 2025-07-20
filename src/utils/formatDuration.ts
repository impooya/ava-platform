import { format } from "date-fns";

export const formatDuration = (durationStr: string): string => {
  // Remove milliseconds part
  const cleanDuration = durationStr.split(".")[0];
  // Parse the time string
  const [hours, minutes, seconds] = cleanDuration.split(":").map(Number);

  // Create a date object with these values
  const date = new Date(0, 0, 0, hours, minutes, seconds);

  // Format to HH:mm:ss
  return format(date, "HH:mm:ss");
};
