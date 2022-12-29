import { DocId } from "../database/utils";

interface WithId {
  id: DocId
}

export interface LeanPost {
  title: string;
  content: string;
  authorId: DocId;
}

export interface LeanUser {
  passwordHash: string;
  email: string;
}

export type Post = LeanPost & WithId;
export type User = LeanUser & WithId;

// ??? Ok, but extra (lean) types suck