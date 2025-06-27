import {
  formSelectOptionsArraySchema,
  type FormSelectOptionsArrayData,
} from "../../lib/form-schemas";

const mockStayConnectedData = [
  {
    value: "social-media",
    label: "Social Media",
    description: "Facebook, Instagram, LinkedIn, Twitter",
  },
  {
    value: "education-fair",
    label: "Education Fair",
    description: "University fairs and education events",
  },
  {
    value: "referral",
    label: "Referral",
    description: "Friends, family, or colleagues",
  },
  {
    value: "website",
    label: "Website",
    description: "Search engines or direct website visit",
  },
];

export async function fetchStayConnectedData(): Promise<FormSelectOptionsArrayData> {
  const result = formSelectOptionsArraySchema.safeParse(mockStayConnectedData);
  if (!result.success) {
    throw new Error("Invalid data format");
  }
  return result.data;
}
