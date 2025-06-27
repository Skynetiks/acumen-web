import {
  formSelectOptionsArraySchema,
  type FormSelectOptionsArrayData,
} from "../../lib/form-schemas";

const reasonOptions = [
  {
    value: "world-class-education",
    label: "World Class Education",
    description: "Access to top-ranked universities and cutting-edge research",
  },
  {
    value: "international-exposure",
    label: "International Exposure",
    description: "Experience diverse cultures and global perspectives",
  },
  {
    value: "migration",
    label: "Migration",
    description: "Long-term settlement and permanent residency opportunities",
  },
  {
    value: "career-development",
    label: "Career Development",
    description: "Enhanced job prospects and professional growth",
  },
  {
    value: "work-experience",
    label: "Short-medium term work experience",
    description: "Gain valuable international work experience",
  },
  {
    value: "other",
    label: "Other",
    description: "Personal or unique reasons for choosing Japan",
  },
];

export async function fetchWhyJapanReasonOptions(): Promise<FormSelectOptionsArrayData> {
  const data = reasonOptions;

  return formSelectOptionsArraySchema.parse(data);
}
