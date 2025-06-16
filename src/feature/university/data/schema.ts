import { z } from "zod";

export const UniversitySchema = z.object({
  id: z.string(),
  name: z.string(),
  courseName: z.string(),
  universityType: z.string(),
  beginsAt: z.string(),
  logo: z.string().optional(),
  prearrivalAdmission: z.string().optional(),
  degreeType: z.string().optional(),
  mediumOfInstructions: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  banner: z.string().optional(),
  description: z.string().optional(),
});

export const UniversitiesSchema = z.array(UniversitySchema);
export type University = z.infer<typeof UniversitySchema>;

export const universityParams = z.object({
  search: z.string().optional(),
  universityType: z.string().optional(),
  beginsAt: z.string().optional(),
  courseName: z.string().optional(),
});
export type UniversityParamsType = z.infer<typeof universityParams>;
