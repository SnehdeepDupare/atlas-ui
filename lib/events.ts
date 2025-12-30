import posthog from "posthog-js";
import { z } from "zod";

const eventSchema = z.object({
  name: z.enum(["copy_usage_code", "copy_source_code", "copy_npm_command"]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(
      z.string(),
      z.union([z.string(), z.number(), z.boolean(), z.null()])
    )
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (event) {
    posthog.capture(event.name, event.properties);
  }
}
