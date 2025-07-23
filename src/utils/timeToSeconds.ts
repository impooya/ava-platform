export const timeToSeconds = (timeString: string): number => {
  // Handle format like "0:01:17.730" or "1:17.730"
  const parts = timeString.split(":");
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    // Format: "0:01:17.730" (hours:minutes:seconds)
    hours = parseInt(parts[0]);
    minutes = parseInt(parts[1]);
    seconds = parseFloat(parts[2]);
  } else if (parts.length === 2) {
    // Format: "01:17.730" (minutes:seconds)
    minutes = parseInt(parts[0]);
    seconds = parseFloat(parts[1]);
  } else {
    // Format: "17.730" (just seconds)
    seconds = parseFloat(parts[0]);
  }

  return hours * 3600 + minutes * 60 + seconds;
};
