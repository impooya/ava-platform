export interface DownloadResult {
  success: boolean;
  error?: string;
  errorCode?: string;
}

export interface FileSize {
  bytes: number;
  formatted: string;
}

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 بایت";

  const k = 1024;
  const sizes = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت", "ترابایت"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Function to get file size from URL
export const getFileSize = async (url: string): Promise<FileSize | null> => {
  try {
    const response = await fetch(url, {
      method: "HEAD", // Only get headers, not the actual file
      mode: "cors",
      credentials: "omit",
      // headers: {
      //   Authorization: `${import.meta.env.VITE_API_TOKEN}`,
      // },
    });

    if (!response.ok) {
      return null;
    }

    const contentLength = response.headers.get("content-length");
    if (!contentLength) {
      return null;
    }

    const bytes = parseInt(contentLength, 10);
    return {
      bytes,
      formatted: formatFileSize(bytes),
    };
  } catch (error) {
    console.error("Failed to get file size:", error);
    return null;
  }
};

export const downloadFile = async (
  url: string,
  filename?: string
): Promise<DownloadResult> => {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: `خطا در دریافت فایل: ${response.status}`,
        errorCode: `HTTP_${response.status}`,
      };
    }

    // Get the blob data
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = blobUrl;

    // Set the download filename
    // If no filename provided, try to extract from URL or use default
    if (filename) {
      link.download = filename;
    } else {
      const urlFilename = url.split("/").pop()?.split("?")[0] || "download";
      link.download = urlFilename;
    }

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);

    return { success: true };
  } catch (error) {
    console.error("Download failed:", error);

    // Handle different error types
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      return {
        success: false,
        error: "خطا در اتصال به سرور",
        errorCode: "NETWORK_ERROR",
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        errorCode: "UNKNOWN_ERROR",
      };
    }

    return {
      success: false,
      error: "خطای نامشخص در دانلود فایل",
      errorCode: "UNKNOWN_ERROR",
    };
  }
};
