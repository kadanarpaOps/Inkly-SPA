import z from "zod";
import { statusNames } from "../../../core/domain/models/stories/StoryModel";

export const storySearchSchema = z.object({
    offset: z.number(),
    limit: z.number(),
    title: z.string().nullable().optional(),
    genreName: z.string().nullable().optional(),
    secondaryGenreName: z.string().nullable().optional(),
    status: z.enum([statusNames.IN_PROGRESS, statusNames.COMPLETED, statusNames.ABANDONED, statusNames.PAUSED]).nullable().optional(),
    tagNames: z.array(z.string()).nullable().optional(),
    newestFirst: z.boolean(),
});

export type StorySearchFormValues = z.infer<typeof storySearchSchema>;
