import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";

import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { fetchUploadedDocumentData } from "./data/api";
import {
  documentUploadSchema,
  type DocumentUploadData,
} from "../lib/form-schemas";

export function DocumentUploadStep(props: FormStepProps<DocumentUploadData>) {
  const { data, config } = props;

  const { data: uploadedDocuments } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchUploadedDocumentData,
  });

  const form = useForm<DocumentUploadData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const newFiles = form.watch("documents") || [];

  const onDrop = (acceptedFiles: File[]) => {
    const mapped = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      format: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      file,
      status: "new",
    }));
    form.setValue("documents", [...newFiles, ...mapped], {
      shouldValidate: true,
    });
  };

  const handleRemoveNew = (id: string) => {
    const updated = newFiles.filter((doc) => doc.id !== id);
    form.setValue("documents", updated, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
  });
  return (
    <BaseFormStep {...props} form={form}>
      <div className="pr-4 w-full h-full">
        <div
          {...getRootProps()}
          className={clsx(
            "border border-dashed border-gray-300 bg-white rounded-lg p-6 cursor-pointer transition",
            isDragActive && "bg-blue-50 border-blue-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-start gap-4">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.8516C21.1602 11.4336 21.25 10.9766 21.25 10.5C21.25 8.42969 19.5703 6.75 17.5 6.75C16.7305 6.75 16.0117 6.98438 15.418 7.38281C14.3359 5.50781 12.3164 4.25 10 4.25C6.54688 4.25 3.75 7.04688 3.75 10.5C3.75 10.6055 3.75391 10.7109 3.75781 10.8164C1.57031 11.5859 0 13.6719 0 16.125C0 19.2305 2.51953 21.75 5.625 21.75H20C22.7617 21.75 25 19.5117 25 16.75C25 14.332 23.2812 12.3125 21 11.8516ZM15.3672 14.25H12.8125V18.625C12.8125 18.9688 12.5312 19.25 12.1875 19.25H10.3125C9.96875 19.25 9.6875 18.9688 9.6875 18.625V14.25H7.13281C6.57422 14.25 6.29688 13.5781 6.69141 13.1836L10.8086 9.06641C11.0508 8.82422 11.4492 8.82422 11.6914 9.06641L15.8086 13.1836C16.2031 13.5781 15.9219 14.25 15.3672 14.25Z"
                fill="#E63963"
              />
            </svg>

            <div className="flex flex-col text-gray-500">
              {isDragActive ? (
                <p className="text-primary font-medium">Drop the files here…</p>
              ) : (
                <>
                  <p className="font-medium text-secondary-foreground">
                    Upload & Drag & Drop your Document
                  </p>
                  <p className="text-sm text-gray-400">
                    Maximum File Size is 20MB
                  </p>
                  <p className="text-sm text-gray-400">
                    Supported File Types are .png, .jpeg, .pdf, .csv
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {/* Newly added documents */}
          {newFiles.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-muted-foreground">New Documents</h4>
              {newFiles.map((doc) => (
                <div
                  key={`new-${doc.id}`}
                  className="bg-background rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3 flex-1 overflow-hidden">
                    <div className="shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Format: {doc.format}</span>
                        <span>Size: {doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-100 shrink-0"
                    onClick={() => handleRemoveNew(doc.id)}
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
          {/* Previously uploaded documents */}
          {uploadedDocuments?.documents &&
          uploadedDocuments?.documents?.length > 0 ? (
            <div className=" ">
              <h4 className="text-sm text-muted-foreground mb-2">
                Already Uploaded
              </h4>
              {uploadedDocuments.documents.map((doc) => (
                <div
                  key={`existing-${doc.id}`}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Format: {doc.format}</span>
                        <span>Size: {doc.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </BaseFormStep>
  );
}
