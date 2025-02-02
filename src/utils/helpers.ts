const formatAcceptedFileTypes = (accept: Record<string, string[]>): string => {
  const mimeTypes = Object.keys(accept);
  const fileTypes = mimeTypes.map((type) => {
    switch (type) {
      case "application/pdf":
        return "PDF";
      case "application/msword":
        return "DOC";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "DOCX";
      default:
        return type.split("/")[1].toUpperCase(); // For other types, just show the subtype
    }
  });

  return fileTypes.join(", ");
};

const formatBytes = (
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
): string => {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
};

const formatErrorResponse = (response: IErrorResponse) => {
  return {
    ...response?.data,
    status: response?.status,
  };
};

export { formatAcceptedFileTypes, formatBytes, formatErrorResponse };
