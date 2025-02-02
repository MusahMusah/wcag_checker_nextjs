"use client";
import Image from "next/image";
import FileUploader from "@components/ui/file-uploader";
import { useUploadFile } from "@hooks/use-upload-file";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import ErrorHandler from "@utils/error-handler";
import { WcagController } from "@/api/controllers/wcag.controller";
import ButtonLoading from "@components/ui/button-loading";
import { LocalStorageHelper } from "@utils/local.storage";
import { IErrorResponse } from "@/interfaces/common.interface";

export default function Home() {
  const router = useRouter();
  const { progresses, isUploading } = useUploadFile("imageUploader", {
    defaultUploadedFiles: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error("No file selected");
      return;
    }

    setIsUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append("html_file", files[0]);

      const response = await WcagController.check(formData);
      LocalStorageHelper.save("wcag_analysis", response.data);

      toast.success(response.message);
      router.push("/insights");
    } catch (e: unknown) {
      const errorResponse = e as IErrorResponse;
      toast.error("An error occurred while analyzing the file");
      return ErrorHandler.handleError(errorResponse);
    } finally {
      setIsUploadingFile(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-1 flex flex-col items-center gap-8 sm:items-start">
          <form onSubmit={handleSubmit} ref={formRef} className="md:w-[500px] p-6" aria-labelledby="form-title">
            <div>
              <h1 id="form-title" className="text-left text-2xl font-bold leading-8 text-slate-700">
                WCAG Accessibility Analyzer
              </h1>
              <p className="mb-4 text-sm text-slate-600">
                Ensuring web accessibility is essential for creating inclusive digital experiences. With this tool, you can upload an HTML file
                to analyze its compliance with WCAG (Web Content Accessibility Guidelines). The system will scan your file for common
                accessibility issues, such as missing alternative text, poor keyboard navigation, improper heading structures, and ARIA
                implementation. After the analysis, you&#39;ll receive a detailed report with actionable recommendations to improve accessibility,
                helping you build a more inclusive and user-friendly website.
              </p>
            </div>
            <div className="mb-3">
              <FileUploader
                  onValueChange={handleFileChange}
                  maxFileCount={1}
                  maxSize={2 * 1024 * 1024}
                  progresses={progresses}
                  disabled={isUploading}
                  accept={{ "text/html": [] }}
                  className="h-50 w-full"
                  aria-label="Upload your HTML file for accessibility analysis"
              />
            </div>

            <ButtonLoading loading={isUploadingFile} aria-label="Submit the uploaded HTML file for WCAG analysis">
              Submit
            </ButtonLoading>
          </form>
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Learn more about WCAG guidelines on W3.org"
          >
            <Image
                aria-hidden
                src="/globe.svg"
                alt=""
                width={16}
                height={16}
            />
            Go to w3.org →
          </a>
        </footer>
      </div>
  );
}
