import {
  documentUploadSchema,
  type DocumentUploadData,
} from "../../lib/form-schemas";

export const mockUploadedDocuments = {
  documents: [
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
  ],
};

export async function fetchUploadedDocumentData(): Promise<DocumentUploadData> {
  const result = documentUploadSchema.parse(mockUploadedDocuments);
  return result;
}
