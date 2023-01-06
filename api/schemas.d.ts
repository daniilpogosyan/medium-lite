import { posts, users } from "@prisma/client";

export type LeanPost = Omit<posts, 'ID'>

export type LeanUser = Omit<users, 'ID'>