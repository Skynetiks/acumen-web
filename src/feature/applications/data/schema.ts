import { z } from "zod";

export const ApplicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  program: z.string(),
  degree: z.string(),
  date: z.string(),
});

export const applicationsSchema = z.array(ApplicationSchema);

export type Application = {
  id: string;
  name: string;
  program: string;
  degree: string;
  date: string;
};

export const Params = z.object({
  search: z.string().optional(),
  degree: z.string().optional(),
  program: z.string().optional(),
  date: z.string().optional(),
});

export type ParamsType = z.infer<typeof Params>;
