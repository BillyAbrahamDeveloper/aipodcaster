import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  podcasts: defineTable({
    user: v.id('users'),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioUrl: v.optional(v.string()),
    audioStorageId: v.optional(v.id('_storage')),
    audioDuration: v.number(),
    voicePrompt: v.string(),
    voiceType: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.v.optional(v.id('_storage')),
    imagePrompt: v.string(),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    views: v.number(),
  }),

  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});
