import { z } from "zod";

// /events/data/types.ts
export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  image: z.string(),
  price: z.number(),
});

export const eventsSchema = z.array(eventSchema);

export type EventType = z.infer<typeof eventSchema>;

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

export const EventTypeEnum = z.enum(["online", "offline"]);
export type EventTypeType = z.infer<typeof EventTypeEnum>;
export const eventParams = z.object({
  search: z.string().optional(),
  timeDate: z.string().optional(),
  eventType: EventTypeEnum.optional(),
  location: z.string().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
});

export type EventParamsType = z.infer<typeof eventParams>;

export type EventFiltersType = z.infer<typeof eventFilters>;
