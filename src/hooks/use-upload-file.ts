import * as React from "react";
import { toast } from "sonner";

export function useUploadFile(
  endpoint: string,
  { defaultUploadedFiles = [] }: { defaultUploadedFiles: File[] }
) {
  const [uploadedFiles] = React.useState<File[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload() {
    setIsUploading(true);
    try {
    } catch (err) {
      toast.error(err as string);
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  };
}
