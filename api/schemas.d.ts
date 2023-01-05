import { DocID } from "../database/utils";

interface WithID {
  ID: DocID
}

export interface LeanPost {
  title: string;
  content: string;
  authorID: DocID;
}

export interface LeanUser {
  passwordHash: string;
  email: string;
}

export type Post = LeanPost & WithID;
export type User = LeanUser & WithID;

// ??? Ok, but extra (lean) types suck