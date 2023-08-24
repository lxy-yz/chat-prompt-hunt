import * as z from 'zod';

export const chatPromptPatchSchema = z.object({
  title: z.string().min(3).max(128),
  url: z.string().url(),
  description: z.string(),
  topic: z.array(z.string()).optional()
});
