import {
  contactPreferencesFormSchema,
  type ContactPreferencesFormData,
} from "../../lib/form-schemas";

export const timeOptions = [
  {
    value: "morning",
    label: "Morning - 9AM to noon",
    description: "Best for detailed discussions",
  },
  {
    value: "afternoon",
    label: "Afternoon 12PM - 4 PM",
    description: "Good for quick consultations",
  },
  {
    value: "evening",
    label: "Evening 5 PM - 8 PM",
    description: "After work hours",
  },
];

export const methodOptions = [
  {
    value: "email",
    label: "Email",
    description: "Detailed information and documents",
  },
  {
    value: "call",
    label: "Call",
    description: "Direct voice conversation",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    description: "Quick messages and updates",
  },
  {
    value: "all",
    label: "All Methods",
    description: "Use any method as needed",
  },
];

export async function fetchContactPreferences(): Promise<ContactPreferencesFormData> {
  // write your api here

  const data = {
    contactTime: timeOptions, // default selected all times
    contactMethod: methodOptions, // default selected all methods
  };

  // Validate using schema, this throws if invalid
  return contactPreferencesFormSchema.parse(data);
}
