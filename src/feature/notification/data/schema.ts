import { z } from "zod";

export const notificationSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  title: z.string(),
  message: z.string(),
  timestamp: z.string(),
  url: z.string(),
  image: z.string().optional(),
});
export const notificationsSchema = z.array(notificationSchema);
export type NotificationDataType = z.infer<typeof notificationSchema>;
