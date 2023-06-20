import { Redis } from "@upstash/redis";

export const kv =
  process.env.NODE_ENV === "production"
    ? new Redis({
        url: process.env.UPSTASH_URL!,
        token: process.env.UPSTASH_TOKEN!,
      })
    : {
        get: async () => null,
        set: async () => null,
      };
