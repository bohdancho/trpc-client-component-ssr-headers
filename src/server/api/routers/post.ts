import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
    return posts.at(-1);
  }),
});
