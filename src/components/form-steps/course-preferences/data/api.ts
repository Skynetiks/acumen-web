import {
  formSelectOptionsArraySchema,
  type FormSelectOptionsArrayData,
} from "../../lib/form-schemas";

export const courseOptions = [
  {
    value: "humanities",
    label: "Humanities",
    description: "Literature, Philosophy, History",
  },
  {
    value: "social-science",
    label: "Social Science",
    description: "Psychology, Sociology, Anthropology",
  },
  {
    value: "education",
    label: "Education",
    description: "Teaching, Educational Psychology",
  },
  {
    value: "natural-science",
    label: "Natural Science",
    description: "Physics, Chemistry, Biology",
  },
  {
    value: "engineering",
    label: "Engineering",
    description: "Computer Science, Mechanical, Electrical",
  },
  {
    value: "agriculture",
    label: "Agriculture",
    description: "Agricultural Science, Food Technology",
  },
  {
    value: "medicine",
    label: "Medicine / Health Sciences",
    description: "Medical, Nursing, Public Health",
  },
  {
    value: "home-economics",
    label: "Home Economics",
    description: "Nutrition, Family Studies",
  },
  {
    value: "arts",
    label: "Arts",
    description: "Fine Arts, Design, Music",
  },
];

export async function fetchCoursePreferences(): Promise<FormSelectOptionsArrayData> {
  const data = courseOptions;

  return formSelectOptionsArraySchema.parse(data);
}
