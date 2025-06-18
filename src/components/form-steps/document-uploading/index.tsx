"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X, UploadCloud } from "lucide-react";
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
  console.log(form.formState);
  return (
    <BaseFormStep {...props} form={form}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={clsx(
          "border border-dashed border-gray-300 bg-white rounded-lg p-6 cursor-pointer transition",
          isDragActive && "bg-blue-50 border-blue-400"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center text-gray-500">
          <UploadCloud className="w-8 h-8 mb-2 text-primary" />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the files here…</p>
          ) : (
            <>
              <p className="font-medium">Drag & drop files here</p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </>
          )}
        </div>
      </div>

      <div className="h-[54vh] overflow-y-auto">
        {/* Newly added documents */}
        {newFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm text-muted-foreground mb-2">
              New Documents
            </h4>
            {newFiles.map((doc) => (
              <div
                key={`new-${doc.id}`}
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
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => handleRemoveNew(doc.id)}
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Previously uploaded documents */}
        {uploadedDocuments?.documents &&
          uploadedDocuments?.documents?.length > 0 && (
            <div className="mt-6 space-y-3">
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
          )}
      </div>
    </BaseFormStep>
  );
}
