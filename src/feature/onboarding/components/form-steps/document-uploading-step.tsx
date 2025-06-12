"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Check, X } from "lucide-react";
import { z } from "zod";
import type { FormStepProps } from "@/types/form.types";

const documentUploadSchema = z.object({
  documents: z.array(z.string()).optional(),
});

type DocumentUploadData = z.infer<typeof documentUploadSchema>;

interface UploadedDocument {
  id: string;
  name: string;
  format: string;
  size: string;
  status: "success" | "error" | "uploading";
}

export function DocumentUploadStep({
  data,
  onSubmit,
  isLoading,
  config,
}: FormStepProps<DocumentUploadData>) {
  const form = useForm<DocumentUploadData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: data,
    mode: "onChange",
  });

  // Mock uploaded documents
  const uploadedDocuments: UploadedDocument[] = [
    {
      id: "1",
      name: "Passport.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
    {
      id: "2",
      name: "12th Transcript.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
    {
      id: "3",
      name: "degree_certificate.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
    {
      id: "4",
      name: "Statement of Purpose.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
    {
      id: "5",
      name: "Letter of Recommendation1.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
    {
      id: "6",
      name: "Letter of Recommendation2.pdf",
      format: "PNG",
      size: "1.2MB",
      status: "success",
    },
  ];

  const handleSubmit = () => {
    onSubmit({ documents: uploadedDocuments.map((doc) => doc.id) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ArrowLeft className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Hello, Ankur !</h2>
          <p className="text-muted-foreground text-sm">
            Let's review your details before proceeding!
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-medium mb-4">Upload Your Documents</h3>

            <div className="space-y-3">
              {uploadedDocuments.map((document) => (
                <div
                  key={document.id}
                  className="bg-white rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{document.name}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>File Format: {document.format}</span>
                        <span>File Size: {document.size}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
