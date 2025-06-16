import { z } from "zod";

// /events/data/types.ts
export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

export interface EventFilters {
  search?: string;
  timeDate: string;
  eventType: "offline" | "online";
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export const eventFilters = z.object({
  search: z.string().optional(),
  timeDate: z.string().optional(),
  eventType: z.enum(["online", "offline"]).optional(),
  location: z.string().optional(),
  priceRange: z.object({
    min: z.coerce.number(),
    max: z.coerce.number(),
  }),
});

export const eventParams = z.object({
  search: z.string().optional(),
  timeDate: z.string().optional(),
  eventType: z.enum(["online", "offline"]).optional(),
  location: z.string().optional(),
  priceMin: z.coerce.number().default(10),
  priceMax: z.coerce.number().default(200),
});

export type EventParamsType = z.infer<typeof eventParams>;

export type EventFiltersType = z.infer<typeof eventFilters>;
